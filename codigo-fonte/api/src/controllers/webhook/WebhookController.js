const axios = require('axios');
const { Carrinho, Compras, CarrinhoFotos, Albuns, AlbumFotos } = require('../../models');

const webhookHandler = async (req, res) => {
  try {
    const paymentId = req.body.data?.id;
    if (!paymentId) {
      return res.status(400).json({ error: 'payment_id não fornecido' });
    }

    // 1. Buscar detalhes do pagamento no Mercado Pago
    const { data: pagamento } = await axios.get(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer APP_USR-4408220913517581-053116-d32addaa3e560bbfd22bcfb28f4d8876-2467253734`
        }
      }
    );

    // 2. Verifica se o pagamento está aprovado
    if (pagamento.status !== 'approved') {
      console.log(`Pagamento ${paymentId} ainda não aprovado (status: ${pagamento.status})`);
      return res.sendStatus(200);
    }

    console.log("pagamento", pagamento)
    // 3. Pega o ID da compra, ID do carrinho do external_reference
    const referencia = JSON.parse(pagamento.external_reference);
    const compraId = referencia.compra_id;
    const carrinhoId = referencia.carrinho_id;
    // 4. Buscar a compra
    const compra = await Compras.findByPk(compraId);

    if (!compra) {
      console.error('Compra não encontrado:', compraId);
      return res.sendStatus(404);
    }

    // 5. Buscar o carrinho com as fotos (incluindo associação correta)
    const carrinho = await Carrinho.findByPk(carrinhoId, {
      include: [{
        model: CarrinhoFotos,
        as: 'fotos' // Verifique se no model Carrinho a associação tem esse alias 'fotos'
      }]
    });

    if (!carrinho) {
      console.error('Carrinho não encontrado:', carrinhoId);
      return res.sendStatus(404);
    }

    // 5. Evita duplicação se o pagamento já foi processado
    if (compra.payment_id) {
      console.log('Pagamento já registrado para esta compra.');
      return res.sendStatus(200);
    }

    console.log("Atualizando a compra com o pagamento_id:", paymentId)
    // 6. Atualiza o carrinho com payment_id e status
    await compra.update({
      pagamento_id: paymentId,
      status: 'approved',
    });

    console.log("Informações qee serão inseridas no album:",
      {
      'usuarioId': carrinho.usuario_id,
      'descricao e nome': carrinho.descricao,
      }
    )

    // 7. Cria o álbum
    const album = await Albuns.create({
      usuario_id: carrinho.usuario_id,
      nome: carrinho.descricao,
      descricao: carrinho.descricao,
      origem: 'cliente',
      downloadFoto: true
    });

    // 8. Cria os registros em AlbumFotos
    const fotosParaAlbum = carrinho.fotos.map((item) => ({
      album_id: album.id,
      id_foto: item.id_foto
    }));

    await AlbumFotos.bulkCreate(fotosParaAlbum);

    console.log(`Álbum ${album.id} criado para o carrinho ${carrinho.id}.`);

    return res.sendStatus(200);
  } catch (error) {
    console.error('Erro no webhook:', error.response?.data || error.message);
    return res.sendStatus(500);
  }
};

module.exports = webhookHandler;
