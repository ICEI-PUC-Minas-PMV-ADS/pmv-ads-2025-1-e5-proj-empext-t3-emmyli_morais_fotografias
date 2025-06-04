const {
  CurtidaAlbum,
  CurtidaFoto,
  VisualizacaoAlbum
} = require('../../models');


const obterIp = (req) => {
  const ip =
    req.headers['x-forwarded-for'] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    (req.connection?.socket ? req.connection.socket.remoteAddress : null);

  return ip?.toString().replace('::ffff:', '') || 'desconhecido';
};

module.exports = {
  // ✅ Registra visualização ao abrir o álbum
  registrarVisualizacaoAlbum: async (req, res) => {
    const { evento_id } = req.params;
    const ip = obterIp(req);

    try {
      await VisualizacaoAlbum.create({ evento_id, ip_usuario: ip });
      return res.status(200).json({ message: 'Visualização registrada com sucesso.' });
    } catch (err) {
      console.error('Erro ao registrar visualização:', err);
      return res.status(500).json({ error: 'Erro ao registrar visualização.' });
    }
  },

  // ✅ Curtir álbum 1x por IP
  curtirAlbum: async (req, res) => {
    const { evento_id } = req.params;
    const ip = obterIp(req);

    try {
      const jaCurtiu = await CurtidaAlbum.findOne({ where: { evento_id, ip_usuario: ip } });
      if (jaCurtiu) {
        return res.status(400).json({ error: 'Você já curtiu este álbum.' });
      }

      await CurtidaAlbum.create({ evento_id, ip_usuario: ip });
      return res.status(201).json({ message: 'Curtida registrada com sucesso.' });
    } catch (err) {
      console.error('Erro ao curtir álbum:', err);
      return res.status(500).json({ error: 'Erro ao curtir álbum.' });
    }
  },

  // ✅ Curtir foto 1x por IP
  curtirFoto: async (req, res) => {
    const { foto_id } = req.params;
    const ip = obterIp(req);

    try {
      const jaCurtiu = await CurtidaFoto.findOne({ where: { id_foto: foto_id, ip_usuario: ip } });
      if (jaCurtiu) {
        return res.status(400).json({ error: 'Você já curtiu esta foto.' });
      }

      await CurtidaFoto.create({ id_foto: foto_id, ip_usuario: ip  });
      return res.status(201).json({ message: 'Curtida registrada com sucesso.' });
    } catch (err) {
      console.error('Erro ao curtir foto:', err);
      return res.status(500).json({ error: 'Erro ao curtir foto.' });
    }
  },

  // ✅ NOVO: retorna lista de IDs de álbuns curtidos por IP
  listarCurtidasAlbunsPorIp: async (req, res) => {
    const ip = obterIp(req);

    try {
      const curtidas = await CurtidaAlbum.findAll({ where: { ip_usuario: ip } });
      const eventos = curtidas.map(c => c.evento_id);
      res.json({ albuns: eventos });
    } catch (err) {
      console.error('Erro ao buscar curtidas de álbuns:', err);
      res.status(500).json({ error: 'Erro ao buscar curtidas de álbuns' });
    }
  },

  // ✅ NOVO: retorna lista de IDs de fotos curtidas por IP
  listarCurtidasFotosPorIp: async (req, res) => {
    const ip = obterIp(req);

    try {
      const curtidas = await CurtidaFoto.findAll({ where: { ip_usuario: ip } });
      const fotos = curtidas.map(c => c.id_foto);
      res.json({ fotos });
    } catch (err) {
      console.error('Erro ao buscar curtidas de fotos:', err);
      res.status(500).json({ error: 'Erro ao buscar curtidas de fotos' });
    }
  }
};
