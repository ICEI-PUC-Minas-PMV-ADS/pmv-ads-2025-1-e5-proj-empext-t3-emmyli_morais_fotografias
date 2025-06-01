const express = require('express');
const { criarPreferencia } = require('../../controllers/pagamento/PagamentoController');

const router = express.Router();

router.post('/', criarPreferencia);

module.exports = router;