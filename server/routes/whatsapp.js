const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsappController');

// Telegram webhook endpoint
router.post('/', whatsappController.handleIncomingMessage.bind(whatsappController));

// Webhook verification (for Twilio)
router.get('/', (req, res) => {
  res.status(200).send('Telegram webhook is active');
});

module.exports = router;
