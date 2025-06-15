const Api_Controller = require('../Api_Controller');
const { AlbumFotos } = require('../../models');
const { deleteFotoBunnyStorage } = require('../../service/uploadService');

class AlbumFotosController extends Api_Controller {
  constructor() {
    super('AlbumFotos');
  }


async delete(req, res) {
  const { albumId, fotoId } = req.params;

  try {
    // Primeiro tenta buscar pelo campo ID (Fluxo 2)
    let foto = await AlbumFotos.findOne({
      where: {
        album_id: albumId,
        id: fotoId,
      },
    });

    // Se não achar, tenta pelo campo id_foto (Fluxo 1)
    if (!foto) {
      foto = await AlbumFotos.findOne({
        where: {
          album_id: albumId,
          id_foto: fotoId,
        },
      });
    }

    if (!foto) {
      return res.status(404).json({ mensagem: 'Associação de foto não encontrada.' });
    }

    // Se tiver URL, deleta no BunnyCDN
    if (foto.foto_url) {
      await deleteFotoBunnyStorage(foto.foto_url);
    }

    // Agora: deleta o registro usando a instância direto
    await foto.destroy();

    return res.status(200).json({ mensagem: 'Foto removida do álbum com sucesso.' });
  } catch (error) {
    console.error('Erro ao remover foto do álbum:', error);
    return res.status(500).json({ mensagem: 'Erro interno ao excluir foto.', details: error.message });
  }
}


}

module.exports = new AlbumFotosController();
