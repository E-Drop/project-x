const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    status: {
      type: String,
      enum: ['pending', 'delivered'],
      default: 'pending'
    },
    products: [
      {
        name: { type: String },
        price: { type: Number },
        quantity: { type: Number, min: 1 }
      }
    ],
    _store: { type: Schema.Types.ObjectId, ref: 'Store', required: true }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
