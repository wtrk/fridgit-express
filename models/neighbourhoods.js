const mongoose = require('mongoose');
 
const neighbourhoodsSchema = new mongoose.Schema(
  {
    name: {type: String},
    code: {type: String},
    city_id: {type: String},
    alias: [{name: String}]
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('Neighbourhoods', neighbourhoodsSchema);