// Rotas referentes ao gerenciamento da conta pelo proprio usuario

const express = require('express');
const router = express.Router();
const usuariosController = require('../../controllers/usuario/usuariosController');

router.put('/', async (req, res) => {
    const id = req.userId;
    const usuarioInfo = req.body;

    await usuariosController.update(id, usuarioInfo, res)
});

module.exports = router;