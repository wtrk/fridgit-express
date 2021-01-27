
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
    }
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('Clients', clientsSchema);