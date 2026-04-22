# 🚀 Deployment Guide

Complete guide to deploy your Telegram AI Marketplace to production.

## 🎯 Deployment Options

1. **Railway** (Recommended - Easiest)
2. **Render** (Good alternative)
3. **Heroku** (Classic choice)
4. **DigitalOcean** (More control)
5. **AWS/GCP** (Enterprise scale)

---

## 🚂 Option 1: Railway (Recommended)

### Why Railway?
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Built-in MongoDB (or easy external connection)
- ✅ Environment variables management
- ✅ Custom domains

### Step-by-Step Deployment

#### 1. Prepare Your Code

```bash
# Make sure everything is committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### 2. Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Authorize Railway to access your repositories

#### 3. Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository
4. Railway will detect Node.js automatically

#### 4. Add MongoDB

1. In your project, click **"New"**
2. Select **"Database"** → **"Add MongoDB"**
3. Railway will provision a MongoDB instance
4. Copy the connection string from the MongoDB service

#### 5. Configure Environment Variables

1. Click on your web service
2. Go to **"Variables"** tab
3. Add all variables from `.env`:

```env
NODE_ENV=production
PORT=3000

# MongoDB (use Railway's provided URL)
MONGODB_URI=mongodb://mongo:password@containers-us-west-xxx.railway.app:7439

# Twilio
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_Telegram_NUMBER=Telegram:+14155238886

# OpenAI
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Locus
LOCUS_API_KEY=your_locus_key
LOCUS_API_SECRET=your_locus_secret
LOCUS_WEBHOOK_URL=https://your-app.railway.app/webhook/payment

# App URL
APP_URL=https://your-app.railway.app
```

#### 6. Deploy

1. Railway automatically deploys on push
2. Wait for build to complete (2-3 minutes)
3. Get your deployment URL from Railway dashboard

#### 7. Seed Database

```bash
# SSH into Railway (or use Railway CLI)
railway run node server/scripts/seedSellers.js
```

Or use Railway CLI:
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Run seed script
railway run node server/scripts/seedSellers.js
```

#### 8. Update Webhooks

**Twilio:**
1. Go to Twilio Console
2. Update webhook URL to: `https://your-app.railway.app/webhook/Telegram`

**Locus:**
1. Go to Locus Dashboard
2. Update webhook URL to: `https://your-app.railway.app/webhook/payment`

#### 9. Test Production

Send a Telegram message to test the full flow!

---

## 🎨 Option 2: Render

### Step-by-Step

#### 1. Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub

#### 2. Create Web Service

1. Click **"New"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: Telegram-ai-marketplace
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

#### 3. Add MongoDB

**Option A: MongoDB Atlas (Recommended)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Whitelist Render's IP (or use 0.0.0.0/0 for all IPs)

**Option B: Render MongoDB**
1. In Render, create new **"PostgreSQL"** (they don't have MongoDB)
2. Use MongoDB Atlas instead

#### 4. Environment Variables

Add in Render dashboard under **"Environment"**:
```env
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_url
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_Telegram_NUMBER=...
OPENAI_API_KEY=...
LOCUS_API_KEY=...
LOCUS_API_SECRET=...
LOCUS_WEBHOOK_URL=https://your-app.onrender.com/webhook/payment
APP_URL=https://your-app.onrender.com
```

#### 5. Deploy

Render automatically deploys. Wait 3-5 minutes.

#### 6. Update Webhooks

Update Twilio and Locus webhooks with your Render URL.

---

## 🐳 Option 3: Docker + DigitalOcean

### Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Create docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/Telegram-marketplace
    env_file:
      - .env
    depends_on:
      - mongo

  mongo:
    image: mongo:6
    volumes:
      - mongo-data:/data/db
    ports:
      - "27017:27017"

volumes:
  mongo-data:
```

### Deploy to DigitalOcean

1. Create Droplet (Ubuntu)
2. SSH into server
3. Install Docker:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

4. Clone repository:
```bash
git clone https://github.com/yourusername/Telegram-ai-marketplace.git
cd Telegram-ai-marketplace
```

5. Create `.env` file with production values

6. Run:
```bash
docker-compose up -d
```

7. Setup nginx reverse proxy (optional but recommended)

---

## 🔒 Security Checklist

Before going live:

- [ ] All API keys in environment variables (not in code)
- [ ] `.env` file in `.gitignore`
- [ ] MongoDB authentication enabled
- [ ] HTTPS enabled (Railway/Render do this automatically)
- [ ] Webhook URLs use HTTPS
- [ ] Rate limiting implemented (optional but recommended)
- [ ] Input validation on all endpoints
- [ ] Error messages don't expose sensitive info

---

## 📊 Monitoring & Logs

### Railway
```bash
# View logs
railway logs

# Follow logs
railway logs --follow
```

### Render
- View logs in Render dashboard under "Logs" tab

### Custom Monitoring

Add to `server/index.js`:

```javascript
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
```

---

## 🐛 Troubleshooting Production Issues

### Issue: App crashes on startup

**Check:**
```bash
railway logs  # or render logs
```

**Common causes:**
- Missing environment variables
- MongoDB connection failed
- Port binding issues

**Solution:**
- Verify all env vars are set
- Check MongoDB connection string
- Use `process.env.PORT || 3000`

### Issue: Webhooks not working

**Check:**
1. Webhook URLs are correct
2. URLs use HTTPS
3. Server is accessible from internet
4. Firewall allows incoming connections

**Test webhook:**
```bash
curl -X POST https://your-app.railway.app/webhook/Telegram \
  -H "Content-Type: application/json" \
  -d '{"Body":"test","From":"Telegram:+1234567890"}'
```

### Issue: Database connection timeout

**Solutions:**
- Check MongoDB is running
- Verify connection string
- Whitelist IP addresses (if using MongoDB Atlas)
- Increase connection timeout in code

---

## 🚀 Post-Deployment Checklist

- [ ] App is accessible via URL
- [ ] MongoDB connected successfully
- [ ] Twilio webhook receiving messages
- [ ] Bot responds to Telegram messages
- [ ] Payment flow works end-to-end
- [ ] Locus webhook receiving payment confirmations
- [ ] Database seeded with sellers
- [ ] Logs are accessible
- [ ] Health check endpoint works
- [ ] Error handling works properly

---

## 📈 Scaling Considerations

When you get more traffic:

### 1. Database Optimization
- Add indexes to frequently queried fields
- Use MongoDB Atlas auto-scaling
- Implement caching (Redis)

### 2. Application Scaling
- Use Railway's auto-scaling
- Implement rate limiting
- Add CDN for static assets

### 3. Monitoring
- Set up error tracking (Sentry)
- Add performance monitoring (New Relic)
- Set up uptime monitoring (UptimeRobot)

### 4. Backup Strategy
- Enable MongoDB automated backups
- Export data regularly
- Test restore procedures

---

## 🎯 Production Best Practices

```javascript
// Add to server/index.js

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});

// Uncaught exception handler
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Unhandled rejection handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
```

---

## 🎉 You're Live!

Your Telegram AI Marketplace is now in production!

**Share your demo:**
- Telegram number: Your Twilio number
- Demo message: "I need a logo under ₹500"

**Monitor:**
- Check logs regularly
- Monitor error rates
- Track user engagement

**Iterate:**
- Gather user feedback
- Add new features
- Optimize performance

Good luck with your hackathon! 🚀
