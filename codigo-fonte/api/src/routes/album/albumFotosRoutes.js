const express = require('express');
const router = express.Router();
const albumFotosController = require('../../controllers/album/AlbumFotosController');

const verifyToken = require('../../middleware/AuthMiddlewareToken');


//router.post('/', verifyToken, upload.array('fotos'), albumFotosController.create);

router.delete('/:albumId/:fotoId', verifyToken, albumFotosController.delete);

module.exports = router;
