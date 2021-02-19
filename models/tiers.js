const mongoose = require('mongoose');
 
const tiersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 150,
    },
    code: {
      type: String,
      max: 150,
    },
    cities: [{name: String}]
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('Tiers', tiersSchema);

