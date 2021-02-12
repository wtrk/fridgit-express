const mongoose = require('mongoose');
 
const cabinetsSchema = new mongoose.Schema(
  {
    sn:String,
    type: String,
    client: String,
    days_to_prev: String,
    prev_status: String,
    finance: Number,
    location:{
      city_id: String,
      neighbourhood_id: String,
      area: String,
      mobile: String,
    },
    status: {
      type: String,
      default: 'Needs Repair'
    },
    is_new: Boolean,
    booked: Boolean
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('Cabinets', cabinetsSchema);