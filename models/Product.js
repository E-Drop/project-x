const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
    name: { type: String },
    description: {type: String },
    price: { type: NumberDecimal('0.01') },
    stock: { type: Number },
    deleted: { type: Boolean },
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;