# 🤖 AI Business Marketplace (Telegram Bot)

> **A Telegram-based AI assistant that connects customers with businesses and completes transactions with integrated payments.**

[![Live Bot](https://img.shields.io/badge/Try-Live%20Bot-blue?style=for-the-badge&logo=telegram)](https://t.me/whatsapp_locus_bot)
[![Demo](https://img.shields.io/badge/View-Demo-green?style=for-the-badge)](http://localhost:3000)

Built for hackathon with Telegram for easy deployment and testing. Architecture supports WhatsApp Business API - just swap the messaging service!

---

## 🎯 Problem Statement

Small businesses and freelancers struggle to:
- Reach customers easily
- Handle payments smoothly
- Manage conversations and orders

## 💡 Solution

An AI-powered Telegram marketplace where:
- Customers discover services via chat
- AI recommends best options using Groq
- Payments are handled seamlessly
- Orders are completed automatically

---

## ✨ Features

- 🤖 **AI-Powered Matching** - Natural language understanding using Groq's Llama 3.1 70B
- ⚡ **Lightning Fast** - From discovery to payment in under 60 seconds
- 💳 **Integrated Payments** - Demo payment system with beautiful UI
- 📊 **Admin Dashboard** - Real-time monitoring of orders, users, and revenue
- 🎨 **Beautiful UI** - Professional landing page and payment interface
- 🧪 **Fully Tested** - Comprehensive test suite included

---

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Seed database with sample sellers
npm run seed

# Start server
npm run dev
```

### Test the Bot

1. Open Telegram: https://t.me/whatsapp_locus_bot
2. Send: `/start`
3. Try: "I need a logo under ₹500"
4. Select option: "1"
5. Complete payment
6. Get instant confirmation!

### Test the UI

- **Landing Page:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3000/admin
- **Payment Demo:** http://localhost:3000/demo-payment?orderId=TEST&amount=499&service=Test

---

## 🧪 Run Tests

```bash
# Automated test suite
npm test

# Or manually
chmod +x test-all.sh
./test-all.sh
```

---

## ⚙️ Tech Stack

- **Messaging**: Telegram Bot API (FREE)
- **Backend**: Node.js + Express
- **AI**: Groq (Llama 3.1 70B)
- **Database**: MongoDB Atlas
- **Payments**: Demo Payment System
- **Frontend**: Vanilla JS + Modern CSS

---

## 🏆 Why This Wins

1. **Real Integration** - Actual Telegram bot, not simulation
2. **Judges Can Test** - They can message the bot themselves
3. **AI-Powered** - Real Groq/Llama integration
4. **Complete Flow** - End-to-end transaction
5. **Professional UI** - Beautiful landing page and payment interface
6. **Fully Tested** - Comprehensive test suite
7. **$0 Cost** - Everything is free
8. **Scalable** - Easy to add WhatsApp later

---

## 📚 Documentation

- **TELEGRAM_SETUP.md** - Complete Telegram bot setup
- **TEST_EVERYTHING.md** - Comprehensive testing guide
- **RUN_TESTS.md** - How to run automated tests
- **DEPLOYMENT.md** - Production deployment guide
- **HACKATHON_PITCH.md** - Pitch script for presentation

---

## 🌐 Deploy to Railway

1. Push to GitHub
2. Connect to Railway
3. Add environment variables
4. Set Telegram webhook
5. Done!

See **DEPLOYMENT.md** for detailed instructions.

---

## 💰 Total Cost: $0

- ✅ Telegram Bot: FREE
- ✅ MongoDB Atlas: FREE
- ✅ Groq AI: FREE
- ✅ Railway: FREE

---

## 📄 License

MIT

---

**🚀 Try the bot:** https://t.me/whatsapp_locus_bot

**Built with ❤️ for hackathon**
