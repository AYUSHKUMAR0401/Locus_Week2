const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Locus payment webhook
router.post('/', paymentController.handlePaymentWebhook.bind(paymentController));

// Mock payment completion (for development/demo)
router.post('/mock/:orderId', paymentController.mockPaymentComplete.bind(paymentController));

module.exports = router;
