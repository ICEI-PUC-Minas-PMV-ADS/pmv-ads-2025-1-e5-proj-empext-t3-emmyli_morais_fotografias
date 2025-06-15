const {
  Albuns,
  AlbumFotos,
  DetalheEvento,
  Feedbacks,
  Usuarios,
  Comentarios,
} = require('../../models');
const { deleteFotoBunnyStorage, uploadFotoBunnyStorage } = require('../../service/uploadService');
/*const { fn, col } = require('sequelize');*/


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

    // Mapeia para JSON limpo
    const resultado = filtrados.map(album => ({
      id:        album.id,
      nome:      album.nome,
      descricao: album.descricao,
      origem:    album.origem,
      downloadfoto: album.downloadfoto,
      dtinclusao:album.dtinclusao,
      usuario:   album.usuario,
      fotos:     album.fotos
    }));

    return res.json(resultado);

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
    const { nome, descricao, usuario_id, origem, downloadfoto } = req.body;
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
      downloadfoto: downloadfoto || false,
      dtinclusao: new Date(),
      dtalteracao: new Date()
    });

   
    const detalhes = await Promise.all(imagens.map(async file => {
      const url = await uploadFotoBunnyStorage(file);
      return {
        evento_id:      novoAlbum.id,           
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

const createAdmin = async (req, res) => {
  try {
    const { nome, descricao, usuario_id, origem, downloadfoto } = req.body;
    const imagens = req.files;

    if (!nome || !usuario_id || !descricao || !imagens || imagens.length === 0) {
      return res.status(400).json({ error: 'Dados incompletos: nome, descrição, usuário e imagens são obrigatórios.' });
    }

    // Cria o álbum
    const novoAlbum = await Albuns.create({
      nome,
      descricao,
      usuario_id,
      origem: origem || 'admin',
      downloadfoto: downloadfoto || false,
      dtinclusao: new Date(),
      dtalteracao: new Date()
    });

    // Faz o upload das imagens e monta os registros para AlbumFotos
    const albunsFotosData = await Promise.all(
      imagens.map(async (file) => {
        const url = await uploadFotoBunnyStorage(file);

        return {
          album_id: novoAlbum.id,
          foto_url: url,
          origem: 'admin',
          dtinclusao: new Date(),
          dtalteracao: new Date()
        };
      })
    );

    // Cria os registros na tabela album_fotos
    await AlbumFotos.bulkCreate(albunsFotosData);

    return res.status(201).json({ mensagem: 'Álbum criado com sucesso!', album: novoAlbum });
  } catch (err) {
    console.error('Erro ao criar álbum (admin):', err);
    return res.status(500).json({ error: 'Erro ao criar álbum. Tente novamente.' });
  }
};




const update = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, downloadfoto } = req.body;
  const arquivos = req.files || [];

  try {
    const album = await Albuns.findByPk(id);
    if (!album) {
      return res.status(404).json({ error: 'Álbum não encontrado' });
    }

    console.log('Atualizando álbum:', id);
    // Atualiza os dados do álbum
    album.nome = nome || album.nome;
    album.descricao = descricao || album.descricao;
    album.downloadfoto = downloadfoto ?? album.downloadfoto;
    album.dtalteracao = new Date();
    const response = await album.save();
    console.log('files:', arquivos);
    console.log('Álbum atualizado:', response);
    // Envia novas fotos para Bunny e salva na AlbumFotos
    const novasFotos = await Promise.all(
      arquivos.map(async (file) => {
        const url = await uploadFotoBunnyStorage(file); // deve retornar a URL da imagem
            console.log('URL da foto enviada:', url);

        return AlbumFotos.create({
          album_id: id,
          foto_url: url, // salva a URL retornada da Bunny
        });
      })
    );

    res.json({
      message: 'Álbum atualizado com sucesso',
      album,
      novasFotos,
    });
  } catch (error) {
    console.error('Erro ao atualizar álbum (fluxo 2 com Bunny):', error);
    res.status(500).json({
      error: 'Erro ao atualizar álbum',
      details: error.message,
    });
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
  createAdmin,
  update,
  delete: deleteAlbum
};