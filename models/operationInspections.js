const mongoose = require('mongoose');
 
const operationInspectionsSchema = new mongoose.Schema(
  {
    main_id: String,
    cabinet_id: String,
    operation_id: String,
    job_id: String,
    cleanliness: String,
    temperature: String,
    branding: String,
    stateOfGoods: String,
    inspections: [{name: String,category: String,quantity: Number,}]
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('OperationInspections', operationInspectionsSchema);
