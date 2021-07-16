const mongoose = require('mongoose');
 
const invoicesSchema = new mongoose.Schema(
  {
    name: String,
    client_id: String,
    user_id: String,
    from: Date,
    to: Date,
    total: Number,
    reference_number: String,
    paid: Boolean
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('Invoice', invoicesSchema);