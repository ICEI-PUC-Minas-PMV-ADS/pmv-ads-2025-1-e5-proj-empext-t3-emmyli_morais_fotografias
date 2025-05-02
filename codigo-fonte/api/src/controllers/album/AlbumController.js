const { Albuns, AlbumFotos, DetalheEvento } = require('../../models');
const { uploadFotoBunnyStorage } = require('../../service/uploadService');

class AlbumController {
  // Criar novo álbum
  async create(req, res) {
    try {
      console.log("BODY:", req.body);
      console.log("FILES:", req.files);
      const { usuario_id, nome, descricao } = req.body;
      const fotos = req.files; // recebemos múltiplas imagens

      if (!fotos || fotos.length === 0) {
        return res.status(400).json({ message: "Nenhuma foto enviada!" });
      }

      // Cria o álbum
      const album = await Albuns.create({ usuario_id, nome, descricao });

      //  processa e associa as fotos
      for (const foto of fotos) {
        const urlFoto = await uploadFotoBunnyStorage(foto);

        // Salva a foto no detalhe_evento (como foto isolada)
        const detalheFoto = await DetalheEvento.create({
          evento_id: null, // Foto de álbum, sem evento
          foto: urlFoto,
          tem_marca_agua: true,
          ordem: 0
        });

        // Relaciona a foto ao álbum
        await AlbumFotos.create({
          album_id: album.id,
          id_foto: detalheFoto.id
        });
      }

      res.status(201).json({ message: "Álbum criado com sucesso", album_id: album.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao criar álbum" });
    }
  }

  // Buscar todos os álbuns
  async getAll(req, res) {
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
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar álbuns" });
    }
  }

  // Buscar um álbum pelo ID
async getById(req, res) {
  try {
    const { id } = req.params;
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

    if (!album) {
      return res.status(404).json({ message: "Álbum não encontrado" });
    }

    res.json(album);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar álbum" });
  }
}

// Atualizar álbum
async update(req, res) {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    const [updated] = await Albuns.update({ nome, descricao }, { where: { id } });

    if (!updated) {
      return res.status(404).json({ message: "Álbum não encontrado" });
    }

    res.json({ message: "Álbum atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar álbum" });
  }
}

// Deletar álbum
async delete(req, res) {
  try {
    const { id } = req.params;

    const deleted = await Albuns.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Álbum não encontrado" });
    }

    res.json({ message: "Álbum deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar álbum" });
  }
}

}

module.exports = new AlbumController();
