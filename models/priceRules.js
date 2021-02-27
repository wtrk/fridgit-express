const mongoose = require('mongoose');
 
const priceRuleSchema = new mongoose.Schema(
  {
    priority: {
      type: Number,
      default: 1,
    },
    name: String,
    service: String,
    promise_day: Number,
    handling_in: Number,
    storage: Number,
    in_house_preventive_maintenance: Number,
    corrective_service_in_house: Number,
    cabinet_testing_fees: Number,
    branding_fees: Number,
    drop: Number,
    transp_cbm: Number,
    transp_for_1_unit: Number,
    min_charge: Number,
    preventive_maintenance: Number,
    exchange_corrective_reaction: Number,
    corrective_reaction: Number,
    clients: [{name: String}],
    countries: [{name: String}],
    citiesIn: [{name: String}],
    citiesOut: [{name: String}],
    neighbourhoodsIn: [{name: String}],
    neighbourhoodsOut: [{name: String}],
    tiersIn: [{name: String}],
    tiersOut: [{name: String}],
    operations: [{name: String}]
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('PriceRule', priceRuleSchema);

