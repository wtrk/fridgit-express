const mongoose = require('mongoose');
 
const allocationRulesSchema = new mongoose.Schema(
  {
    priority: {
      type: Number,
      default: 1,
    },
    code: String,
    name: String,
    supplier_id: String,
    cities: [{name: String}],
    neighbourhoods: [{name: String}],
    clients: [{name: String}],
    operations: [{name: String}]
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('AllocationRules', allocationRulesSchema);
