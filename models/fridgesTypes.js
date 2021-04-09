const mongoose = require('mongoose');
 
const fridgesTypesSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      trim: true,
    },
    name: String,
    code: String,
    Manufacture: String,
    refrigerant_type: String,
    length: Number,
    width: Number,
    height: Number,
    cbm: Number,
    preventive:[{
      preventiveActions_id: String,
      rightAnswer_id: String,
      notes:String
    }]
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('FridgesTypes', fridgesTypesSchema);