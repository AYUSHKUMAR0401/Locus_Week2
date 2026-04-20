# 🧪 Complete Testing Guide

## 🎯 Test Everything Before Submission

This guide will help you test every component of your system.

---

## 1️⃣ Frontend Testing

### Test Landing Page

1. **Open:** http://localhost:3000
2. **Check:**
   - ✅ Page loads correctly
   - ✅ All sections visible
   - ✅ "Try Bot Now" button works
   - ✅ Stats display correctly
   - ✅ Features cards show
   - ✅ Test buttons work

### Test Admin Dashboard

1. **Open:** http://localhost:3000/admin
2. **Check:**
   - ✅ Stats load (orders, users, sellers, revenue)
   - ✅ Orders table shows data
   - ✅ Users table shows data
   - ✅ Sellers table shows data
   - ✅ Refresh buttons work
   - ✅ Auto-refresh works (wait 30 seconds)

### Test Payment Page

1. **Open:** http://localhost:3000/demo-payment?orderId=TEST123&amount=499&service=Test
2. **Check:**
   - ✅ Page loads with beautiful UI
   - ✅ Order details display correctly
   - ✅ Amount shows correctly
   - ✅ "DEMO MODE" badge visible
   - ✅ Pay button works
   - ✅ Processing animation shows
   - ✅ Success message appears

---

## 2️⃣ Backend API Testing

### Test Health Check

```bash
curl http://localhost:3000/api
```

**Expected:**
```json
{
  "status": "active",
  "message": "AI Marketplace API",
  "version": "1.0.0"
}
```

### Test Database Connection

```bash
curl http://localhost:3000/api/test/database
```

**Expected:**
```json
{
  "success": true,
  "message": "Database connection successful",
  "data": {
    "users": 0,
    "sellers": 10,
    "orders": 0,
    "status": "connected"
  }
}
```

### Test AI Service

```bash
curl -X POST http://localhost:3000/api/test/ai \
  -H "Content-Type: application/json" \
  -d '{"message": "I need a logo under ₹500"}'
```

**Expected:**
```json
{
  "success": true,
  "message": "AI service working",
  "data": {
    "input": "I need a logo under ₹500",
    "parsed": {
      "service": "logo",
      "budget": 500,
      "requirements": "..."
    }
  }
}
```

### Test Telegram Service

```bash
curl http://localhost:3000/api/test/telegram
```

**Expected:**
```json
{
  "success": true,
  "message": "Telegram service working",
  "data": {
    "botToken": "Set",
    "botUsername": "whatsapp_locus_bot",
    "webhookInfo": {...}
  }
}
```

### Test Payment System

```bash
curl http://localhost:3000/api/test/payment
```

**Expected:**
```json
{
  "success": true,
  "message": "Payment system working",
  "data": {
    "paymentMode": "demo",
    "paymentLink": "http://localhost:3000/demo-payment?...",
    "transactionId": "TXN..."
  }
}
```

---

## 3️⃣ Telegram Bot Testing

### Test Welcome Message

1. Open Telegram
2. Search: `@whatsapp_locus_bot`
3. Send: `/start`

**Expected:**
```
👋 Welcome to AI Marketplace!

I'm your AI assistant. I can help you find:
• Logo Design
• Website Development
...
```

### Test Service Discovery

1. Send: `I need a logo under ₹500`

**Expected:**
```
Great! I found 3 options for you:

1. Creative Designs Studio
   Professional Logo Design
   💰 ₹499
   ⭐ 4.8/5 (127 orders)
   ...
```

### Test Selection

1. Reply: `1`

**Expected:**
```
🎉 Great choice!

Order Summary:
Service: Professional Logo Design
Amount: ₹499

💳 Complete your payment here:
[payment link]
```

### Test Payment Flow

1. Click payment link
2. Click "Pay" button
3. Wait for success

**Expected:**
```
✅ Payment Successful!

Order ID: ORD...
Service: Professional Logo Design
...
```

---

## 4️⃣ Database Testing

### Check MongoDB Connection

```bash
mongosh "mongodb+srv://zkupiUser:zkupiPassword123@cluster0.blbtk8l.mongodb.net/whatsappbuisnessmarketplace"
```

### Check Collections

```javascript
// Show all collections
show collections

// Count sellers
db.sellers.countDocuments()

// Count users
db.users.countDocuments()

// Count orders
db.orders.countDocuments()

// View sample seller
db.sellers.findOne()

// View recent orders
db.orders.find().sort({createdAt: -1}).limit(5)
```

---

## 5️⃣ Integration Testing

### Full Flow Test

1. **Start:** Send message to bot
2. **AI:** Parses intent correctly
3. **Database:** Finds matching sellers
4. **Bot:** Sends options
5. **User:** Selects option
6. **Payment:** Creates order in database
7. **Payment:** Generates payment link
8. **User:** Completes payment
9. **Webhook:** Updates order status
10. **Bot:** Sends confirmation

### Verify Each Step

```bash
# 1. Check server logs
npm run dev

# 2. Monitor database
mongosh "your_connection_string"
db.orders.find().sort({createdAt: -1})

# 3. Check Telegram messages
# Open Telegram and verify messages

# 4. Check admin dashboard
# Open http://localhost:3000/admin
```

---

## 6️⃣ Error Handling Testing

