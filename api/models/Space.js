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

SpaceSchema.pre('save', async function () {
  if (this.isNew) {
    const User = require('./User');
    await User.findByIdAndUpdate(this.user, { $push: { spaces: this._id } });
  }
});

SpaceSchema.post('remove', async function (doc) {
  const User = require('./User');
  await User.findByIdAndUpdate(doc.user, { $pull: { spaces: doc._id } });
});

module.exports = mongoose.model('Space', SpaceSchema);
