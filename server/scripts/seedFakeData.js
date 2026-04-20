require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Order = require('../models/Order');
const Seller = require('../models/Seller');

async function seedFakeData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Create fake users
    const fakeUsers = [
      { phone: '9876543210', name: 'Rahul Kumar' },
      { phone: '9876543211', name: 'Priya Sharma' },
      { phone: '9876543212', name: 'Amit Patel' },
      { phone: '9876543213', name: 'Sneha Reddy' },
      { phone: '9876543214', name: 'Vikram Singh' }
    ];

    await User.deleteMany({});
    const users = await User.insertMany(fakeUsers);
    console.log('✅ Added 5 fake users');

    // Get sellers
    const sellers = await Seller.find().limit(5);

    // Create fake orders
    const fakeOrders = [
      {
        orderId: `ORD${Date.now() - 86400000}`,
        userId: users[0]._id,
        sellerId: sellers[0]._id,
        amount: 499,
        status: 'paid',
        paymentDetails: {
          paidAt: new Date(Date.now() - 86400000)
        },
        customerDetails: {
          phone: users[0].phone,
          name: users[0].name,
          requirements: 'Need a modern logo for my startup'
        }
      },
      {
        orderId: `ORD${Date.now() - 172800000}`,
        userId: users[1]._id,
        sellerId: sellers[1]._id,
        amount: 2999,
        status: 'paid',
        paymentDetails: {
          paidAt: new Date(Date.now() - 172800000)
        },
        customerDetails: {
          phone: users[1].phone,
          name: users[1].name,
          requirements: 'Landing page for my business'
        }
      },
      {
        orderId: `ORD${Date.now() - 259200000}`,
        userId: users[2]._id,
        sellerId: sellers[2]._id,
        amount: 299,
        status: 'paid',
        paymentDetails: {
          paidAt: new Date(Date.now() - 259200000)
        },
        customerDetails: {
          phone: users[2].phone,
          name: users[2].name,
          requirements: 'Quick logo design needed'
        }
      },
      {
        orderId: `ORD${Date.now() - 345600000}`,
        userId: users[3]._id,
        sellerId: sellers[3]._id,
        amount: 1499,
        status: 'paid',
        paymentDetails: {
          paidAt: new Date(Date.now() - 345600000)
        },
        customerDetails: {
          phone: users[3].phone,
          name: users[3].name,
          requirements: 'Simple website for portfolio'
        }
      },
      {
        orderId: `ORD${Date.now() - 432000000}`,
        userId: users[4]._id,
        sellerId: sellers[4]._id,
        amount: 999,
        status: 'paid',
        paymentDetails: {
          paidAt: new Date(Date.now() - 432000000)
        },
        customerDetails: {
          phone: users[4].phone,
          name: users[4].name,
          requirements: 'Blog content writing'
        }
      }
    ];

    await Order.deleteMany({});
    await Order.insertMany(fakeOrders);
    console.log('✅ Added 5 fake orders');

    // Update seller stats
    for (let seller of sellers) {
      await Seller.findByIdAndUpdate(seller._id, {
        $inc: { completedOrders: 1 }
      });
    }

    console.log('✅ Fake data seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: ${users.length}`);
    console.log(`   Orders: ${fakeOrders.length}`);
    console.log(`   Total Revenue: ₹${fakeOrders.reduce((sum, o) => sum + o.amount, 0)}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedFakeData();
