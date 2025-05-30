const express = require('express');
const router = express.Router();
const Api_Controller = require('../../controllers/Api_Controller');
const EventoProdutoController = new Api_Controller('EventoProduto');

router.get('/', EventoProdutoController.getAll);
router.get('/:id', EventoProdutoController.getById);
router.post('/', EventoProdutoController.create);
router.put('/:id', EventoProdutoController.update);
router.delete('/:id', EventoProdutoController.delete); 

module.exports = router;