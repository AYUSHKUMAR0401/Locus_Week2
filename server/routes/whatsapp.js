const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsappController');

// WhatsApp webhook endpoint
router.post('/', whatsappController.handleIncomingMessage.bind(whatsappController));

// Webhook verification (for Twilio)
router.get('/', (req, res) => {
  res.status(200).send('WhatsApp webhook is active');
});

module.exports = router;
