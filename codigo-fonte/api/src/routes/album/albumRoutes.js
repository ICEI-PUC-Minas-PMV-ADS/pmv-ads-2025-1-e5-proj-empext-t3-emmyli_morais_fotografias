const express = require('express');
const router = express.Router();
const albunsController = require('../../controllers/album/AlbumController');
const verifyToken = require('../../middleware/AuthMiddlewareToken');


// IMPORTANTE: multer para lidar com arquivos
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Agora aplicamos o middleware "upload.array('fotos')" no POST
router.get('/', AlbumController.index);
router.post('/', AlbumController.create);
router.delete('/:id', AlbumController.delete);
router.get('/', albunsController.getAll);
router.get('/:id', albunsController.getById);
router.post('/', verifyToken, upload.array('fotos'), albunsController.create);
router.put('/:id', verifyToken, albunsController.update);
router.delete('/:id', verifyToken, albunsController.delete);

module.exports = router;
