const mongoose = require('mongoose');
 
const userTypesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 150,
    }
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('UserTypes', userTypesSchema);