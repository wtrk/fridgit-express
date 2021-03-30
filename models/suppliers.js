const mongoose = require('mongoose');
 
const suppliersSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    phone: String,
    user_id: String,
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('Suppliers', suppliersSchema);