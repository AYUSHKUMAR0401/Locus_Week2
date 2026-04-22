const User = require('../models/User');
const Seller = require('../models/Seller');
const Order = require('../models/Order');
const aiService = require('../services/aiService');
const whatsappService = require('../services/whatsappService');
const locusService = require('../services/locusService');

// Store user session state (in production, use Redis)
const userSessions = new Map();

class WhatsAppController {
  async handleIncomingMessage(req, res) {
    try {
      const { Body, From, ProfileName } = req.body;
      
      if (!Body || !From) {
        return res.status(400).send('Invalid request');
      }

      const userPhone = From.replace('whatsapp:', '');
      const message = Body.trim();

      console.log(`📱 Message from ${userPhone}: ${message}`);

      // Get or create user
      let user = await User.findOne({ phone: userPhone });
      if (!user) {
        user = await User.create({
          phone: userPhone,
          name: ProfileName || 'User'
        });
        await whatsappService.sendWelcomeMessage(From);
        return res.status(200).send('OK');
      }

      // Save message to history
      user.history.push({
        message,
        type: 'user',
        timestamp: new Date()
      });
      await user.save();

      // Check if user is in selection mode
      const session = userSessions.get(userPhone);
      
      if (session && session.state === 'selecting') {
        await this.handleSelection(From, message, session, user);
      } else {
        await this.handleServiceRequest(From, message, user);
      }

      res.status(200).send('OK');
    } catch (error) {
      console.error('❌ Telegram webhook error:', error);
      res.status(500).send('Error processing message');
    }
  }

  async handleServiceRequest(from, message, user) {
    try {
      // Parse user intent using AI
      const intent = await aiService.parseUserIntent(message);
      
      console.log('🧠 Parsed intent:', intent);

      // Find matching sellers
      const query = {
        category: intent.service,
        isActive: true
      };

      if (intent.budget) {
        query.price = { $lte: intent.budget };
      }

      const sellers = await Seller.find(query)
        .sort({ rating: -1, completedOrders: -1 })
        .limit(5);

      // Generate and send response
      const response = await aiService.generateResponse(sellers, intent);
      await whatsappService.sendMessage(from, response);

      // Save bot response to history
      user.history.push({
        message: response,
        type: 'bot',
        timestamp: new Date()
      });
      await user.save();

      // Store session for selection
      if (sellers.length > 0) {
        userSessions.set(user.phone, {
          state: 'selecting',
          sellers: sellers.map(s => s._id),
          intent
        });
      }
    } catch (error) {
      console.error('❌ Service request error:', error);
      await whatsappService.sendMessage(
        from,
        'Sorry, something went wrong. Please try again!'
      );
    }
  }

  async handleSelection(from, message, session, user) {
    try {
      const selection = parseInt(message);
      
      if (isNaN(selection) || selection < 1 || selection > session.sellers.length) {
        await whatsappService.sendMessage(
          from,
          `Please reply with a number between 1 and ${session.sellers.length}`
        );
        return;
      }

      const sellerId = session.sellers[selection - 1];
      const seller = await Seller.findById(sellerId);

      if (!seller) {
        await whatsappService.sendMessage(from, 'Sorry, that option is no longer available.');
        userSessions.delete(user.phone);
        return;
      }

      // Create order
      const orderId = `ORD${Date.now()}`;
      const order = await Order.create({
        orderId,
        userId: user._id,
        sellerId: seller._id,
        amount: seller.price,
        status: 'payment_initiated',
        customerDetails: {
          phone: user.phone,
          name: user.name,
          requirements: session.intent.requirements
        }
      });

      // Generate payment link (demo mode)
      const paymentData = await locusService.createPaymentLink({
        orderId,
        amount: seller.price,
        service: seller.service,
        customerPhone: user.phone,
        customerName: user.name,
        sellerId: seller._id
      });

      order.paymentDetails.paymentLink = paymentData.paymentLink;
      order.paymentDetails.locusTransactionId = paymentData.transactionId;
      await order.save();

      // Send payment link
      await whatsappService.sendPaymentLink(from, paymentLink, {
        service: seller.service,
        amount: seller.price
      });

      // Clear session
      userSessions.delete(user.phone);

    } catch (error) {
      console.error('❌ Selection error:', error);
      await whatsappService.sendMessage(
        from,
        'Sorry, something went wrong. Please try again!'
      );
    }
  }
}

module.exports = new WhatsAppController();
