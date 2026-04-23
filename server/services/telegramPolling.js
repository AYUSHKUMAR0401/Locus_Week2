const axios = require('axios');
const telegramController = require('../controllers/telegramController');

class TelegramPolling {
  constructor() {
    this.offset = 0;
    this.isPolling = false;
  }

  get botToken() { return process.env.TELEGRAM_BOT_TOKEN; }
  get baseUrl()  { return `https://api.telegram.org/bot${this.botToken}`; }

  /**
   * Start polling for updates
   */
  async start() {
    if (this.isPolling) {
      console.log('⚠️  Polling already running');
      return;
    }

    if (!this.botToken || this.botToken === 'placeholder') {
      console.error('❌ TELEGRAM_BOT_TOKEN is not set. Bot will not start.');
      return;
    }

    console.log('🔄 Starting Telegram polling...');
    this.isPolling = true;
    await this.deleteWebhook();
    this.poll();
  }

  /**
   * Stop polling
   */
  stop() {
    console.log('🛑 Stopping Telegram polling...');
    this.isPolling = false;
  }

  /**
   * Delete webhook to enable polling
   */
  async deleteWebhook() {
    try {
      await axios.post(`${this.baseUrl}/deleteWebhook`);
      console.log('✅ Webhook deleted, polling enabled');
    } catch (error) {
      console.error('❌ Error deleting webhook:', error.message);
    }
  }

  /**
   * Poll for updates
   */
  async poll() {
    while (this.isPolling) {
      try {
        const response = await axios.get(`${this.baseUrl}/getUpdates`, {
          params: {
            offset: this.offset,
            timeout: 30, // Long polling timeout
            allowed_updates: ['message']
          }
        });

        const updates = response.data.result;

        if (updates.length > 0) {
          console.log(`📨 Received ${updates.length} update(s)`);

          for (const update of updates) {
            await this.processUpdate(update);
            this.offset = update.update_id + 1;
          }
        }
      } catch (error) {
        console.error('❌ Polling error:', error.message);
        const delay = error.response?.status === 401 ? 30000 : 5000;
        if (error.response?.status === 401) {
          console.error('❌ Invalid bot token (401). Check TELEGRAM_BOT_TOKEN in .env');
        }
        await this.sleep(delay);
      }
    }
  }

  /**
   * Process a single update
   */
  async processUpdate(update) {
    try {
      // Simulate webhook request format
      const req = {
        body: {
          message: update.message
        }
      };

      const res = {
        status: (code) => ({
          send: (msg) => console.log(`Response: ${code} - ${msg}`)
        })
      };

      await telegramController.handleIncomingMessage(req, res);
    } catch (error) {
      console.error('❌ Error processing update:', error.message);
    }
  }

  /**
   * Sleep helper
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = new TelegramPolling();
