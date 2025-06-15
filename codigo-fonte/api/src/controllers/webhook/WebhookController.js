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

    const referencia = JSON.parse(pagamento.external_reference);
    const compraId = referencia.compra_id;
    const carrinhoId = referencia.carrinho_id;

    // Busca a compra
    const compra = await Compras.findByPk(compraId);
    if (!compra) return res.sendStatus(404);

    // Verifica se o pagamento já foi registrado
    if (compra.payment_id && compra.status === pagamento.status) {
      console.log('Pagamento já processado.');
      return res.sendStatus(200);
    }

    // Atualiza o status da compra com qualquer status vindo do Mercado Pago
    await compra.update({
      pagamento_id: paymentId,
      status: pagamento.status,
    });

    // Só cria álbum, etc., se aprovado
    if (pagamento.status === 'approved') {
      const carrinho = await Carrinho.findByPk(carrinhoId, {
        include: [{ model: CarrinhoFotos, as: 'fotos' }]
      });

      if (!carrinho) return res.sendStatus(404);

      const album = await Albuns.create({
        usuario_id: carrinho.usuario_id,
        nome: carrinho.descricao,
        descricao: carrinho.descricao,
        origem: 'cliente',
        downloadFoto: true
      });

      const fotosParaAlbum = carrinho.fotos.map((item) => ({
        album_id: album.id,
        id_foto: item.id_foto,
        origem: "evento",
      }));

      await AlbumFotos.bulkCreate(fotosParaAlbum);
      await Carrinho.destroy({ where: { id: carrinhoId } });

      console.log(`Carrinho ${carrinhoId} processado e deletado.`);
    }

    return res.sendStatus(200);


  } catch (error) {
    console.error('Erro no webhook:', error.response?.data || error.message);
    return res.sendStatus(500);
  }
};

module.exports = webhookHandler;
