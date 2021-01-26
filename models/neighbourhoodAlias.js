const mongoose = require('mongoose');
 
const neighbourhoodAliasSchema = new mongoose.Schema(
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
    neighbourhood_id: {
      type: String,
      max: 150,
      trim: true,
    }
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('neighbourhoodAlias', neighbourhoodAliasSchema);