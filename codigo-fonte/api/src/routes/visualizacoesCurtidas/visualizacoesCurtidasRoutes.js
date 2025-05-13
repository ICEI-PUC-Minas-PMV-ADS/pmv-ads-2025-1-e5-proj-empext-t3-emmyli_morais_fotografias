const express = require('express');
const ctl = require('../../controllers/VisualizacoesCurtidas/VisualizacoesCurtidasController');
const router = express.Router();

// Visualizações e curtidas
router.post('/view/album/:album_id', ctl.registrarVisualizacaoAlbum);
router.post('/like/album/:album_id', ctl.curtirAlbum);
router.post('/like/foto/:foto_id', ctl.curtirFoto);

// Novos endpoints para verificar curtidas do IP atual
router.get('/curtidas/album', ctl.listarCurtidasAlbunsPorIp);
router.get('/curtidas/foto', ctl.listarCurtidasFotosPorIp);

module.exports = router;
