const mongoose = require('mongoose');
 
const liveOperationsSchema = new mongoose.Schema(
  {
    job_number: { type: String },
    operation_number: { type: String },
    operation_type: { type: String },
    sn: { type: String },
    brand: { type: String },
    client_id: { type: String },
    client_name: { type: String },
    initiation_address: {
      city_id: { type: String },
      area: { type: String },
      shop_name: { type: String },
      mobile: { type: String },
    },
    execution_address: {
      city_id: { type: String },
      area: { type: String },
      shop_name: { type: String },
      mobile: { type: String },
    },
    supplier: { type: String },
    client_approval: { type: String },
    status: { type: String },
    last_status_user: { type: String },
    last_status_update: { type: String },
    promise_date: { type: String },
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('LiveOperations', liveOperationsSchema);