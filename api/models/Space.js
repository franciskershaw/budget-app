const mongoose = require('mongoose');

const SpaceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  payments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
    },
  ],
});

SpaceSchema.post('save', async function (doc) {
  const User = require('./User');
  await User.findByIdAndUpdate(doc.user, { $push: { spaces: doc._id } });
});

module.exports = mongoose.model('Space', SpaceSchema);
