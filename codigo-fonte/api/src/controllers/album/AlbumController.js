const {
  Albuns,
  AlbumFotos,
  DetalheEvento,
  VisualizacaoAlbum,
  CurtidaAlbum,
  CurtidaFoto,
  Feedbacks,
  Usuarios,
  EventosModel,
  Comentarios,
} = require('../../models');
const { deleteFotoBunnyStorage, uploadFotoBunnyStorage } = require('../../service/uploadService');
const { fn, col } = require('sequelize');


const getAll = async (req, res) => {
  const { usuario_id, sem_feedback } = req.query;

  const whereClause = {};
  if (usuario_id) {
    whereClause.usuario_id = usuario_id;
  }

  try {
    const albuns = await Albuns.findAll({
      where: whereClause,
      include: [
        { model: VisualizacaoAlbum, as: 'visualizacoesAlbuns' },
        { model: CurtidaAlbum, as: 'curtidasAlbuns' },
        {
          model: Feedbacks,
          as: 'feedbacks',
          required: false
        },
        {
          model: AlbumFotos,
          as: 'fotos',
          include: [
            {
              model: DetalheEvento,
              as: 'foto',
              include: [
                {
                  model: Comentarios,
                  as: 'comentarios'
                }
              ]
            }
          ]
        },
        {
          model: Usuarios,
          as: 'usuario'
        }
      ]
    });

    const filtrados = sem_feedback === 'true'
      ? albuns.filter(album => (album.feedbacks || []).length === 0)
      : albuns;

    const resultado = filtrados.map(album => {
      const curtidasDoAlbum = album.curtidasAlbuns?.length || 0;
      const curtidasDasFotos = album.fotos.reduce((acc, af) => {
        return acc + (af.foto?.curtidasFotos?.length || 0);
      }, 0);

      const visualizacoes = album.visualizacoesAlbuns?.length || 0;

      return {
        id: album.id,
        nome: album.nome,
        descricao: album.descricao,
        origem: album.origem,
        dtinclusao: album.dtinclusao,
        usuario: album.usuario,
        fotos: album.fotos,
        visualizacoes,
        curtidasAlbum: curtidasDoAlbum,
        curtidasFotos: curtidasDasFotos,
        totalCurtidas: curtidasDoAlbum + curtidasDasFotos
      };
    });

    res.json(resultado);

  } catch (err) {
    console.error('Erro ao buscar álbuns:', err);
    res.status(500).json({ error: 'Erro ao buscar álbuns' });
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
    console.error('Erro ao buscar álbum:', error);
    res.status(500).json({ error: 'Erro ao buscar álbum', details: error.message });
  }
};



const create = async (req, res) => {
  try {
    const { nome, descricao, usuario_id, origem } = req.body;
    const imagens = req.files;

    if (!nome || !usuario_id || !descricao || !imagens || imagens.length === 0) {
      return res.status(400).json({ error: 'Dados incompletos: nome, descrição, usuário e imagens são obrigatórios.' });
    }

    // Cria o álbum
    const novoAlbum = await Albuns.create({
      nome,
      descricao,
      usuario_id,
      origem: origem || 'cliente',
      dtinclusao: new Date(),
      dtalteracao: new Date()
    });

   
    const detalhes = await Promise.all(imagens.map(async file => {
      const url = await uploadFotoBunnyStorage(file);
      return {
        evento_id:      1,            
        foto:           url,
        tem_marca_agua: true,
        ordem:          0,            
        dtinclusao:     new Date(),
        dtalteracao:    new Date()
      };
    }));

  
    const fotosCriadas = await DetalheEvento.bulkCreate(detalhes, { returning: true });
    const albunsFotosData = fotosCriadas.map(foto => ({
      album_id: novoAlbum.id,
      id_foto:  foto.id,
      dtinclusao:  new Date(),
      dtalteracao: new Date()
    }));
    await AlbumFotos.bulkCreate(albunsFotosData);

    res.status(201).json({ message: 'Álbum criado com sucesso', album: novoAlbum });
  } catch (error) {
    console.error('Erro ao criar álbum:', error);
    res.status(500).json({ error: 'Erro interno ao criar álbum', details: error.message });
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
    console.error('Erro ao atualizar álbum:', error);
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

    // Deleta fotos paralelamente
    await Promise.all(album.fotos.map(async af => {
      if (af.foto?.foto) {
        await deleteFotoBunnyStorage(af.foto.foto);
        await DetalheEvento.destroy({ where: { id: af.foto.id } });
      }
    }));

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