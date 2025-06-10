// Rotas referentes ao gerenciamento da conta pelo proprio usuario

const express = require('express');
const router = express.Router();
const usuariosController = require('../../controllers/usuario/usuariosController');
const { Usuarios } = require('../../models')

router.put('/', async (req, res) => {
    const id = req.userId;
    const usuarioInfo = req.body;

    await usuariosController.update(id, usuarioInfo, res)
});

router.get('/', async (req, res) => {
  try {
    const usuario = await Usuarios.findByPk(req.userId, {
      attributes: ['id', 'nome', 'email', 'login', 'telefone', 'tipo', 'dtinclusao']
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuário autenticado:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário autenticado' });
  }
});

module.exports = router;