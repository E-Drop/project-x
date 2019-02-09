const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
    name: { type: String },
    description: {type: String },
    price: { type: Number },
    stock: { type: Number },
    deleted: { type: Boolean },
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;