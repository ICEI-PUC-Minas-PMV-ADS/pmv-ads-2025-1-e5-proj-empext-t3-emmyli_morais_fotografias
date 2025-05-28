const { DetalheEvento, AlbumFotos } = require('../../models');
const { uploadFotoBunnyStorage, deleteFotoBunnyStorage } = require('../../service/uploadService');

const FotoController = {
  adicionar: async (req, res) => {
    try {
      const { album_id } = req.body;
      const arquivos = req.files;

      if (!album_id || !arquivos?.length) {
        return res.status(400).json({ error: 'Dados incompletos.' });
      }

      const urls = [];

      for (const file of arquivos) {
        const url = await uploadFotoBunnyStorage(file);

        const novaFoto = await DetalheEvento.create({
          evento_id: 1, 
          foto: url,
          dtinclusao: new Date(),
          dtalteracao: new Date(),
        });

        /*await AlbumFotos.create({
          album_id,
          id_foto: novaFoto.id,
          dtinclusao: new Date(),
          dtalteracao: new Date(),
        });*/

        urls.push({
          id_foto: novaFoto.id,
          url
        });
      }

      return res.status(201).json({ message: 'Fotos adicionadas com sucesso.', urls });
    } catch (error) {
      console.error('Erro ao adicionar fotos:', error);
      return res.status(500).json({ error: 'Erro ao adicionar fotos.' });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const foto = await DetalheEvento.findByPk(id);
      if (!foto) {
        return res.status(404).json({ error: 'Foto não encontrada.' });
      }

      await deleteFotoBunnyStorage(foto.foto);
      await foto.destroy();

      return res.status(200).json({ message: 'Foto excluída com sucesso.' });
    } catch (error) {
      console.error('Erro ao excluir a foto:', error);
      return res.status(500).json({ error: 'Erro ao excluir a foto.' });
    }
  }
};

module.exports = FotoController;
