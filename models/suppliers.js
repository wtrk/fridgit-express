const mongoose = require('mongoose');
 
const suppliersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 150,
    },
    address: {
      type: String,
      max: 150,
    },
    phone: {
      type: String,
      max: 150,
    },
    user_id: {
      type: String,
      max: 150,
    },
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('Suppliers', suppliersSchema);