const mongoose = require('mongoose');
 
const warehousesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 150,
    },
    code: {
      type: String,
      max: 150,
    },
    tier_id: {
      type: String,
      max: 150,
    }
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('Warehouses', warehousesSchema);
