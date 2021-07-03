const mongoose = require('mongoose');
 
const operationHistoriesSchema = new mongoose.Schema(
  {
    status: String,
    fridge_status: String,
    user: String,
    supplier_id: String,
    notes: String,
    operation_number: String,
    sn: String,
    location: {
      city_id: String,
      neighbourhood_id: String,
      shop_name: String,
      mobile: String,
    },
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('OperationHistories', operationHistoriesSchema);