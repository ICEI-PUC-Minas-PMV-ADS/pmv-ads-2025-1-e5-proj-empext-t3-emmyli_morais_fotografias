const express = require('express');
const router = express.Router();
const FotoController = require('../../controllers/foto/FotoController');
const UploadImagem = require('../../middleware/UploadImage');

// Adicionar fotos ao álbum
router.post('/adicionar', UploadImagem.array('fotos'), FotoController.adicionar);

// Excluir uma foto pelo ID
router.delete('/:id', FotoController.delete);

module.exports = router;
