# 🤖 Test Your Bot - Quick Guide

## ✅ Your Bot is Ready!

**Bot Name:** Telegram_locus_bot  
**Bot Link:** https://t.me/Telegram_locus_bot  
**Status:** ✅ Configured and ready to test!

---

## 🚀 Test Locally (Right Now!)

### Step 1: Install & Start

```bash
# Install dependencies
npm install

# Seed database with sample sellers
npm run seed

# Start server
npm run dev
```

You should see:
```
🚀 Server running on port 3000
📱 Telegram webhook: http://localhost:3000/webhook/telegram
💳 Payment webhook: http://localhost:3000/webhook/payment
🎬 Demo payment: http://localhost:3000/demo-payment
✅ MongoDB connected successfully
```

### Step 2: Test on Telegram

1. **Open Telegram** (app or web.telegram.org)
2. **Search for:** `@Telegram_locus_bot`
3. **Click "Start"** or send `/start`

You should get:
```
👋 Welcome to AI Marketplace!

I'm your AI assistant. I can help you find:
• Logo Design
• Website Development
• App Development
• Content Writing
• Marketing Services
• And more!

Just tell me what you need and your budget. For example:
"I need a logo under ₹500"

What can I help you with today?
```

### Step 3: Test Full Flow

**Send:** `I need a logo under ₹500`

**Bot responds with options:**
```
Great! I found 3 options for you:

1. Creative Designs Studio
   Professional Logo Design
   💰 ₹499
   ⭐ 4.8/5 (127 orders)
   ⏱️ 2 days
   📝 Modern, minimalist logo with 3 revisions

2. Quick Logo Co
   Budget Logo Design
   💰 ₹299
   ⭐ 4.5/5 (89 orders)
   ⏱️ 1 day
   📝 Fast and affordable logo design

Reply with the number (1-2) to proceed with payment! 💳
```

**Send:** `1`

**Bot sends payment link:**
```
🎉 Great choice!

Order Summary:
Service: Professional Logo Design
Amount: ₹499

💳 Complete your payment here:
http://localhost:3000/demo-payment?orderId=ORD...

Once paid, your order will be confirmed instantly! ⚡
```

**Click the link** → Beautiful payment page opens

**Click "Pay ₹499"** → Processing animation → Success!

**Bot sends confirmation:**
```
✅ Payment Successful!

Order ID: ORD1234567890
Service: Professional Logo Design
Seller: Creative Designs Studio
Amount: ₹499

🎉 Your order is confirmed! The seller will contact you shortly.

Thank you for using our marketplace! 🙏
```

---

## 🐛 Troubleshooting

### Bot doesn't respond?

**Check 1: Is server running?**
```bash
# Should show "Server running on port 3000"
npm run dev
```

**Check 2: Is MongoDB connected?**
```bash
# Should show "MongoDB connected successfully"
# If not, check your internet connection
```

**Check 3: Did you seed the database?**
```bash
npm run seed
```

**Check 4: Check server logs**
Look for errors in the terminal where you ran `npm run dev`

### Payment page doesn't load?

**Check:** Make sure server is running on port 3000
```bash
curl http://localhost:3000
```

### Bot responds but no sellers found?

**Solution:** Seed the database
```bash
npm run seed
```

---

## 🌐 Deploy to Railway (Production)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Telegram AI Marketplace ready for deployment"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### Step 2: Deploy on Railway

1. Go to **https://railway.app**
2. Sign up with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your repository
6. Railway will auto-detect Node.js

### Step 3: Add Environment Variables

In Railway dashboard, go to **Variables** tab and add:

```
MONGODB_URI=your_mongodb_uri

TELEGRAM_BOT_TOKEN=your_telegram_bot_token

TELEGRAM_BOT_USERNAME=your_bot_username

GROQ_API_KEY=your_groq_api_key

PAYMENT_MODE=demo

NODE_ENV=production

PORT=3000
```

### Step 4: Wait for Deployment

