const mongoose = require('mongoose');
 
const storesSchema = new mongoose.Schema(
  {
    image:String,
    code: String,
    name: String,
    branch: String,
    branch_number: String,
    location:{
      city_id: String,
      area: String,
      mobile: String,
    },
    finance: String,
    status: String
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('Stores', storesSchema);