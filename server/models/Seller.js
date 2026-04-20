const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  service: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['logo', 'website', 'app', 'content', 'marketing', 'design', 'other']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 5,
    min: 0,
    max: 5
  },
  completedOrders: {
    type: Number,
    default: 0
  },
  deliveryTime: {
    type: String,
    default: '2-3 days'
  },
  contact: {
    phone: String,
    email: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster searches
sellerSchema.index({ category: 1, price: 1 });
sellerSchema.index({ service: 'text', description: 'text' });

module.exports = mongoose.model('Seller', sellerSchema);
