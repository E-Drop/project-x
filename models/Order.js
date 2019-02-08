const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema =new Schema({
    status: { type: String, enum: ['pending', 'delivered'] },
    products: [{
        name: { type: String },
        price: { type: NumberDecimal('0.01') },
        quantity: { type: Number },
    }],
    _store: { type: Schema.Types.ObjectId, ref: 'Store' },
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;