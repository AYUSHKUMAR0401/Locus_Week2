# 🛠️ Complete Setup Guide

This guide will walk you through setting up the WhatsApp AI Marketplace from scratch.

## 📋 Prerequisites Checklist

- [ ] Node.js 16+ installed
- [ ] MongoDB installed (or MongoDB Atlas account)
- [ ] Twilio account with WhatsApp enabled
- [ ] OpenAI API key
- [ ] Locus API credentials
- [ ] ngrok (for local development)

## 🚀 Step-by-Step Setup

### 1. Install Node.js and MongoDB

**macOS:**
```bash
# Install Node.js
brew install node

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

### 2. Clone and Install Project

```bash
# Navigate to project directory
cd whatsapp-ai-marketplace

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

### 3. Get Twilio WhatsApp Credentials

1. Go to [Twilio Console](https://console.twilio.com/)
2. Create a new account (free trial available)
3. Navigate to **Messaging** → **Try it out** → **Send a WhatsApp message**
4. Follow the setup wizard
5. Get your credentials:
   - Account SID
   - Auth Token
   - WhatsApp number (usually `whatsapp:+14155238886` for sandbox)

6. Join the sandbox:
   - Send the code shown in Twilio console to the WhatsApp number
   - Example: Send "join <your-code>" to +1 415 523 8886

### 4. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to **API Keys**
4. Click **Create new secret key**
5. Copy the key (you won't see it again!)

### 5. Get Locus API Credentials

1. Go to [Locus Website](https://locus.sh/) (or their developer portal)
2. Sign up for an account
3. Navigate to API settings
4. Get your:
   - API Key
   - API Secret
5. Note the webhook URL format they require

### 6. Configure Environment Variables

Edit `.env` file:

```env
# Server
PORT=3000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/whatsapp-marketplace

# Twilio WhatsApp
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# OpenAI
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Locus Payments
LOCUS_API_KEY=your_locus_api_key
LOCUS_API_SECRET=your_locus_secret
LOCUS_WEBHOOK_URL=https://your-ngrok-url.ngrok.io/webhook/payment

# App URL
APP_URL=https://your-ngrok-url.ngrok.io
```

### 7. Setup ngrok for Local Development

```bash
# Install ngrok
brew install ngrok  # macOS
# or download from https://ngrok.com/download

# Start ngrok
ngrok http 3000
```

Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`) and update:
- `.env` file: `APP_URL` and `LOCUS_WEBHOOK_URL`
- Twilio webhook URL (next step)

### 8. Configure Twilio Webhook

1. Go to Twilio Console
2. Navigate to **Messaging** → **Settings** → **WhatsApp Sandbox Settings**
3. Set **When a message comes in** to:
   ```
   https://your-ngrok-url.ngrok.io/webhook/whatsapp
   ```
4. Set method to **POST**
5. Save

### 9. Seed Database with Sample Sellers

```bash
node server/scripts/seedSellers.js
```

You should see:
```
✅ Connected to MongoDB
🗑️  Cleared existing sellers
✅ Added 10 sample sellers

📊 Sample sellers by category:
   logo: 3
   website: 3
   app: 1
   content: 1
   marketing: 1
   design: 1
```

### 10. Start the Server

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

## 🧪 Testing the Application

### Test 1: Basic Message

1. Open WhatsApp
2. Send a message to your Twilio WhatsApp number
3. Send: "I need a logo under ₹500"
4. You should receive options from the bot

### Test 2: Selection and Payment

1. Reply with a number (e.g., "1")
2. You should receive a payment link
3. For development, use the mock payment endpoint:

```bash
curl -X POST http://localhost:3000/webhook/payment/mock/ORD1234567890
```

Replace `ORD1234567890` with the actual order ID from the bot message.

### Test 3: Check Database

```bash
# Connect to MongoDB
mongosh whatsapp-marketplace

# Check users
db.users.find().pretty()

# Check orders
db.orders.find().pretty()

# Check sellers
db.sellers.find().pretty()
```

## 🐛 Troubleshooting

### Issue: MongoDB Connection Error

**Solution:**
```bash
# Check if MongoDB is running
brew services list  # macOS
sudo systemctl status mongodb  # Linux

# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongodb  # Linux
```

### Issue: Twilio Webhook Not Receiving Messages

**Solutions:**
1. Check ngrok is running: `ngrok http 3000`
2. Verify webhook URL in Twilio console matches ngrok URL
3. Check server logs for errors
4. Ensure you joined the Twilio sandbox

### Issue: OpenAI API Error

**Solutions:**
1. Verify API key is correct in `.env`
2. Check you have credits in OpenAI account
3. Test API key:
```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Issue: Payment Link Not Working

**Solutions:**
1. In development, use mock payment endpoint
2. Check Locus API credentials
3. Verify webhook URL is accessible from internet
4. Check Locus dashboard for errors

## 📱 Production Deployment

### Deploy to Railway

1. Push code to GitHub
2. Go to [Railway](https://railway.app/)
3. Click **New Project** → **Deploy from GitHub**
4. Select your repository
5. Add environment variables in Railway dashboard
6. Deploy!

### Deploy to Render

1. Push code to GitHub
2. Go to [Render](https://render.com/)
3. Click **New** → **Web Service**
4. Connect your repository
5. Set:
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add environment variables
7. Deploy!

### Update Webhooks for Production

After deployment, update:

1. **Twilio Webhook**:
   ```
   https://your-app.railway.app/webhook/whatsapp
   ```

2. **Locus Webhook** (in Locus dashboard):
   ```
   https://your-app.railway.app/webhook/payment
   ```

3. **Environment Variables**:
   ```env
   APP_URL=https://your-app.railway.app
   LOCUS_WEBHOOK_URL=https://your-app.railway.app/webhook/payment
   NODE_ENV=production
   ```

## ✅ Final Checklist

- [ ] MongoDB connected
- [ ] Server running
- [ ] ngrok tunnel active
- [ ] Twilio webhook configured
- [ ] Sample sellers seeded
- [ ] Test message sent and received
- [ ] Payment flow tested
- [ ] All environment variables set

## 🎉 You're Ready!

Your WhatsApp AI Marketplace is now running! Test it thoroughly before the hackathon demo.

## 📞 Need Help?

Common commands:
```bash
# Check logs
npm run dev

# Restart MongoDB
brew services restart mongodb-community

# Reseed database
node server/scripts/seedSellers.js

# Test API
curl http://localhost:3000/
```

Good luck with your hackathon! 🚀
