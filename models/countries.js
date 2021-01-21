const mongoose = require('mongoose');
 
const countriesSchema = new mongoose.Schema(
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
 
module.exports = mongoose.model('Countries', countriesSchema);