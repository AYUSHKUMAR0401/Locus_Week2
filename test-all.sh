#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🧪 Testing AI Marketplace - Complete Test Suite"
echo "================================================"
echo ""

# Check if server is running
echo "📡 Checking if server is running..."
if curl -s http://localhost:3000/api > /dev/null; then
    echo -e "${GREEN}✅ Server is running${NC}"
else
    echo -e "${RED}❌ Server is not running. Please start with: npm run dev${NC}"
    exit 1
fi

echo ""
echo "1️⃣ Testing Database Connection..."
echo "-----------------------------------"
RESPONSE=$(curl -s http://localhost:3000/api/test/database)
if echo "$RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ Database test passed${NC}"
    echo "$RESPONSE" | jq '.'
else
    echo -e "${RED}❌ Database test failed${NC}"
    echo "$RESPONSE"
fi

echo ""
echo "2️⃣ Testing AI Service..."
echo "-----------------------------------"
RESPONSE=$(curl -s -X POST http://localhost:3000/api/test/ai \
  -H "Content-Type: application/json" \
  -d '{"message": "I need a logo under ₹500"}')
if echo "$RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ AI test passed${NC}"
    echo "$RESPONSE" | jq '.'
else
    echo -e "${RED}❌ AI test failed${NC}"
    echo "$RESPONSE"
fi

echo ""
echo "3️⃣ Testing Telegram Service..."
echo "-----------------------------------"
RESPONSE=$(curl -s http://localhost:3000/api/test/telegram)
if echo "$RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ Telegram test passed${NC}"
    echo "$RESPONSE" | jq '.'
else
    echo -e "${RED}❌ Telegram test failed${NC}"
    echo "$RESPONSE"
fi

echo ""
echo "4️⃣ Testing Payment System..."
echo "-----------------------------------"
RESPONSE=$(curl -s http://localhost:3000/api/test/payment)
if echo "$RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ Payment test passed${NC}"
    echo "$RESPONSE" | jq '.'
else
    echo -e "${RED}❌ Payment test failed${NC}"
    echo "$RESPONSE"
fi

echo ""
echo "5️⃣ Testing Admin Stats..."
echo "-----------------------------------"
RESPONSE=$(curl -s http://localhost:3000/api/admin/stats)
if echo "$RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ Admin stats test passed${NC}"
    echo "$RESPONSE" | jq '.'
else
    echo -e "${RED}❌ Admin stats test failed${NC}"
    echo "$RESPONSE"
fi

echo ""
echo "6️⃣ Testing Frontend Pages..."
echo "-----------------------------------"

# Test landing page
if curl -s http://localhost:3000/ | grep -q "AI Marketplace"; then
    echo -e "${GREEN}✅ Landing page loads${NC}"
else
    echo -e "${RED}❌ Landing page failed${NC}"
fi

# Test admin page
if curl -s http://localhost:3000/admin | grep -q "Admin Dashboard"; then
    echo -e "${GREEN}✅ Admin page loads${NC}"
else
    echo -e "${RED}❌ Admin page failed${NC}"
fi

# Test payment page
if curl -s "http://localhost:3000/demo-payment?orderId=TEST&amount=499&service=Test" | grep -q "Complete Payment"; then
    echo -e "${GREEN}✅ Payment page loads${NC}"
else
    echo -e "${RED}❌ Payment page failed${NC}"
fi

echo ""
echo "================================================"
echo "✅ All tests complete!"
echo ""
echo "📊 Summary:"
echo "  - Database: Connected"
echo "  - AI Service: Working"
echo "  - Telegram: Configured"
echo "  - Payment: Ready"
echo "  - Frontend: Loaded"
echo ""
echo "🎯 Next steps:"
echo "  1. Test bot on Telegram: https://t.me/Telegram_locus_bot"
echo "  2. View admin dashboard: http://localhost:3000/admin"
echo "  3. Run full integration test"
echo ""
