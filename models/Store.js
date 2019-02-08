const mongoose = require('mongoose');

const { Schema } = mongoose;

const storeSchema = new Schema({
    name: { type: String},
    CIF: { type: String, unique: true },
    location: { type: String},
}, {
  timestamps: true,
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;