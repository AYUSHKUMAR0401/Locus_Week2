# 🤖 Telegram Bot Setup Guide

## ⚡ Get Your Bot Token (2 minutes)

### Step 1: Open Telegram
- Download Telegram app or use web.telegram.org
- Create account if you don't have one

### Step 2: Talk to BotFather
1. Search for `@BotFather` in Telegram
2. Start a chat
3. Send: `/newbot`
4. BotFather asks: "Alright, a new bot. How are we going to call it?"
5. Reply with your bot name: `AI Marketplace Bot`
6. BotFather asks: "Good. Now let's choose a username for your bot."
7. Reply with username (must end in 'bot'): `ai_marketplace_demo_bot`
8. **BotFather gives you a token!** Copy it!

Example token:
```
6789012345:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw
```

### Step 3: Update .env File
```env
TELEGRAM_BOT_TOKEN=6789012345:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw
TELEGRAM_BOT_USERNAME=ai_marketplace_demo_bot
```

## 🚀 Test Locally

### 1. Start Your Server
```bash
npm install
npm run seed
npm run dev
```

### 2. Test Your Bot
1. Open Telegram
2. Search for your bot: `@ai_marketplace_demo_bot`
3. Click "Start" or send `/start`
4. Bot should reply with welcome message!

### 3. Test Full Flow
1. Send: "I need a logo under ₹500"
2. Bot shows options
3. Reply: "1"
4. Bot sends payment link
5. Click link → Complete payment
6. Get confirmation on Telegram!

## 🌐 Deploy to Production

### Option 1: Railway (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Telegram bot ready"
git push origin main
```

2. **Deploy on Railway**
- Go to railway.app
- New Project → Deploy from GitHub
- Select your repo
- Add environment variables:
  ```
  MONGODB_URI=your_mongodb_uri
  GROQ_API_KEY=your_groq_api_key
  TELEGRAM_BOT_TOKEN=your_bot_token
  TELEGRAM_BOT_USERNAME=your_bot_username
  PAYMENT_MODE=demo
  NODE_ENV=production
  ```

3. **Set Webhook**
After deployment, run this command (replace with your Railway URL):
```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-app.railway.app/webhook/telegram"}'
```

Or visit this URL in browser:
```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://your-app.railway.app/webhook/telegram
```

### Option 2: Render

Same process as Railway, just use Render instead.

## ✅ Verify Webhook

Check if webhook is set:
```bash
curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo"
```

Should return:
```json
{
  "ok": true,
  "result": {
    "url": "https://your-app.railway.app/webhook/telegram",
    "has_custom_certificate": false,
    "pending_update_count": 0
  }
}
```

## 🎯 For Hackathon Submission

### GitHub Repo
Your repo is ready! Just push:
```bash
git add .
git commit -m "Complete Telegram AI Marketplace"
git push origin main
```

### Deployed Link
After Railway deployment:
```
https://your-app.railway.app
```

### Demo Instructions
Include in your README:
```markdown
## Try the Bot

1. Open Telegram
2. Search: @your_bot_username
3. Send: /start
4. Try: "I need a logo under ₹500"
5. Select option: "1"
6. Complete payment
7. Get confirmation!
```

### Screenshots
Take screenshots of:
1. Bot welcome message
2. AI response with options
3. Payment link message
4. Payment page
5. Confirmation message

### Screen Recording
Record:
1. Opening bot
2. Sending message
3. Getting AI response
4. Selecting option
5. Completing payment
6. Receiving confirmation

## 🎬 Demo Script for Video

**[Open Telegram]**

"Hi, I'm demonstrating my AI-powered marketplace on Telegram. Watch how easy it is..."

**[Type]** "I need a logo under ₹500"

**[Bot responds in 2 seconds]**

"The AI understood my budget and found matching services. Let me select option 1..."

**[Type]** "1"

**[Bot sends payment link]**

"Now I get a payment link. Let me complete the payment..."

**[Click link, complete payment]**

"And instantly, I get confirmation on Telegram! From discovery to payment to confirmation - all in under 60 seconds."

## 🏆 Why This Wins

1. **Real Integration** - Not a simulation
2. **Judges Can Test** - They can message your bot
3. **Fully Deployed** - Live on Railway/Render
4. **Complete Flow** - End-to-end working
5. **AI-Powered** - Real Groq integration
6. **Professional** - Production-ready code

## 📊 What Judges Will See

1. **GitHub Repo** - Clean, documented code
2. **Deployed Link** - Working application
3. **Live Bot** - They can test it themselves
4. **Demo Video** - Complete flow demonstration
5. **Screenshots** - Professional presentation

## 🎯 Talking Points

- "Built on Telegram for easy demo, but architecture supports Telegram"
- "Using Groq AI for fast, accurate intent parsing"
- "Complete payment flow with demo mode"
- "Fully deployed and testable"
- "Production-ready code structure"

## 🚀 You're Ready!

Your bot is:
- ✅ Free forever
- ✅ Easy to test
- ✅ Fully functional
- ✅ Deployable
- ✅ Professional

**Go win that hackathon!** 🏆
