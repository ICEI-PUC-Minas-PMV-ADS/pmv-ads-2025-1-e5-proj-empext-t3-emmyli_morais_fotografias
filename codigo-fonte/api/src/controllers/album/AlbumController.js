const { Albuns, AlbumFotos, DetalheEvento } = require('../../models');
const { deleteFotoBunnyStorage, uploadFotoBunnyStorage } = require('../../service/uploadService');

const getAll = async (req, res) => {
  try {
    const albuns = await Albuns.findAll({
      include: {
        model: AlbumFotos,
        as: 'fotos',
        include: {
          model: DetalheEvento,
          as: 'foto'
        }
      }
    });
    res.json(albuns);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar álbuns', details: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const album = await Albuns.findByPk(id, {
      include: {
        model: AlbumFotos,
        as: 'fotos',
        include: {
          model: DetalheEvento,
          as: 'foto'
        }
      }
    });

    if (!album) return res.status(404).json({ error: 'Álbum não encontrado' });
    res.json(album);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar álbum', details: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { nome, descricao, usuario_id } = req.body;
    const imagens = req.files;

    if (!nome || !usuario_id || !imagens || imagens.length === 0) {
      return res.status(400).json({ error: 'Dados incompletos ou imagens ausentes' });
    }

    const novoAlbum = await Albuns.create({
      nome,
      descricao,
      usuario_id,
      dtinclusao: new Date(),
      dtalteracao: new Date()
    });

    for (const file of imagens) {
      const url = await uploadFotoBunnyStorage(file);

      const novaFoto = await DetalheEvento.create({
        evento_id: 1, // ajustar se necessário
        foto: url,
        tem_marca_agua: true,
        dtinclusao: new Date(),
        dtalteracao: new Date()
      });

      await AlbumFotos.create({
        album_id: novoAlbum.id,
        id_foto: novaFoto.id,
        dtinclusao: new Date(),
        dtalteracao: new Date()
      });
    }

    res.status(201).json({ message: 'Álbum criado com sucesso', album: novoAlbum });

  } catch (error) {
    console.error('Erro ao criar álbum:', error);
    res.status(500).json({ error: 'Erro interno ao criar álbum' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao } = req.body;

  try {
    const album = await Albuns.findByPk(id);
    if (!album) return res.status(404).json({ error: 'Álbum não encontrado' });

    album.nome = nome || album.nome;
    album.descricao = descricao || album.descricao;
    album.dtalteracao = new Date();

    await album.save();
    res.json({ message: 'Álbum atualizado com sucesso', album });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar álbum', details: error.message });
  }
};

const deleteAlbum = async (req, res) => {
  const { id } = req.params;

  try {
    const album = await Albuns.findByPk(id, {
      include: {
        model: AlbumFotos,
        as: 'fotos',
        include: {
          model: DetalheEvento,
          as: 'foto'
        }
      }
    });

    if (!album) return res.status(404).json({ error: 'Álbum não encontrado' });

    for (const af of album.fotos) {
      if (af.foto?.foto) {
        await deleteFotoBunnyStorage(af.foto.foto);
        await DetalheEvento.destroy({ where: { id: af.foto.id } });
      }
    }

    await AlbumFotos.destroy({ where: { album_id: id } });
    await Albuns.destroy({ where: { id } });

    res.json({ message: 'Álbum e fotos deletados com sucesso' });

  } catch (error) {
    console.error('Erro ao deletar álbum:', error);
    res.status(500).json({ error: 'Erro ao deletar álbum', details: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: deleteAlbum
};