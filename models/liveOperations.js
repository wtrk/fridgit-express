const mongoose = require('mongoose');
 
const liveOperationsSchema = new mongoose.Schema(
  {
    job_number: String,
    operation_number: String,
    operation_type: String,
    sn: String,
    brand: String,
    client_id: String,
    initiation_address: {
      city_id: String,
      neighbourhood_id: String,
      shop_name: String,
      mobile: String,
    },
    execution_address: {
      city_id: String,
      neighbourhood_id: String,
      shop_name: String,
      mobile: String,
    },
    supplier_id: String,
    client_approval: String,
    status: String,
    last_status_user: String,
    last_status_update: String,
    promise_date: String,
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('LiveOperations', liveOperationsSchema);