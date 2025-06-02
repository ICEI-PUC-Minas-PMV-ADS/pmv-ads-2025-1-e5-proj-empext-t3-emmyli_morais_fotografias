const express = require('express');
const router = express.Router();
const notificacaoController = require('../../controllers/notificacao/notificacaoController');


router.get('/', notificacaoController.getAll);

module.exports = router;