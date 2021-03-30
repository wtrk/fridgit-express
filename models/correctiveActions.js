const mongoose = require('mongoose');
 
const correctiveActionsSchema = new mongoose.Schema(
  {
    name: String,
    nameAr: String,
    category: String,
    categoryAr: String,
    type: String,
    price: String,
    fridgesTypes: [{name: String}],
    spareParts: [{name: String}],
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('CorrectiveActions', correctiveActionsSchema);
