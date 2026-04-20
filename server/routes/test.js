const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Seller = require('../models/Seller');
const Order = require('../models/Order');
const aiService = require('../services/aiService');
const telegramService = require('../services/telegramService');
const locusService = require('../services/locusService');

// Test database connection
router.get('/database', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const sellerCount = await Seller.countDocuments();
    const orderCount = await Order.countDocuments();

    res.json({
      success: true,
      message: 'Database connection successful',
      data: {
        users: userCount,
        sellers: sellerCount,
        orders: orderCount,
        status: 'connected'
      }
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Test AI service
router.post('/ai', async (req, res) => {
  try {
    const { message } = req.body;
    const testMessage = message || 'I need a logo under ₹500';

    const intent = await aiService.parseUserIntent(testMessage);

    res.json({
      success: true,
      message: 'AI service working',
      data: {
        input: testMessage,
        parsed: intent,
        model: 'llama-3.1-70b-versatile'
      }
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'AI service failed',
      error: error.message
    });
  }
});

// Test Telegram service
router.get('/telegram', async (req, res) => {
  try {
    const webhookInfo = await telegramService.getWebhookInfo();

    res.json({
      success: true,
      message: 'Telegram service working',
      data: {
        botToken: process.env.TELEGRAM_BOT_TOKEN ? 'Set' : 'Not set',
        botUsername: process.env.TELEGRAM_BOT_USERNAME,
        webhookInfo: webhookInfo.result
      }
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Telegram service failed',
      error: error.message
    });
  }
});

// Test payment system
router.get('/payment', async (req, res) => {
  try {
    const testPaymentData = await locusService.createPaymentLink({
      orderId: 'TEST' + Date.now(),
      amount: 499,
      service: 'Test Service',
      customerPhone: '1234567890',
      customerName: 'Test User',
      sellerId: 'test123'
    });

    res.json({
      success: true,
      message: 'Payment system working',
      data: {
        paymentMode: process.env.PAYMENT_MODE || 'demo',
        paymentLink: testPaymentData.paymentLink,
        transactionId: testPaymentData.transactionId
      }
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Payment system failed',
      error: error.message
    });
  }
});

module.exports = router;
