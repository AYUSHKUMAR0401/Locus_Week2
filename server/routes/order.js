const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create new order
router.post('/create', orderController.createOrder.bind(orderController));

// Get order by ID
router.get('/:orderId', orderController.getOrder.bind(orderController));

// Get user orders
router.get('/user/:userId', orderController.getUserOrders.bind(orderController));

module.exports = router;
