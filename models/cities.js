const mongoose = require('mongoose');
 
const citiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 150,
    },
    code: {
      type: String,
      max: 150,
    },
    kaza: {
      type: String,
      max: 150,
    },
    mouhafaza: {
      type: String,
      max: 150,
    },
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('City', citiesSchema);