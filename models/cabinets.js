const mongoose = require('mongoose');
 
const cabinetsSchema = new mongoose.Schema(
  {
    sn: {
      type: String,
      unique: true
    },
    sn2:String,
    type: String,
    brand: String,
    client: String,
    last_prev_date: String,
    days_to_prev: String,
    prev_status: String,
    finance: Number,
    location: {
      type: String,
      default: 'NA'
    },
    location_id: {
      type: String,
      default: 'NA'
    },
    status: {
      type: String,
      default: 'Operational'
    },
    is_new: {
      type: Boolean,
      default: true
    },
    booked: {
      type: Boolean,
      default: false
    },
    preventive:[{
      operation_number:String,
      preventiveActions_id: String,
      rightAnswer_id: String,
      notes:String,
      date:Date,
      reportable: { type: Boolean, default: false },
    }]
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('Cabinets', cabinetsSchema);