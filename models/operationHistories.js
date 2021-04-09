const mongoose = require('mongoose');
 
const operationHistoriesSchema = new mongoose.Schema(
  {
    status: String,
    user: String,
    notes: String,
    operation_number: String,
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