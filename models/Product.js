const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: {type: String },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    deleted: { type: Boolean, default: false },
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;