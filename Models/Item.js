
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  itemName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});
itemSchema.virtual('id').get(function() {
  return this._id.toHexString();
});


itemSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Item', itemSchema);

