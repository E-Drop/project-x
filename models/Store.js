const mongoose = require('mongoose');

const { Schema } = mongoose;

const storeSchema = new Schema({
    name: { type: String, required: true },
    CIF: { type: String, unique: true, required: true },
    location: { type: String, required: true },
}, {
  timestamps: true,
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;