const mongoose = require('mongoose');
 
const warehousesSchema = new mongoose.Schema(
  {
    name: String,
    code: String,
    tier_id: String,
    location:{
      city_id: String,
      neighbourhood_id: String,
      mobile: String,
    },
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('Warehouses', warehousesSchema);
