const mongoose = require('mongoose');
 
const operationActionsSchema = new mongoose.Schema(
  {
    main_id: String,
    cabinet_id: String,
    operation_id: String,
    job_id: String,
    price: Number,
    quantity: Number,
    inspection_id:String
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('OperationActions', operationActionsSchema);
