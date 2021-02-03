const mongoose = require('mongoose');
 
const allocationRulesSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      max: 150,
    },
    name: {
      type: String,
      max: 150,
    },
    supplier_id: {
      type: String,
      max: 150,
    },
    cities: [{name: String}],
    neighbourhoods: [{name: String}],
    customers: [{name: String}],
    operations: [{name: String}]
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('AllocationRules', allocationRulesSchema);
