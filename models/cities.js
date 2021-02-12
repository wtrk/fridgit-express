const mongoose = require('mongoose');
 
const citiesSchema = new mongoose.Schema(
  {
    name: {type: String},
    code: {type: String},
    alias: [{name: String}]
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('City', citiesSchema);