const mongoose = require('mongoose');
 
const serviceTypesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 150,
    },
    code: {
      type: String,
      max: 150,
    }
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('ServiceTypes', serviceTypesSchema);