const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('💡 Please check:');
    console.error('   1. MongoDB Atlas username and password are correct');
    console.error('   2. IP address is whitelisted (0.0.0.0/0 for all IPs)');
    console.error('   3. Database user has read/write permissions');
    console.error('   4. Connection string format is correct');
    console.error('⚠️  Server will continue without database (limited functionality)');
    // Don't exit - allow bot to work without DB for testing
  }
};

module.exports = connectDB;
