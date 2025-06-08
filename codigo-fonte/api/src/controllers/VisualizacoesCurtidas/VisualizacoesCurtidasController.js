'use strict';

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
    (req.connection?.socket && req.connection.socket.remoteAddress);
  return ip?.toString().replace('::ffff:', '') || 'desconhecido';
};

module.exports = {
  // Insere sempre uma nova visualização
  async registrarVisualizacaoAlbum(req, res) {
    const { evento_id } = req.params;
    const ip = obterIp(req);
    try {
      const view = await VisualizacaoAlbum.create(
        { evento_id, ip_usuario: ip },
        { returning: ['id', 'evento_id', 'ip_usuario', 'dtinclusao'] }
      );
      return res.status(201).json(view);
    } catch (erro) {
      console.error('Erro ao registrar visualização:', erro);
      return res.status(500).json({ error: 'Erro ao registrar visualização.' });
    }
  },

  // Curtida de evento (única por IP)
  async curtirAlbum(req, res) {
    const { evento_id } = req.params;
    const ip = obterIp(req);
    try {
      const jaCurtiu = await CurtidaAlbum.findOne({
        where: { evento_id, ip_usuario: ip }
      });
      if (jaCurtiu) {
        return res.status(400).json({ error: 'Você já curtiu este evento.' });
      }
      const curtida = await CurtidaAlbum.create(
        { evento_id, ip_usuario: ip },
        { returning: ['id', 'evento_id', 'ip_usuario', 'dtinclusao'] }
      );
      return res.status(201).json(curtida);
    } catch (erro) {
      console.error('Erro ao curtir evento:', erro);
      return res.status(500).json({ error: 'Erro ao curtir evento.' });
    }
  },

  // Curtida de foto (única por IP)
  async curtirFoto(req, res) {
    const { foto_id } = req.params;
    const ip = obterIp(req);
    try {
      const jaCurtiu = await CurtidaFoto.findOne({
        where: { id_foto: foto_id, ip_usuario: ip }
      });
      if (jaCurtiu) {
        return res.status(400).json({ error: 'Você já curtiu esta foto.' });
      }
      const curtida = await CurtidaFoto.create(
        { id_foto: foto_id, ip_usuario: ip },
        { returning: ['id', 'id_foto', 'ip_usuario', 'dtinclusao'] }
      );
      return res.status(201).json(curtida);
    } catch (erro) {
      console.error('Erro ao curtir foto:', erro);
      return res.status(500).json({ error: 'Erro ao curtir foto.' });
    }
  },

  // Lista IDs de eventos curtidos por este IP
  async listarCurtidasAlbunsPorIp(req, res) {
    const ip = obterIp(req);
    try {
      const curtidas = await CurtidaAlbum.findAll({
        where: { ip_usuario: ip },
        attributes: ['evento_id']
      });
      const eventos = curtidas.map(c => c.evento_id);
      return res.status(200).json({ eventos });
    } catch (erro) {
      console.error('Erro ao buscar curtidas de eventos:', erro);
      return res.status(500).json({ error: 'Erro ao buscar curtidas de eventos.' });
    }
  },

  // Lista IDs de fotos curtidas por este IP
  async listarCurtidasFotosPorIp(req, res) {
    const ip = obterIp(req);
    try {
      const curtidas = await CurtidaFoto.findAll({
        where: { ip_usuario: ip },
        attributes: ['id_foto']
      });
      const fotos = curtidas.map(c => c.id_foto);
      return res.status(200).json({ fotos });
    } catch (erro) {
      console.error('Erro ao buscar curtidas de fotos:', erro);
      return res.status(500).json({ error: 'Erro ao buscar curtidas de fotos.' });
    }
  }
};
