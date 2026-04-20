# ⚡ Quick Start Guide

Get your WhatsApp AI Marketplace running in 10 minutes!

## 🎯 Prerequisites

- Node.js 16+ installed
- MongoDB installed (or use MongoDB Atlas)
- Twilio account (free trial)

## 🚀 Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup MongoDB

**Option A: Local MongoDB (Easiest)**
```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Option B: MongoDB Atlas (Cloud)**
- Go to https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string
- Update `.env` file

### 3. Configure Environment Variables

Your `.env` file is already created with Groq API key! Just add Twilio credentials:

```bash
# Edit .env file
nano .env
```

**Update these lines:**
```env
# Get these from https://console.twilio.com
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

### 4. Get Twilio Credentials

1. Go to https://www.twilio.com/try-twilio
2. Sign up (free trial)
3. Get Account SID and Auth Token from dashboard
4. Go to Messaging → Try WhatsApp
5. Join sandbox by texting the code to their WhatsApp number
6. Copy credentials to `.env`

### 5. Seed Database

```bash
npm run seed
```

You should see:
```
✅ Connected to MongoDB
🗑️  Cleared existing sellers
✅ Added 10 sample sellers
```

### 6. Start Server

```bash
npm run dev
```

You should see:
```
🚀 Server running on port 3000
📱 WhatsApp webhook: http://localhost:3000/webhook/whatsapp
💳 Payment webhook: http://localhost:3000/webhook/payment
✅ MongoDB connected successfully
```

### 7. Setup ngrok (For WhatsApp Webhooks)

**Install ngrok:**
```bash
brew install ngrok
# or download from https://ngrok.com
```

**Start ngrok (in new terminal):**
```bash
ngrok http 3000
```

**Copy the HTTPS URL** (e.g., `https://abc123.ngrok.io`)

### 8. Configure Twilio Webhook

1. Go to Twilio Console
2. Navigate to: Messaging → Settings → WhatsApp Sandbox Settings
3. Set "When a message comes in" to:
   ```
   https://your-ngrok-url.ngrok.io/webhook/whatsapp
   ```
4. Set method to **POST**
5. Save

### 9. Test on WhatsApp!

1. Open WhatsApp
2. Send message to your Twilio WhatsApp number
3. Type: **"I need a logo under ₹500"**
4. Wait for bot response (2-3 seconds)
5. Reply with: **"1"**
6. Click the payment link
7. Click "Pay" button
8. Get confirmation on WhatsApp!

## 🎉 You're Done!

Your WhatsApp AI Marketplace is now running!

## 🧪 Test Commands

### Check if MongoDB is running
```bash
mongosh whatsapp-marketplace
db.sellers.find().pretty()
```

### Check if server is running
```bash
curl http://localhost:3000
```

### Check if ngrok is working
```bash
curl https://your-ngrok-url.ngrok.io
```

### Manually complete a payment
```bash
curl -X POST http://localhost:3000/demo-payment/complete \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORD1234567890",
    "amount": 499,
    "status": "success",
    "transactionId": "TXN123"
  }'
```

## 🐛 Common Issues

### "MongoDB connection failed"
```bash
# Check if MongoDB is running
brew services list

# Start MongoDB
brew services start mongodb-community
```

### "Twilio webhook not working"
- Make sure ngrok is running
- Verify webhook URL in Twilio console matches ngrok URL
- Check you joined the Twilio sandbox

### "Bot not responding"
- Check server logs for errors
- Verify Twilio credentials in .env
- Make sure you joined the sandbox

### "Payment page not loading"
- Check server is running on port 3000
- Verify the payment link format
- Check browser console for errors

## 📚 Next Steps

1. **Read DEMO_INSTRUCTIONS.md** - Learn how to demo this
2. **Read HACKATHON_PITCH.md** - Prepare your pitch
3. **Practice the demo** - Run through it 3-5 times
4. **Deploy to production** - Use Railway or Render

## 🎯 Quick Demo Flow

1. **Send:** "I need a logo under ₹500"
2. **Bot:** Shows 2-3 options
3. **Send:** "1"
4. **Bot:** Sends payment link
5. **Click:** Payment link
6. **Click:** "Pay" button
7. **Receive:** WhatsApp confirmation

**Total time:** Under 60 seconds! ⚡

## 💡 Pro Tips

- Keep ngrok running during demo
- Have WhatsApp open on phone
- Have browser ready for payment page
- Test the full flow before presenting
- Be ready to explain the demo payment system

## 🆘 Need Help?

Check these files:
- `API_SETUP_GUIDE.md` - Detailed API setup
- `DEMO_INSTRUCTIONS.md` - Demo workflow
- `DEPLOYMENT.md` - Production deployment
- `HACKATHON_PITCH.md` - Pitch script

## 🎬 Ready to Demo?

Your project has:
- ✅ Groq AI integration (fast & free)
- ✅ Beautiful demo payment page
- ✅ Complete WhatsApp flow
- ✅ 10 sample sellers
- ✅ Professional UI
- ✅ Auto confirmations

**Go win that hackathon!** 🚀
