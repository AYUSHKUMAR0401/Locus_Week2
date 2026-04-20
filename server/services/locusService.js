class LocusService {
  constructor() {
    this.paymentMode = process.env.PAYMENT_MODE || 'demo';
    this.demoPaymentUrl = process.env.DEMO_PAYMENT_URL || 'http://localhost:3000/demo-payment';
  }

  /**
   * Create a demo payment link for hackathon demonstration
   * This simulates the Locus payment flow without real payment processing
   */
  async createPaymentLink(orderData) {
    try {
      console.log('💳 Creating demo payment link for order:', orderData.orderId);

      // Generate a demo payment link
      const paymentLink = `${this.demoPaymentUrl}?orderId=${orderData.orderId}&amount=${orderData.amount}&service=${encodeURIComponent(orderData.service)}`;
      
      // Generate a mock transaction ID
      const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      console.log('✅ Demo payment link created:', paymentLink);

      return {
        paymentLink,
        transactionId,
        isDemoMode: true
      };
    } catch (error) {
      console.error('❌ Demo payment link creation error:', error.message);
      throw new Error('Failed to create payment link');
    }
  }

  /**
   * Verify payment status (demo mode always returns success after manual trigger)
   */
  async verifyPayment(transactionId) {
    try {
      console.log('🔍 Verifying demo payment:', transactionId);

      return {
        status: 'success',
        transactionId,
        paidAt: new Date(),
        isDemoMode: true
      };
    } catch (error) {
      console.error('❌ Demo payment verification error:', error.message);
      throw new Error('Failed to verify payment');
    }
  }

  /**
   * Generate mock payment link for display
   */
  generateMockPaymentLink(orderId, amount) {
    return `${this.demoPaymentUrl}?orderId=${orderId}&amount=${amount}`;
  }
}

module.exports = new LocusService();
