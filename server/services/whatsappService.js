const twilio = require('twilio');

class WhatsAppService {
  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    this.fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;
  }

  async sendMessage(to, message) {
    try {
      // Ensure phone number has whatsapp: prefix
      const toNumber = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
      
      const result = await this.client.messages.create({
        body: message,
        from: this.fromNumber,
        to: toNumber
      });

      console.log(`✅ Message sent to ${to}: ${result.sid}`);
      return result;
    } catch (error) {
      console.error('❌ Telegram send error:', error);
      throw error;
    }
  }

  async sendPaymentLink(to, paymentLink, orderDetails) {
    const message = `🎉 Great choice!

*Order Summary:*
Service: ${orderDetails.service}
Amount: ₹${orderDetails.amount}

💳 *Complete your payment here:*
${paymentLink}

Once paid, your order will be confirmed instantly! ⚡`;

    return this.sendMessage(to, message);
  }

  async sendOrderConfirmation(to, orderDetails) {
    const message = `✅ *Payment Successful!*

Order ID: ${orderDetails.orderId}
Service: ${orderDetails.service}
Seller: ${orderDetails.sellerName}
Amount: ₹${orderDetails.amount}

🎉 Your order is confirmed! The seller will contact you shortly to start working on your order.

Thank you for using our marketplace! 🙏`;

    return this.sendMessage(to, message);
  }

  async sendWelcomeMessage(to) {
    const message = `👋 Welcome to AI Marketplace!

I'm your AI assistant. I can help you find:
• Logo Design
• Website Development
• App Development
• Content Writing
• Marketing Services
• And more!

Just tell me what you need and your budget. For example:
"I need a logo under ₹500"

What can I help you with today?`;

    return this.sendMessage(to, message);
  }
}

module.exports = new WhatsAppService();
