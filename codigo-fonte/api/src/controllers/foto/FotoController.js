const { DetalheEvento } = require('../../models');
const { uploadFotoBunnyStorage, deleteFotoBunnyStorage } = require('../../service/uploadService');

class FotoController {

   
   async adicionar(req, res) {
    try {
      const { evento_id } = req.body;
      const arquivos = req.files;
      if (!evento_id || !arquivos?.length) {
        return res.status(400).json({
          error: 'Dados incompletos para adicionar fotos ao evento.',
        });
      }
      const uploadPromises = arquivos.map((file) =>
        uploadFotoBunnyStorage(file).catch(() => null)
      );
      const uploaded = await Promise.all(uploadPromises);
      const successful = uploaded
        .map((url, i) => ({ url, file: arquivos[i] }))
        .filter((x) => x.url);
      if (!successful.length) {
        return res.status(500).json({ error: 'Nenhum upload funcionou.' });
      }
      const rows = successful.map((u, idx) => ({
        evento_id: Number(evento_id),
        foto: u.url,
        tem_marca_agua: true,
        ordem: idx,
        dtinclusao: new Date(),
        dtalteracao: new Date(),
      }));
      const created = await DetalheEvento.bulkCreate(rows, { returning: true });
      const fotos = created.map((c) => ({
        id_foto: c.id,
        url: c.foto,
      }));
      return res.status(201).json({ fotos });
    } catch (err) {
      console.error('[FotoController] adicionar:', err);
      return res.status(500).json({ error: 'Erro interno ao adicionar fotos.' });
    }
  }

  // **NOVO** persiste apenas URLs já hospedadas na Bunny
  async adicionarUrls(req, res) {
    const { evento_id, urls } = req.body;
    if (!evento_id || !Array.isArray(urls) || !urls.length) {
      return res.status(400).json({
        error: 'Informe evento_id e um array de URLs.',
      });
    }
    try {
      const fotosCriadas = [];
      for (const url of urls) {
        const det = await DetalheEvento.create({
          evento_id,
          foto: url,
          ordem: 0,
        });
        fotosCriadas.push({ id_foto: det.id, url: det.foto });
      }
      return res.status(201).json({ fotos: fotosCriadas });
    } catch (err) {
      console.error('[FotoController] adicionarUrls:', err);
      return res.status(500).json({ error: 'Falha ao persistir URLs.' });
    }
  }


  //Remove uma foto de um evento (detalhe_eventos) pelo ID do registro.
  async delete(req, res) {
    try {
      const { id } = req.params;

      // 1. Busca registro no banco
      const fotoEncontrada = await DetalheEvento.findByPk(id);
      if (!fotoEncontrada) {
        return res.status(404).json({ error: 'Foto não encontrada no evento.' });
      }

      const urlExistente = fotoEncontrada.foto;

      //  Verifica se existe mais algum detalhe com essa URL
      const countMesmaUrl = await DetalheEvento.count({ where: { foto: urlExistente } });

      // Se for único, apaga do BunnyCDN; senão apenas remove do BD
      if (countMesmaUrl === 1) {
        try {
          await deleteFotoBunnyStorage(urlExistente);
        } catch (errBunny) {
          console.error('[FotoController] Erro ao deletar do BunnyCDN:', errBunny);
          // Mesmo que falhe, siga para apagar no BD
        }
      }

      // 3. Remove do banco
      await fotoEncontrada.destroy();

      return res.status(200).json({ message: 'Foto removida do evento com sucesso.' });
    } catch (error) {
      console.error('[FotoController] Erro ao deletar foto do evento:', error);
      return res.status(500).json({ error: 'Erro interno ao deletar foto do evento.' });
    }
  }
}

module.exports = new FotoController();
