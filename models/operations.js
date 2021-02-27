const mongoose = require('mongoose');
 
const operationsSchema = new mongoose.Schema(
  {
    name: String
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('Operations', operationsSchema);