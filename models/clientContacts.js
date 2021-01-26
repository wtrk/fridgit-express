
const mongoose = require('mongoose');
 
const clientContactsSchema = new mongoose.Schema(
  {
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
    },
    client_id: {
      type: String,
      max: 150,
      trim: true,
    }
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('clientContacts', clientContactsSchema);
