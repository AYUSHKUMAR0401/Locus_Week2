# 🔑 Complete API Setup Guide

Get all your API keys in 30 minutes! Follow this step-by-step guide.

---

## 1️⃣ MongoDB (Database) - FREE

### Option A: Local MongoDB (Easiest for Development)

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Your connection string:**
```
mongodb://localhost:27017/whatsapp-marketplace
```

### Option B: MongoDB Atlas (Best for Production)

1. **Go to:** https://www.mongodb.com/cloud/atlas/register
2. **Sign up** with Google/Email (FREE)
3. **Create a cluster:**
   - Click "Build a Database"
   - Choose "FREE" (M0 Sandbox)
   - Select region closest to you (e.g., Mumbai for India)
   - Click "Create"
4. **Create database user:**
   - Username: `admin`
   - Password: Generate a strong password (save it!)
   - Click "Create User"
5. **Whitelist IP:**
   - Click "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
6. **Get connection string:**
   - Click "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password
   - Replace `myFirstDatabase` with `whatsapp-marketplace`

**Your connection string will look like:**
```
mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/whatsapp-marketplace?retryWrites=true&w=majority
```

✅ **Done! Save this in your .env file**

---

## 2️⃣ Twilio (WhatsApp API) - FREE TRIAL

### Step-by-Step:

