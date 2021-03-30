const mongoose = require('mongoose');
 
const correctiveInspectionsSchema = new mongoose.Schema(
  {
    name: String,
    nameAr: String,
    category: String,
    categoryAr: String,
    type: String,
    fridgesTypes: [{name: String}],
    spareParts: [{name: String}],
    correctiveActions: [{name: String}],
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('CorrectiveInspections', correctiveInspectionsSchema);
