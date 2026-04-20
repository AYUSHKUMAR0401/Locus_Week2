const express = require('express');
const router = express.Router();
const telegramController = require('../controllers/telegramController');

// Telegram webhook endpoint
router.post('/', telegramController.handleIncomingMessage.bind(telegramController));

// Webhook verification
router.get('/', (req, res) => {
  res.status(200).send('Telegram webhook is active');
});

module.exports = router;
