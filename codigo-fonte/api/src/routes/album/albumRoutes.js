const express = require('express');
const router = express.Router();
const albunsController = require('../../controllers/album/AlbumController');
const verifyToken = require('../../middleware/AuthMiddlewareToken');

const upload = require('../../middleware/UploadImage');

// Agora aplicamos o middleware "upload.array('fotos')" no POST
router.get('/', albunsController.getAll);
router.get('/:id', albunsController.getById);
router.post('/', verifyToken, upload.array('fotos'), albunsController.create);
router.put('/:id', verifyToken, albunsController.update);
router.delete('/:id', verifyToken, albunsController.delete);

module.exports = router;
