
const mongoose = require('mongoose');
 
const clientsSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      max: 250,
      trim: true,
    },
    company: {
      type: String,
      max: 150,
      trim: true,
    },
    address: {
      type: String,
      max: 150,
      trim: true,
    },
    phone: {
      type: String,
      max: 150,
      trim: true,
    },
    email: {
      type: String,
      max: 150,
      trim: true,
    },
    contacts: [{
      name: {
        type: String,
        max: 250,
        trim: true,
      },
      phone: {
        type: String,
        max: 150,
        trim: true,
      },
      address: {
        type: String,
        max: 250,
        trim: true,
      },
      email: {
        type: String,
        max: 150,
        trim: true,
      },
      position: {
        type: String,
        max: 150,
        trim: true,
      }
    }],
    legals: [{
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
      }
    }],
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('Clients', clientsSchema);