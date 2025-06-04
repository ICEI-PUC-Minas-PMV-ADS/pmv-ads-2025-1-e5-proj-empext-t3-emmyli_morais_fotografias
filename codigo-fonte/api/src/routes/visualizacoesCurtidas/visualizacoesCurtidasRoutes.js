const express = require('express');
const ctl = require('../../controllers/VisualizacoesCurtidas/VisualizacoesCurtidasController');
const router = express.Router();

// Visualizações e curtidas, usando “evento_id” em vez de “album_id”
router.post('/view/evento/:evento_id', ctl.registrarVisualizacaoAlbum);
router.post('/like/evento/:evento_id', ctl.curtirAlbum);
router.post('/like/foto/:foto_id', ctl.curtirFoto);

// Endpoints para verificar curtidas do IP atual
router.get('/curtidas/evento', ctl.listarCurtidasAlbunsPorIp);
router.get('/curtidas/foto', ctl.listarCurtidasFotosPorIp);

module.exports = router;