Railway will:
- Install dependencies
- Build your app
- Deploy it
- Give you a URL like: `https://your-app.railway.app`

### Step 5: Set Telegram Webhook

After deployment, visit this URL in your browser (replace with your Railway URL and bot token):

```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://your-app.railway.app/webhook/telegram
```

You should see:
```json
{"ok":true,"result":true,"description":"Webhook was set"}
```

### Step 6: Update .env for Production

In Railway, update these variables:
```
DEMO_PAYMENT_URL=https://your-app.railway.app/demo-payment
APP_URL=https://your-app.railway.app
```

### Step 7: Test Production Bot

1. Open Telegram
2. Search: `@Telegram_locus_bot`
3. Send: "I need a logo under ₹500"
4. Bot should respond!

---

## 🎯 For Hackathon Submission

### ✅ GitHub Repository
```
https://github.com/yourusername/telegram-ai-marketplace
```

### ✅ Deployed Link
```
https://your-app.railway.app
```

### ✅ Live Bot Demo
```
https://t.me/Telegram_locus_bot
```

### ✅ Demo Instructions

Add this to your README:

```markdown
## 🤖 Try the Live Bot

1. Open Telegram: https://t.me/Telegram_locus_bot
2. Send: `/start`
3. Try: "I need a logo under ₹500"
4. Select option: "1"
5. Complete payment
6. Get instant confirmation!
```

---

## 📸 Screenshots to Take

1. **Welcome Message** - Bot greeting
2. **AI Response** - Options with prices
3. **Payment Link** - Message with link
4. **Payment Page** - Beautiful payment UI
5. **Success Page** - Payment confirmation
6. **Telegram Confirmation** - Final message

---

## 🎥 Screen Recording Script

**[Open Telegram]**

"Hi, I'm demonstrating my AI-powered marketplace bot on Telegram."

**[Show bot]** `@Telegram_locus_bot`

**[Send]** "I need a logo under ₹500"

**[Wait 2 seconds]**

"The AI understood my budget and found matching services using Groq's Llama model."

**[Send]** "1"

"Now I get a payment link..."

**[Click link]**

"Here's our payment interface. In production, this would integrate with real payment gateways."

**[Click Pay]**

"And instantly, I get confirmation on Telegram!"

**[Show confirmation message]**

"From discovery to payment to confirmation - all in under 60 seconds. The system uses MongoDB Atlas for data, Groq AI for natural language understanding, and Telegram for messaging."

---

## 🏆 What Makes This Win

1. **Real Integration** - Actual Telegram bot, not simulation
2. **Judges Can Test** - They can message your bot themselves
3. **AI-Powered** - Real Groq/Llama integration
4. **Complete Flow** - End-to-end transaction
5. **Fully Deployed** - Live on Railway
6. **Professional Code** - Clean architecture
7. **$0 Cost** - Everything is free
8. **Scalable** - Easy to add Telegram later

---

## 🎯 Talking Points

- "Built on Telegram for easy deployment and testing"
- "Architecture supports Telegram - just swap the messaging service"
- "Using Groq's Llama 3.1 70B for fast, accurate AI"
- "MongoDB Atlas for scalable data storage"
- "Complete payment flow with demo mode"
- "Judges can test it themselves right now"

---

## ✅ Pre-Submission Checklist

- [ ] Bot responds to `/start`
- [ ] AI parses user requests correctly
- [ ] Shows seller options with prices
- [ ] Payment link works
- [ ] Payment page loads
- [ ] Confirmation message sent
- [ ] Deployed to Railway
- [ ] Webhook set correctly
- [ ] GitHub repo pushed
- [ ] README updated
- [ ] Screenshots taken
- [ ] Video recorded

---

## 🚀 You're Ready!

Your bot is:
- ✅ Fully configured
- ✅ Connected to MongoDB
- ✅ Using Groq AI
- ✅ Ready to test
- ✅ Ready to deploy
- ✅ Ready to win!

**Test it now:** https://t.me/Telegram_locus_bot

**Go win that hackathon!** 🏆
