const mongoose = require('mongoose');
 
const citiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 150,
      trim: true,
    },
    code: {
      type: String,
      max: 150,
      trim: true,
    },
    alias: [{name: String}]
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('City', citiesSchema);