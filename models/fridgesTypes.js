const mongoose = require('mongoose');
 
const fridgesTypesSchema = new mongoose.Schema(
  {
    name: {type: String},
    code: {type: String},
    Manufacture: {type: String},
    refrigerant_type: {type: String},
    length: {type: Number},
    width: {type: Number},
    height: {type: Number},
    cbm: {type: Number},
    preventive: {type: Number},
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('FridgesTypes', fridgesTypesSchema);