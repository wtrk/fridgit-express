const mongoose = require('mongoose');
 
const sparePartsSchema = new mongoose.Schema(
  {
    name: String,
    nameAr: String,
    category: String,
    categoryAr: String,
    type: String,
    price: String,
    fridgesTypes: [{name: String}]
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('spareParts', sparePartsSchema);
