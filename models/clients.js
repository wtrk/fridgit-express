
const mongoose = require('mongoose');
 
const clientsSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    contacts: [{
      name: {
        type: String,
        trim: true,
      },
      phone: {
        type: String,
        trim: true,
      },
      address: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
      },
      position: {
        type: String,
        trim: true,
      }
    }],
    legals: [{
      name: {
        type: String,
        trim: true,
      },
      nickname: {
        type: String,
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
      }
    }],
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('Clients', clientsSchema);