const mongoose = require('mongoose');
 
const priceRuleSchema = new mongoose.Schema(
  {
    name: String,
    service: String,
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
    customers: [{name: String}],
    countries: [{name: String}],
    citiesIn: [{name: String}],
    citiesOut: [{name: String}],
    neighbourhoodsIn: [{name: String}],
    neighbourhoodsOut: [{name: String}],
    tiersIn: [{name: String}],
    tiersOut: [{name: String}]
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('PriceRule', priceRuleSchema);
