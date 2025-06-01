const express = require('express');
const router = express.Router();
const comprasController = require('../../controllers/compras/ComprasController');

router.get('/', comprasController.getAll);
router.get('/:id', comprasController.getById);
router.post('/', comprasController.create)
router.put('/:id', comprasController.update);
router.delete('/:id', comprasController.delete);

module.exports = router;
