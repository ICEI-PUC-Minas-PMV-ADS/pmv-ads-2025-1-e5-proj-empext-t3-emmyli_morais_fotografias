// routes/categorias.js
const express = require('express');
const router = express.Router();
const controller = require('../../controllers/categoria/categoriaController');

// GET   /api/categorias
router.get('/', controller.getAll);

// POST  /api/categorias
router.post('/', controller.create);

// DELETE /api/categorias/:id
router.delete('/:id', controller.remove);

module.exports = router;
