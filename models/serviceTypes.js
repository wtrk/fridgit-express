const mongoose = require('mongoose');
 
const serviceTypesSchema = new mongoose.Schema(
  {
    name: String,
    code: String
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('ServiceTypes', serviceTypesSchema);