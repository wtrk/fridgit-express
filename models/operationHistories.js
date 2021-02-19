const mongoose = require('mongoose');
 
const operationHistoriesSchema = new mongoose.Schema(
  {
    status: String,
    user: String,
    notes: String,
    operation_number: String,
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('OperationHistories', operationHistoriesSchema);