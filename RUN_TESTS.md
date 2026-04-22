# 🧪 How to Run All Tests

## Quick Test (Automated)

```bash
# Make script executable
chmod +x test-all.sh

# Run all tests
./test-all.sh
```

Or use npm:
```bash
npm test
```

## Manual Testing

### 1. Start Server
```bash
npm run dev
```

### 2. Test Frontend

**Landing Page:**
```
http://localhost:3000
```
- Click "Try Bot Now"
- Click test buttons
- Verify all sections load

**Admin Dashboard:**
```
http://localhost:3000/admin
```
- Check stats display
- Verify tables load
- Click refresh buttons

**Payment Page:**
```
http://localhost:3000/demo-payment?orderId=TEST123&amount=499&service=Test
```
- Verify UI loads
- Click Pay button
- Check success message

### 3. Test Backend APIs

**Health Check:**
```bash
curl http://localhost:3000/api
```

**Database Test:**
```bash
curl http://localhost:3000/api/test/database
```

**AI Test:**
```bash
curl -X POST http://localhost:3000/api/test/ai \
  -H "Content-Type: application/json" \
  -d '{"message": "I need a logo under ₹500"}'
```

**Telegram Test:**
```bash
curl http://localhost:3000/api/test/telegram
```

**Payment Test:**
```bash
curl http://localhost:3000/api/test/payment
```

### 4. Test Telegram Bot

1. Open Telegram
2. Search: `@Telegram_locus_bot`
3. Send: `/start`
4. Send: `I need a logo under ₹500`
5. Reply: `1`
6. Click payment link
7. Complete payment
8. Verify confirmation

### 5. Test Database

```bash
# Connect to MongoDB
mongosh "mongodb+srv://zkupiUser:zkupiPassword123@cluster0.blbtk8l.mongodb.net/Telegrambuisnessmarketplace"

# Check collections
show collections

# Count documents
db.sellers.countDocuments()
db.users.countDocuments()
db.orders.countDocuments()

# View data
db.sellers.find().limit(3)
db.orders.find().sort({createdAt: -1}).limit(5)
```

## Expected Results

### ✅ All Tests Should Pass

```
🧪 Testing AI Marketplace - Complete Test Suite
================================================

📡 Checking if server is running...
✅ Server is running

1️⃣ Testing Database Connection...
✅ Database test passed

2️⃣ Testing AI Service...
✅ AI test passed

3️⃣ Testing Telegram Service...
✅ Telegram test passed

4️⃣ Testing Payment System...
✅ Payment test passed

5️⃣ Testing Admin Stats...
✅ Admin stats test passed

6️⃣ Testing Frontend Pages...
✅ Landing page loads
✅ Admin page loads
✅ Payment page loads

================================================
✅ All tests complete!
```

## Troubleshooting

### Server not running
```bash
npm run dev
```

### Database not connected
- Check MongoDB connection string in .env
- Verify internet connection
- Check MongoDB Atlas whitelist

### AI test failing
- Verify Groq API key in .env
- Check API quota
- Look at server logs

### Telegram test failing
- Verify bot token in .env
- Check bot username
- Ensure webhook is set

### Frontend not loading
- Check server is running on port 3000
- Clear browser cache
- Check browser console for errors

## Integration Test

Test the complete flow:

1. **User sends message** → Bot receives
2. **AI parses intent** → Extracts service & budget
3. **Database query** → Finds matching sellers
4. **Bot responds** → Shows options
5. **User selects** → Creates order
6. **Payment link** → Generated
7. **User pays** → Order updated
8. **Confirmation** → Sent to user

Verify each step in:
- Server logs
- Database
- Telegram messages
- Admin dashboard

## Performance Benchmarks

- API response: < 500ms
- AI parsing: < 2s
- Bot response: < 3s
- Payment page load: < 1s
- Database query: < 200ms

## Success Criteria

- ✅ All automated tests pass
- ✅ No errors in server logs
- ✅ No errors in browser console
- ✅ Bot responds correctly
- ✅ Payment flow works
- ✅ Database updates correctly
- ✅ Admin dashboard shows data
- ✅ UI is responsive
- ✅ All pages load quickly

## Ready for Submission

If all tests pass:
1. ✅ Code is working
2. ✅ Ready to deploy
3. ✅ Ready to demo
4. ✅ Ready to submit

**Good luck!** 🚀
