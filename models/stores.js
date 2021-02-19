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
      neighbourhood_id: String,
      mobile: String,
    },
    finance: String,
    status: String
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('Stores', storesSchema);