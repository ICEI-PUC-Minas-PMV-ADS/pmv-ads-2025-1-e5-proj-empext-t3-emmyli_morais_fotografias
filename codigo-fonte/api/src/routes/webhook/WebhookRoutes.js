const express = require('express');
const router = express.Router();
const webhookHandler = require('../../controllers/webhook/WebhookController');

// Rota para o webhook
router.post('/', webhookHandler);

module.exports = router;
