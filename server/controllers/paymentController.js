const Order = require('../models/Order');
const Seller = require('../models/Seller');
const User = require('../models/User');
const telegramService = require('../services/telegramService');

class PaymentController {
  async handlePaymentWebhook(req, res) {
    try {
      const { transaction_id, status, metadata } = req.body;

      console.log('💳 Payment webhook received:', req.body);

      if (status !== 'success' && status !== 'paid') {
        return res.status(200).json({ received: true });
      }

      const orderId = metadata?.orderId;
      if (!orderId) {
        console.error('❌ No orderId in webhook');
        return res.status(400).json({ error: 'Missing orderId' });
      }

      // Find and update order
      const order = await Order.findOne({ orderId })
        .populate('userId')
        .populate('sellerId');

      if (!order) {
        console.error('❌ Order not found:', orderId);
        return res.status(404).json({ error: 'Order not found' });
      }

      if (order.status === 'paid' || order.status === 'completed') {
        return res.status(200).json({ message: 'Already processed' });
      }

      // Update order status
      order.status = 'paid';
      order.paymentDetails.paidAt = new Date();
      await order.save();

      // Update seller stats
      await Seller.findByIdAndUpdate(order.sellerId._id, {
        $inc: { completedOrders: 1 }
      });

      // Send confirmation to customer
      await telegramService.sendOrderConfirmation(
        order.userId.phone,
        {
          orderId: order.orderId,
          service: order.sellerId.service,
          amount: order.amount,
          sellerName: order.sellerId.name
        }
      );

      console.log('✅ Payment processed successfully:', orderId);
      res.status(200).json({ success: true });

    } catch (error) {
      console.error('❌ Payment webhook error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Mock payment completion for development
  async mockPaymentComplete(req, res) {
    try {
      const { orderId } = req.params;

      const order = await Order.findOne({ orderId })
        .populate('userId')
        .populate('sellerId');

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      order.status = 'paid';
      order.paymentDetails.paidAt = new Date();
      await order.save();

      await Seller.findByIdAndUpdate(order.sellerId._id, {
        $inc: { completedOrders: 1 }
      });

      await telegramService.sendOrderConfirmation(
        order.userId.phone,
        {
          orderId: order.orderId,
          service: order.sellerId.service,
          amount: order.amount,
          sellerName: order.sellerId.name
        }
      );

      res.json({ 
        success: true, 
        message: 'Payment completed',
        order 
      });

    } catch (error) {
      console.error('❌ Mock payment error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new PaymentController();
