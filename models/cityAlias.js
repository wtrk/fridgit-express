const mongoose = require('mongoose');
 
const cityAliasSchema = new mongoose.Schema(
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
    city_id: {
      type: String,
      max: 150,
      trim: true,
    }
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('cityAlias', cityAliasSchema);