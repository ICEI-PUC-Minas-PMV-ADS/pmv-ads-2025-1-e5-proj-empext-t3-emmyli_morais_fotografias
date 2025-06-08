const { DetalheEvento } = require('../../models');
const { uploadFotoBunnyStorage, deleteFotoBunnyStorage } = require('../../service/uploadService');

class FotoController {

   
  async adicionar(req, res) {
    try {
      //  1. Extrai "evento_id" em vez de "album_id" 
      const { evento_id } = req.body;
      const arquivos = req.files; // Multer array('fotos')

      // Validação básica 
      if (!evento_id || !Array.isArray(arquivos) || arquivos.length === 0) {
        return res.status(400).json({ error: 'Dados incompletos para adicionar fotos ao evento.' });
      }

      //  Prepara Promises de upload em paralelo 

      const uploadPromises = arquivos.map((file) =>
        uploadFotoBunnyStorage(file).catch((err) => {
          console.error('[FotoController] Erro no upload de arquivo:', file.originalname, err);
          return null; // Marca como "falha"
        })
      );

      //  Aguarda todos os uploads
      const uploadedUrls = await Promise.all(uploadPromises);

      //  Filtra somente as URLs que não retornaram null 
      
      const successfulUploads = uploadedUrls
        .map((url, idx) => ({ url, file: arquivos[idx] }))
        .filter((item) => item.url !== null);

      // Se nenhum upload deu certo, retorne erro:
      if (successfulUploads.length === 0) {
        return res.status(500).json({ error: 'Nenhum upload de imagem foi bem-sucedido.' });
      }

      //  Prepara array de objetos para bulkCreate 
      const rowsToInsert = successfulUploads.map((item, index) => ({
        evento_id:  Number(evento_id),
        foto:       item.url,
        tem_marca_agua: true,
        ordem:        index,
        dtinclusao: new Date(),
        dtalteracao: new Date(),
      }));

      //  Insere todas as linhas de uma vez no banco 
      const detalhesCriados = await DetalheEvento.bulkCreate(rowsToInsert, { returning: true });

      //  Retorna todas as URLs geradas com sucesso 
      const finalFotos = detalhesCriados.map((inst) => ({
        id_foto: inst.id,
        url:     inst.foto,
      }));

      return res.status(201).json({ fotos: finalFotos });
    } catch (error) {
      console.error('[FotoController] Erro interno ao adicionar fotos:', error);
      return res.status(500).json({ error: 'Erro interno ao adicionar fotos.' });
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
