const mongoose = require('mongoose');
 
const operationSparePartsSchema = new mongoose.Schema(
  {
    main_id: String,
    cabinet_id: String,
    operation_id: String,
    job_id: String,
    price: Number,
    quantity: Number,
    labor_id:String,
    inspection_id:String
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('OperationSpareParts', operationSparePartsSchema);
