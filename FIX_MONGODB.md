# 🔧 Fix MongoDB Connection

## ❌ Error: "bad auth : Authentication failed"

This means MongoDB Atlas can't authenticate with your credentials.

---

## 🚀 Quick Fix Options

### Option 1: Fix MongoDB Atlas (Recommended)

#### Step 1: Check Password
Your current credentials:
- Username: `zkupiUser`
- Password: `zkupiPassword123`

**Verify these are correct in MongoDB Atlas:**

1. Go to https://cloud.mongodb.com
2. Click "Database Access" (left sidebar)
3. Find user `zkupiUser`
4. If password is wrong, click "Edit" → "Edit Password"
5. Set new password
6. Update `.env` file with new password

#### Step 2: Whitelist IP Address

1. Go to https://cloud.mongodb.com
2. Click "Network Access" (left sidebar)
3. Click "Add IP Address"
4. Click "Allow Access from Anywhere" (0.0.0.0/0)
5. Click "Confirm"
6. Wait 2-3 minutes for changes to apply

#### Step 3: Check Database User Permissions

1. Go to "Database Access"
2. Find `zkupiUser`
3. Make sure role is "Atlas admin" or "Read and write to any database"
4. If not, click "Edit" → Change role → Save

#### Step 4: Get Correct Connection String

1. Go to "Database" (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Update `.env` file

---

### Option 2: Use Local MongoDB (Fastest for Testing)

#### Install MongoDB Locally

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

#### Update .env

```env
MONGODB_URI=mongodb://localhost:27017/Telegrambuisnessmarketplace
```

#### Restart Server

```bash
npm run seed
npm run dev
```

---

### Option 3: Create New MongoDB Atlas Cluster

If nothing works, create a fresh cluster:

1. Go to https://cloud.mongodb.com
2. Click "Build a Database"
3. Choose "FREE" (M0)
4. Select region closest to you
5. Click "Create"

6. **Create Database User:**
   - Username: `testuser`
   - Password: `Test123456` (remember this!)
   - Click "Create User"

7. **Whitelist IP:**
   - Click "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere"
   - Click "Confirm"

8. **Get Connection String:**
   - Click "Database" → "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with `Test123456`

9. **Update .env:**
```env
MONGODB_URI=mongodb+srv://testuser:Test123456@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

---

## 🧪 Test Connection

After fixing, test the connection:

```bash
# Test with Node.js
node -e "const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test').then(() => console.log('✅ Connected!')).catch(err => console.log('❌ Error:', err.message));"
```

Or use mongosh:

```bash
mongosh "your_connection_string_here"
```

---

## ✅ Once Fixed

1. **Restart server:**
```bash
npm run dev
```

2. **Seed database:**
```bash
npm run seed
```

3. **Test:**
```bash
npm test
```

---

## 🆘 Still Not Working?

### Check These:

1. **Password has special characters?**
   - URL encode them: `@` → `%40`, `#` → `%23`, etc.

2. **Firewall blocking?**
   - Try different network (mobile hotspot)

3. **MongoDB Atlas down?**
   - Check https://status.mongodb.com

4. **Wrong cluster?**
   - Make sure cluster name matches in connection string

---

## 💡 Recommended: Use Local MongoDB for Hackathon

For hackathon demo, local MongoDB is:
- ✅ Faster
- ✅ No internet needed
- ✅ No authentication issues
- ✅ Works offline

Just install locally and use:
```env
MONGODB_URI=mongodb://localhost:27017/Telegrambuisnessmarketplace
```

---

## 🚀 After Fixing

Your server should show:
```
🚀 Server running on port 3000
📱 Telegram webhook: http://localhost:3000/webhook/telegram
💳 Payment webhook: http://localhost:3000/webhook/payment
🎬 Demo payment: http://localhost:3000/demo-payment
✅ MongoDB connected successfully
```

Then you can:
1. Seed database: `npm run seed`
2. Run tests: `npm test`
3. Test bot on Telegram

Good luck! 🍀
