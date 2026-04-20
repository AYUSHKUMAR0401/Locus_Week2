const Order = require('../models/Order');

class OrderController {
  async createOrder(req, res) {
    try {
      const { userId, sellerId, amount, customerDetails } = req.body;

      const orderId = `ORD${Date.now()}`;
      
      const order = await Order.create({
        orderId,
        userId,
        sellerId,
        amount,
        customerDetails,
        status: 'pending'
      });

      res.status(201).json({
        success: true,
        order
      });
    } catch (error) {
      console.error('❌ Create order error:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  }

  async getOrder(req, res) {
    try {
      const { orderId } = req.params;

      const order = await Order.findOne({ orderId })
        .populate('userId', 'name phone')
        .populate('sellerId', 'name service price');

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json({ success: true, order });
    } catch (error) {
      console.error('❌ Get order error:', error);
      res.status(500).json({ error: 'Failed to fetch order' });
    }
  }

  async getUserOrders(req, res) {
    try {
      const { userId } = req.params;

      const orders = await Order.find({ userId })
        .populate('sellerId', 'name service price')
        .sort({ createdAt: -1 });

      res.json({ success: true, orders });
    } catch (error) {
      console.error('❌ Get user orders error:', error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  }
}

module.exports = new OrderController();
