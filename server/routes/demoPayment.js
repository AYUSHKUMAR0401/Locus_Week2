const express = require('express');
const router = express.Router();
const demoPaymentController = require('../controllers/demoPaymentController');

// Show demo payment page
router.get('/', demoPaymentController.showPaymentPage.bind(demoPaymentController));

// Complete demo payment (called from payment page)
router.post('/complete', demoPaymentController.completePayment.bind(demoPaymentController));

module.exports = router;
