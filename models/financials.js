const mongoose = require('mongoose');
 
const financialSchema = new mongoose.Schema(
  {
    sn: String,
    price_rule_name: String,
    job_number: String,
    operation_number: String,
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
    transportation_fees: Number,
    preventive_maintenance: Number,
    exchange_corrective_reaction: Number,
    corrective_reaction: Number,
    total: Number,
    labor:Number,
    spare:Number,
    location: {
      city_id: String,
      neighbourhood_id: String,
      shop_name: String,
      mobile: String,
    },
    operation_type: String,
    invoice_id: String,
    user_id: String
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('Financial', financialSchema);

