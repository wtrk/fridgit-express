const mongoose = require('mongoose');
 
const cabinetsSchema = new mongoose.Schema(
  {
    sn:String,
    sn2:String,
    type: String,
    brand: String,
    client: String,
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
    }
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('Cabinets', cabinetsSchema);