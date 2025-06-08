'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/VisualizacoesCurtidas/VisualizacoesCurtidasController');

// Rota para registrar visualização (sempre incrementa)
router.post('/view/evento/:evento_id', controller.registrarVisualizacaoAlbum);

// Rota para curtir evento (1 curtida por IP)
router.post('/like/evento/:evento_id', controller.curtirAlbum);

// Rota para obter lista de eventos já curtidos por este IP
router.get('/curtidas/evento', controller.listarCurtidasAlbunsPorIp);

// Rota para curtir foto (1 curtida por IP)
router.post('/like/foto/:foto_id', controller.curtirFoto);

// Rota para obter lista de fotos já curtidas por este IP
router.get('/curtidas/foto', controller.listarCurtidasFotosPorIp);

module.exports = router;
