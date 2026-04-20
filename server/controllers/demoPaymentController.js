const Order = require('../models/Order');
const Seller = require('../models/Seller');
const User = require('../models/User');
const telegramService = require('../services/telegramService');

class DemoPaymentController {
  /**
   * Render a simple payment page for demo
   */
  async showPaymentPage(req, res) {
    try {
      const { orderId, amount, service } = req.query;

      if (!orderId || !amount) {
        return res.status(400).send('Missing payment details');
      }

      // Check if order exists
      const order = await Order.findOne({ orderId });
      if (!order) {
        return res.status(404).send('Order not found');
      }

      // Render a simple HTML payment page
      const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo Payment - WhatsApp Marketplace</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 400px;
            width: 100%;
            padding: 40px 30px;
            text-align: center;
        }
        .logo {
            font-size: 64px;
            margin-bottom: 20px;
            animation: bounce 2s infinite;
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        h1 {
            color: #333;
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 700;
        }
        .demo-badge {
            background: #ffd700;
            color: #333;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            display: inline-block;
            margin-bottom: 30px;
        }
        .order-details {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 30px;
            text-align: left;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e0e0e0;
        }
        .detail-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        .detail-label {
            color: #666;
            font-size: 14px;
        }
        .detail-value {
            color: #333;
            font-weight: 600;
            font-size: 14px;
        }
        .amount {
            font-size: 32px;
            color: #667eea;
            font-weight: bold;
            margin: 20px 0;
        }
        .pay-button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 16px 40px;
            border-radius: 30px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            transition: transform 0.2s, box-shadow 0.2s;
            margin-bottom: 15px;
        }
        .pay-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
        }
        .pay-button:active {
            transform: translateY(0);
        }
        .pay-button:disabled {
            background: linear-gradient(135deg, #ccc 0%, #999 100%);
            cursor: not-allowed;
            transform: none;
        }
        .pay-button .icon {
            display: inline-block;
            margin-right: 8px;
        }
        .info {
            color: #666;
            font-size: 12px;
            margin-top: 20px;
            line-height: 1.6;
        }
        .success {
            display: none;
        }
        .success.show {
            display: block;
        }
        .success-icon {
            font-size: 64px;
            margin-bottom: 20px;
        }
        .spinner {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #667eea;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
            display: inline-block;
            margin-right: 10px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <div id="payment-form">
            <div class="logo">💳</div>
            <h1>Complete Payment</h1>
            <span class="demo-badge">🎬 DEMO MODE</span>
            
            <div class="order-details">
                <div class="detail-row">
                    <span class="detail-label">Order ID</span>
                    <span class="detail-value">${orderId}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Service</span>
                    <span class="detail-value">${service || 'Service'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Amount</span>
                    <span class="detail-value amount">₹${amount}</span>
                </div>
            </div>

            <button class="pay-button" onclick="processPayment()">
                <span class="icon">💳</span> Pay ₹${amount}
            </button>

            <div class="info">
                🎯 This is a demo payment page for hackathon demonstration.<br>
                Click "Pay" to simulate successful payment.<br>
                You'll receive confirmation on WhatsApp!
            </div>
        </div>

        <div id="success-message" class="success">
            <div class="success-icon">✅</div>
            <h1>Payment Successful!</h1>
            <div class="order-details">
                <div class="detail-row">
                    <span class="detail-label">Order ID</span>
                    <span class="detail-value">${orderId}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Amount Paid</span>
                    <span class="detail-value">₹${amount}</span>
                </div>
            </div>
            <div class="info">
                ✅ Payment processed successfully!<br>
                Check your WhatsApp for order confirmation.<br>
                You can close this page now.
            </div>
        </div>
    </div>

    <script>
        async function processPayment() {
            const button = document.querySelector('.pay-button');
            button.disabled = true;
            button.innerHTML = '<span class="spinner"></span>Processing...';

            try {
                // Simulate payment processing
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Call webhook to complete payment
                const response = await fetch('/webhook/payment/complete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        orderId: '${orderId}',
                        amount: ${amount},
                        status: 'success',
                        transactionId: 'TXN' + Date.now()
                    })
                });

                if (response.ok) {
                    // Show success message
                    document.getElementById('payment-form').style.display = 'none';
                    document.getElementById('success-message').classList.add('show');
                } else {
                    throw new Error('Payment failed');
                }
            } catch (error) {
                alert('Payment failed. Please try again.');
                button.disabled = false;
                button.innerHTML = 'Pay ₹${amount}';
            }
        }
    </script>
</body>
</html>
      `;

      res.send(html);
    } catch (error) {
      console.error('❌ Demo payment page error:', error);
      res.status(500).send('Error loading payment page');
    }
  }

  /**
   * Complete demo payment (called from payment page)
   */
  async completePayment(req, res) {
    try {
      const { orderId, amount, status, transactionId } = req.body;

      console.log('💳 Demo payment completion:', { orderId, amount, status });

      if (status !== 'success') {
        return res.status(400).json({ error: 'Payment not successful' });
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
      order.paymentDetails.locusTransactionId = transactionId;
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

      console.log('✅ Demo payment processed successfully:', orderId);
      res.status(200).json({ 
        success: true,
        message: 'Payment completed successfully',
        orderId 
      });

    } catch (error) {
      console.error('❌ Demo payment completion error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new DemoPaymentController();
