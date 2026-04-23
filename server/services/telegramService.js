const axios = require('axios');

class TelegramService {
  constructor() {
  }

  get botToken() { return process.env.TELEGRAM_BOT_TOKEN; }
  get baseUrl()  { return `https://api.telegram.org/bot${this.botToken}`; }

  /**
   * Send a text message to a Telegram user
   */
  async sendMessage(chatId, message, options = {}) {
    try {
      const response = await axios.post(`${this.baseUrl}/sendMessage`, {
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
        ...options
      });

      console.log(`✅ Telegram message sent to ${chatId}`);
      return response.data;
    } catch (error) {
      console.error('❌ Telegram send error:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Send welcome message to new user
   */
  async sendWelcomeMessage(chatId) {
    const message = `👋 *Welcome to Telegram Marketplace!*

I'm your AI-powered assistant. I can help you find:
• 🎨 Logo Design
• 🌐 Website Development
• 📱 App Development
• ✍️ Content Writing
• 📣 Marketing Services
• And much more!

Just tell me what you need and your budget. For example:
_"I need a logo under ₹500"_

What can I help you with today?`;

    return this.sendMessage(chatId, message);
  }

  /**
   * Send payment link to user
   */
  async sendPaymentLink(chatId, paymentLink, orderDetails) {
    const message = `🎉 *Great choice!*

*Order Summary:*
Service: ${orderDetails.service}
Amount: ₹${orderDetails.amount}

💳 *Complete your payment here:*
${paymentLink}

Once paid, your order will be confirmed instantly! ⚡`;

    return this.sendMessage(chatId, message);
  }

  /**
   * Send order confirmation
   */
  async sendOrderConfirmation(chatId, orderDetails) {
    const message = `✅ *Payment Successful!*

Order ID: ${orderDetails.orderId}
Service: ${orderDetails.service}
Seller: ${orderDetails.sellerName}
Amount: ₹${orderDetails.amount}

🎉 Your order is confirmed! The seller will contact you shortly to start working on your order.

Thank you for using our marketplace! 🙏`;

    return this.sendMessage(chatId, message);
  }

  /**
   * Set webhook for receiving messages
   */
  async setWebhook(webhookUrl) {
    try {
      const response = await axios.post(`${this.baseUrl}/setWebhook`, {
        url: webhookUrl
      });

      console.log('✅ Telegram webhook set:', webhookUrl);
      return response.data;
    } catch (error) {
      console.error('❌ Telegram webhook error:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Get webhook info
   */
  async getWebhookInfo() {
    try {
      const response = await axios.get(`${this.baseUrl}/getWebhookInfo`);
      return response.data;
    } catch (error) {
      console.error('❌ Telegram webhook info error:', error.message);
      throw error;
    }
  }

  /**
   * Delete webhook (for local development)
   */
  async deleteWebhook() {
    try {
      const response = await axios.post(`${this.baseUrl}/deleteWebhook`);
      console.log('✅ Telegram webhook deleted');
      return response.data;
    } catch (error) {
      console.error('❌ Telegram webhook delete error:', error.message);
      throw error;
    }
  }
}

module.exports = new TelegramService();
