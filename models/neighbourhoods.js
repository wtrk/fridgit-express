const mongoose = require('mongoose');
 
const neighbourhoodsSchema = new mongoose.Schema(
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
 
module.exports = mongoose.model('Neighbourhoods', neighbourhoodsSchema);