1. **Go to:** https://www.twilio.com/try-twilio
2. **Sign up:**
   - Enter email, password
   - Verify email
   - Verify phone number (they'll send SMS code)
3. **Skip the questionnaire** (or fill it quickly)
4. **Get your credentials:**
   - You'll see your dashboard
   - Find **Account SID** (starts with AC...)
   - Find **Auth Token** (click to reveal)
   - **SAVE THESE!**

5. **Enable WhatsApp Sandbox:**
   - Left sidebar → "Messaging" → "Try it out" → "Send a WhatsApp message"
   - You'll see a WhatsApp number (usually `+1 415 523 8886`)
   - You'll see a code like "join abc-def"
   
6. **Join the sandbox:**
   - Open WhatsApp on your phone
   - Send message to `+1 415 523 8886`
   - Type: `join abc-def` (use YOUR code from Twilio)
   - You'll get confirmation message

7. **Get your WhatsApp number:**
   - It's shown on the same page
   - Format: `whatsapp:+14155238886`

### Your Twilio credentials:
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_32_character_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

### ⚠️ Important Notes:
- **Sandbox limitations:** 
  - Only people who join your sandbox can message
  - Messages expire after 24 hours of inactivity
  - Good for development/demo!
- **For production:** You need to apply for WhatsApp Business API (takes 1-2 weeks)

✅ **Done! Save these in your .env file**

---

## 3️⃣ OpenAI (AI Engine) - PAID ($5 minimum)

### Step-by-Step:

1. **Go to:** https://platform.openai.com/signup
2. **Sign up:**
   - Use Google/Microsoft/Email
   - Verify email
3. **Add payment method:**
   - Click your profile (top right)
   - Go to "Billing"
   - Click "Add payment method"
   - Add credit/debit card
   - Add at least $5 credit (₹400)
4. **Create API key:**
   - Go to: https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Give it a name: "WhatsApp Marketplace"
   - Click "Create secret key"
   - **COPY IT NOW** (you won't see it again!)

### Your OpenAI credential:
```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 💰 Cost Estimate:
- GPT-3.5-turbo: $0.0015 per 1K tokens
- Average message: ~200 tokens = $0.0003 (₹0.025)
- 1000 messages = $0.30 (₹25)
- **Your $5 will last for ~16,000 messages!**

### 🆓 Alternative (FREE but less accurate):
If you don't want to pay, you can use **Google Gemini** (free):

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key

Then modify `server/services/aiService.js` to use Gemini instead.

✅ **Done! Save this in your .env file**

---

## 4️⃣ Locus (Payment Gateway) - CONTACT REQUIRED

### The Challenge:
Locus doesn't have public signup. You need to contact them.

### Option A: Contact Locus (For Real Integration)

1. **Go to:** https://www.locus.sh/
2. **Find contact:** Look for "Contact Sales" or "Get Started"
3. **Email them:** 
   - Subject: "API Access for Hackathon Project"
   - Body: "Hi, I'm building a WhatsApp marketplace for a hackathon and would like to integrate Locus payments. Can I get sandbox API access?"
4. **Wait for response** (might take 1-2 days)

### Option B: Use Mock Payment (For Demo/Hackathon)

**Good news!** I've already built a mock payment system for you.

**How it works:**
- Instead of real Locus API, it generates a mock payment link
- You can manually trigger payment completion
- Perfect for hackathon demo!

**To use mock payments:**

1. In your `.env` file:
```env
LOCUS_API_KEY=mock_key_for_demo
LOCUS_API_SECRET=mock_secret_for_demo
LOCUS_WEBHOOK_URL=http://localhost:3000/webhook/payment
APP_URL=http://localhost:3000
```

2. When you get a payment link in WhatsApp, note the Order ID

3. Complete payment manually:
```bash
curl -X POST http://localhost:3000/webhook/payment/mock/ORD1234567890
```
Replace `ORD1234567890` with your actual order ID.

### Option C: Use Razorpay (Alternative - FREE to start)

If Locus doesn't respond, use Razorpay instead:

1. **Go to:** https://razorpay.com/
2. **Sign up** (Indian phone number required)
3. **Get test keys:**
   - Dashboard → Settings → API Keys
   - Click "Generate Test Key"
   - Copy Key ID and Key Secret

Then I can help you modify the code to use Razorpay instead of Locus.

✅ **For hackathon: Use mock payments (Option B)**

---

## 5️⃣ ngrok (For Local Development) - FREE

### What is ngrok?
Makes your localhost accessible from the internet (needed for webhooks).

### Step-by-Step:

1. **Go to:** https://ngrok.com/
2. **Sign up** (free account)
3. **Download ngrok:**
   - macOS: `brew install ngrok`
   - Or download from: https://ngrok.com/download
4. **Get auth token:**
   - Dashboard → "Your Authtoken"
   - Copy the token
5. **Setup ngrok:**
```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

6. **Start ngrok:**
```bash
ngrok http 3000
```

7. **Copy the HTTPS URL:**
   - You'll see something like: `https://abc123.ngrok.io`
   - This is your public URL!

### Your ngrok URLs:
```env
APP_URL=https://abc123.ngrok.io
LOCUS_WEBHOOK_URL=https://abc123.ngrok.io/webhook/payment
```

⚠️ **Note:** Free ngrok URLs change every time you restart. For hackathon demo, keep it running!

✅ **Done! Save this in your .env file**

---

## 📝 Complete .env File Template

Here's what your final `.env` should look like:

```env
# Server
PORT=3000
NODE_ENV=development

# MongoDB
# Option 1: Local
MONGODB_URI=mongodb://localhost:27017/whatsapp-marketplace

# Option 2: MongoDB Atlas
# MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/whatsapp-marketplace

# Twilio WhatsApp
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_32_character_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# OpenAI
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Locus Payments (Mock for demo)
LOCUS_API_KEY=mock_key_for_demo
LOCUS_API_SECRET=mock_secret_for_demo
LOCUS_WEBHOOK_URL=https://abc123.ngrok.io/webhook/payment

# App URL (from ngrok)
APP_URL=https://abc123.ngrok.io
```

---

## ✅ Verification Checklist

Test each API:

### 1. MongoDB
```bash
# If local:
mongosh whatsapp-marketplace

# If Atlas:
# Just check if connection string works when you start the app
```

### 2. Twilio
```bash
# Send test message
curl -X POST https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json \
  --data-urlencode "Body=Test" \
  --data-urlencode "From=whatsapp:+14155238886" \
  --data-urlencode "To=whatsapp:+YOUR_PHONE" \
  -u YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN
```

### 3. OpenAI
```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_OPENAI_API_KEY"
```

### 4. ngrok
```bash
# Start ngrok
ngrok http 3000

# In another terminal, test:
curl https://your-ngrok-url.ngrok.io
```

---

## 💰 Total Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| MongoDB Atlas | FREE | M0 tier (512MB) |
| Twilio | FREE | Trial credit $15 |
| OpenAI | $5 | ~16,000 messages |
| Locus | FREE | Mock for demo |
| ngrok | FREE | Basic tier |
| **TOTAL** | **$5** | **₹400 only!** |

---

## 🚀 Quick Start After Getting APIs

1. **Copy .env.example to .env:**
```bash
cp .env.example .env
```

2. **Edit .env with your API keys:**
```bash
nano .env
# Or use any text editor
```

3. **Install dependencies:**
```bash
npm install
```

4. **Start MongoDB** (if local):
```bash
brew services start mongodb-community
```

5. **Start ngrok** (in separate terminal):
```bash
ngrok http 3000
```

6. **Update .env with ngrok URL**

7. **Seed database:**
```bash
npm run seed
```

8. **Start server:**
```bash
npm run dev
```

9. **Configure Twilio webhook:**
   - Go to Twilio Console
   - Messaging → Settings → WhatsApp Sandbox Settings
   - Set webhook to: `https://your-ngrok-url.ngrok.io/webhook/whatsapp`

10. **Test on WhatsApp!**
    - Send message to your Twilio WhatsApp number
    - Type: "I need a logo under ₹500"

---

## 🆘 Troubleshooting

### "MongoDB connection failed"
- Check if MongoDB is running: `brew services list`
- Verify connection string in .env
- If using Atlas, check IP whitelist

### "Twilio webhook not working"
- Verify ngrok is running
- Check webhook URL in Twilio console
- Make sure you joined the sandbox

### "OpenAI API error"
- Verify API key is correct
- Check you have credits: https://platform.openai.com/usage
- Try regenerating the API key

### "ngrok URL not working"
- Restart ngrok
- Update .env with new URL
- Update Twilio webhook with new URL

---

## 🎯 Priority for Hackathon

**Must Have (Do First):**
1. ✅ MongoDB (local is fine)
2. ✅ Twilio WhatsApp
3. ✅ OpenAI
4. ✅ ngrok

**Can Skip (Use Mock):**
5. ⚠️ Locus (use mock payment)

**For Demo:**
- Use mock payment completion
- Show the full flow
- Explain you'd integrate real Locus in production

---

## 📞 Need Help?

**Twilio Support:** https://www.twilio.com/help/contact  
**OpenAI Support:** https://help.openai.com/  
**MongoDB Support:** https://www.mongodb.com/community/forums  

---

**You're ready to build! 🚀**

Total setup time: ~30 minutes  
Total cost: $5 (₹400)  
Total awesomeness: 💯
