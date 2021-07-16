const mongoose = require('mongoose');
 
const companiesSchema = new mongoose.Schema(
  {
    logo:String,
    name: String,
    description: String,
    phone: String,
    address: String,
    email: String,
    website: String,
    cr_number: Number,
    vat_number: Number,
    vat_percentage: Number
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('Companies', companiesSchema);