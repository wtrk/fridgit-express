
const mongoose = require('mongoose');
 
const clientLegalsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 250,
      trim: true,
    },
    nickname: {
      type: String,
      max: 150,
      trim: true,
    },
    cr_number: {
      type: Number,
      trim: true,
    },
    vat_number: {
        type: Number,
        trim: true,
    },
    vat_percentage: {
        type: Number,
        trim: true,
    },
    client_id: {
      type: String,
      max: 150,
      trim: true,
    }
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('clientLegals', clientLegalsSchema);