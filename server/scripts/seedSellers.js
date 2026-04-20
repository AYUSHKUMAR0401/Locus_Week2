require('dotenv').config();
const mongoose = require('mongoose');
const Seller = require('../models/Seller');

const sampleSellers = [
  {
    name: 'Creative Designs Studio',
    service: 'Professional Logo Design',
    category: 'logo',
    price: 499,
    description: 'Modern, minimalist logo with 3 revisions. Perfect for startups!',
    rating: 4.8,
    completedOrders: 127,
    deliveryTime: '2 days',
    contact: { phone: '+919876543210', email: 'creative@example.com' }
  },
  {
    name: 'Logo Masters',
    service: 'Premium Logo Package',
    category: 'logo',
    price: 799,
    description: 'Complete branding kit with logo, business card, and letterhead',
    rating: 4.9,
    completedOrders: 203,
    deliveryTime: '3 days',
    contact: { phone: '+919876543211', email: 'masters@example.com' }
  },
  {
    name: 'Quick Logo Co',
    service: 'Budget Logo Design',
    category: 'logo',
    price: 299,
    description: 'Fast and affordable logo design for small businesses',
    rating: 4.5,
    completedOrders: 89,
    deliveryTime: '1 day',
    contact: { phone: '+919876543212', email: 'quick@example.com' }
  },
  {
    name: 'WebCraft Solutions',
    service: 'Landing Page Website',
    category: 'website',
    price: 2999,
    description: 'Responsive single-page website with modern design',
    rating: 4.7,
    completedOrders: 56,
    deliveryTime: '5 days',
    contact: { phone: '+919876543213', email: 'webcraft@example.com' }
  },
  {
    name: 'Full Stack Devs',
    service: 'Complete Website',
    category: 'website',
    price: 9999,
    description: 'Multi-page website with CMS, SEO optimized',
    rating: 4.9,
    completedOrders: 34,
    deliveryTime: '10 days',
    contact: { phone: '+919876543214', email: 'fullstack@example.com' }
  },
  {
    name: 'Budget Web',
    service: 'Basic Website',
    category: 'website',
    price: 1499,
    description: 'Simple 3-page website perfect for small businesses',
    rating: 4.4,
    completedOrders: 78,
    deliveryTime: '4 days',
    contact: { phone: '+919876543215', email: 'budget@example.com' }
  },
  {
    name: 'App Innovators',
    service: 'Mobile App MVP',
    category: 'app',
    price: 19999,
    description: 'Cross-platform mobile app with basic features',
    rating: 4.8,
    completedOrders: 23,
    deliveryTime: '15 days',
    contact: { phone: '+919876543216', email: 'appinnovators@example.com' }
  },
  {
    name: 'Content Kings',
    service: 'Blog Writing Package',
    category: 'content',
    price: 999,
    description: '5 SEO-optimized blog posts (500 words each)',
    rating: 4.6,
    completedOrders: 145,
    deliveryTime: '3 days',
    contact: { phone: '+919876543217', email: 'contentkings@example.com' }
  },
  {
    name: 'Social Media Pro',
    service: 'Social Media Management',
    category: 'marketing',
    price: 4999,
    description: '1 month social media management for 3 platforms',
    rating: 4.7,
    completedOrders: 67,
    deliveryTime: '30 days',
    contact: { phone: '+919876543218', email: 'socialmedia@example.com' }
  },
  {
    name: 'Design Studio Plus',
    service: 'UI/UX Design',
    category: 'design',
    price: 7999,
    description: 'Complete UI/UX design for web or mobile app',
    rating: 4.9,
    completedOrders: 41,
    deliveryTime: '7 days',
    contact: { phone: '+919876543219', email: 'designplus@example.com' }
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing sellers
    await Seller.deleteMany({});
    console.log('🗑️  Cleared existing sellers');

    // Insert sample sellers
    await Seller.insertMany(sampleSellers);
    console.log(`✅ Added ${sampleSellers.length} sample sellers`);

    console.log('\n📊 Sample sellers by category:');
    const categories = await Seller.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    categories.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
