const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  space: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Space',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  inOut: {
    type: String,
    enum: ['in', 'out'],
    required: true,
  },
  paymentDate: {
    type: Date,
    required: true,
  },
  repeat: {
    type: String,
    enum: ['never', 'daily', 'monthly', 'yearly'],
    required: true,
    default: 'never',
  },
});

module.exports = mongoose.model('Payment', PaymentSchema);
