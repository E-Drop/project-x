const mongoose = require('mongoose');

const { Schema } = mongoose;

const storeOwnerSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  _store: { type: Schema.Types.ObjectId, ref: 'Store' },
}, {
  timestamps: true,
});

const StoreOwner = mongoose.model('StoreOwner', storeOwnerSchema);

module.exports = StoreOwner;