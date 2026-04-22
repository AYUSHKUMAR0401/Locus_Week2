const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Seller = require('../models/Seller');
const Order = require('../models/Order');

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalSellers = await Seller.countDocuments();
    
    const paidOrders = await Order.find({ status: { $in: ['paid', 'completed'] } });
    const totalRevenue = paidOrders.reduce((sum, order) => sum + order.amount, 0);

    res.json({
      success: true,
      stats: {
        totalOrders,
        totalUsers,
        totalSellers,
        totalRevenue,
        paidOrders: paidOrders.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get recent orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name phone')
      .populate('sellerId', 'name service')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get sellers
router.get('/sellers', async (req, res) => {
  try {
    const sellers = await Seller.find()
      .sort({ completedOrders: -1 })
      .limit(20);

    res.json({
      success: true,
      sellers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