### Test Invalid Input

1. Send to bot: `asdfghjkl`
2. **Expected:** Bot should handle gracefully

### Test Invalid Selection

1. After getting options, send: `99`
2. **Expected:** Bot asks for valid number

### Test Database Failure

1. Stop MongoDB
2. Try to use bot
3. **Expected:** Error logged, user gets friendly message

### Test AI Failure

1. Use invalid Groq API key
2. Try to use bot
3. **Expected:** Falls back to basic parsing

---

## 7️⃣ Performance Testing

### Response Time

```bash
# Test API response time
time curl http://localhost:3000/api/test/database

# Should be < 1 second
```

### Bot Response Time

1. Send message to bot
2. Measure time to response
3. **Expected:** < 3 seconds

### Payment Page Load

1. Click payment link
2. Measure page load time
3. **Expected:** < 2 seconds

---

## 8️⃣ Security Testing

### Check Environment Variables

```bash
# Verify .env is not in git
git status

# .env should be in .gitignore
cat .gitignore | grep .env
```

### Check API Keys

```bash
# Verify keys are not exposed
grep -r "gsk_" server/
grep -r "8641763534" server/

# Should only be in .env file
```

### Test SQL Injection

```bash
# Try malicious input
curl -X POST http://localhost:3000/api/test/ai \
  -H "Content-Type: application/json" \
  -d '{"message": "'; DROP TABLE users; --"}'

# Should handle safely
```

---

## 9️⃣ Browser Testing

### Test on Different Browsers

- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge

### Test on Mobile

- ✅ iPhone Safari
- ✅ Android Chrome
- ✅ Responsive design

### Test Features

- ✅ All buttons work
- ✅ Forms submit correctly
- ✅ Tables display properly
- ✅ Animations smooth
- ✅ No console errors

---

## 🔟 Deployment Testing

### Test on Railway

1. Deploy to Railway
2. Set webhook:
```bash
curl "https://api.telegram.org/bot8641763534:AAERgeoZobgp8NYNt9aPrI9geGKZfy1u18A/setWebhook?url=https://your-app.railway.app/webhook/telegram"
```

3. Test bot on Telegram
4. Check Railway logs
5. Verify database updates

### Test Production URLs

```bash
# Test health
curl https://your-app.railway.app/api

# Test admin
curl https://your-app.railway.app/api/admin/stats

# Test payment page
# Open in browser
https://your-app.railway.app/demo-payment?orderId=TEST&amount=499&service=Test
```

---

## ✅ Pre-Submission Checklist

### Code Quality
- [ ] No console.errors in browser
- [ ] No errors in server logs
- [ ] All routes working
- [ ] All tests passing

### Functionality
- [ ] Bot responds to /start
- [ ] AI parses messages correctly
- [ ] Sellers display with prices
- [ ] Payment flow works
- [ ] Confirmation sent

### UI/UX
- [ ] Landing page looks professional
- [ ] Admin dashboard loads data
- [ ] Payment page is beautiful
- [ ] Mobile responsive
- [ ] No broken links

### Database
- [ ] MongoDB connected
- [ ] Sellers seeded
- [ ] Orders saving correctly
- [ ] Users creating properly

### Deployment
- [ ] Deployed to Railway/Render
- [ ] Environment variables set
- [ ] Webhook configured
- [ ] Bot working in production

### Documentation
- [ ] README updated
- [ ] API documented
- [ ] Setup guide clear
- [ ] Demo instructions ready

### Security
- [ ] .env in .gitignore
- [ ] No API keys in code
- [ ] No sensitive data exposed
- [ ] Error messages safe

---

## 🎯 Quick Test Script

Run all tests at once:

```bash
#!/bin/bash

echo "🧪 Running all tests..."

echo "\n1️⃣ Testing Database..."
curl -s http://localhost:3000/api/test/database | jq

echo "\n2️⃣ Testing AI..."
curl -s -X POST http://localhost:3000/api/test/ai \
  -H "Content-Type: application/json" \
  -d '{"message": "I need a logo under ₹500"}' | jq

echo "\n3️⃣ Testing Telegram..."
curl -s http://localhost:3000/api/test/telegram | jq

echo "\n4️⃣ Testing Payment..."
curl -s http://localhost:3000/api/test/payment | jq

echo "\n✅ All tests complete!"
```

Save as `test-all.sh` and run:
```bash
chmod +x test-all.sh
./test-all.sh
```

---

## 🐛 Common Issues & Fixes

### Bot not responding
- Check server is running
- Verify Telegram token
- Check webhook is set
- Look at server logs

### Database errors
- Check MongoDB connection string
- Verify network access
- Check if seeded

### AI not working
- Verify Groq API key
- Check API quota
- Look at error logs

### Payment not completing
- Check order exists in database
- Verify webhook endpoint
- Check server logs

---

## 📊 Success Criteria

All tests should show:
- ✅ Green checkmarks
- ✅ No errors in logs
- ✅ Fast response times
- ✅ Smooth user experience
- ✅ Professional UI
- ✅ Complete functionality

---

## 🎉 You're Ready!

If all tests pass, your project is ready for submission!

**Final Steps:**
1. Record demo video
2. Take screenshots
3. Push to GitHub
4. Deploy to Railway
5. Submit to hackathon

**Good luck!** 🚀
