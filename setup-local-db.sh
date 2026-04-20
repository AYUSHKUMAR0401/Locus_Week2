#!/bin/bash

echo "🔧 Setting up local MongoDB..."
echo ""

# Check if MongoDB is installed
if command -v mongod &> /dev/null; then
    echo "✅ MongoDB is installed"
else
    echo "❌ MongoDB is not installed"
    echo ""
    echo "Installing MongoDB..."
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        echo "Detected macOS"
        brew tap mongodb/brew
        brew install mongodb-community
        brew services start mongodb-community
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        echo "Detected Linux"
        sudo apt-get update
        sudo apt-get install -y mongodb
        sudo systemctl start mongodb
    else
        echo "❌ Unsupported OS. Please install MongoDB manually."
        exit 1
    fi
fi

# Check if MongoDB is running
echo ""
echo "Checking if MongoDB is running..."
if pgrep -x "mongod" > /dev/null; then
    echo "✅ MongoDB is running"
else
    echo "Starting MongoDB..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew services start mongodb-community
    else
        sudo systemctl start mongodb
    fi
fi

# Copy local env file
echo ""
echo "Setting up local environment..."
cp .env.local .env
echo "✅ Using local MongoDB configuration"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Setup complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo "1. npm run seed    # Seed database"
echo "2. npm run dev     # Start server"
echo "3. npm test        # Run tests"
echo ""
