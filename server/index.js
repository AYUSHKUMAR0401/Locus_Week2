require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/database');
const telegramRoutes = require('./routes/telegram');
const paymentRoutes = require('./routes/payment');
const orderRoutes = require('./routes/order');
const demoPaymentRoutes = require('./routes/demoPayment');
const testRoutes = require('./routes/test');
const adminRoutes = require('./routes/admin');
const telegramPolling = require('./services/telegramPolling');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Connect to MongoDB (non-blocking)
connectDB().catch(err => console.error('MongoDB connection failed, continuing without DB'));

// Routes
app.use('/webhook/telegram', telegramRoutes);
app.use('/webhook/payment', paymentRoutes);
app.use('/order', orderRoutes);
app.use('/demo-payment', demoPaymentRoutes);
app.use('/api/test', testRoutes);
app.use('/api/admin', adminRoutes);

// Health check API
app.get('/api', (req, res) => {
  res.json({ 
    status: 'active',
    message: 'AI Marketplace API',
    version: '1.0.0',
    endpoints: {
      telegram: '/webhook/telegram',
      payment: '/webhook/payment',
      demoPayment: '/demo-payment',
      admin: '/admin',
      tests: '/api/test'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Telegram webhook: http://localhost:${PORT}/webhook/telegram`);
  console.log(`💳 Payment webhook: http://localhost:${PORT}/webhook/payment`);
  console.log(`🎬 Demo payment: http://localhost:${PORT}/demo-payment`);
  
  // Start Telegram polling for local development
  if (process.env.NODE_ENV === 'development') {
    console.log('🤖 Starting Telegram bot in polling mode...');
    await telegramPolling.start();
  }
});

module.exports = app;
