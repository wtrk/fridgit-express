const mongoose = require('mongoose');
 
const preventiveActionsSchema = new mongoose.Schema(
  {
    name: String,
    nameAr: String,
    category: String,
    categoryAr: String,
    subCategory: String,
    subCategoryAr: String,
    answers: [
      {
        name: String,
        nameAr: String,
        reportable: { type: Boolean, default: false },
        obligatory: { type: Boolean, default: false }
      
      }],
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('PreventiveActions', preventiveActionsSchema);

// select b.description as "Questions", d.sn, e.description as "Fridge's Types", a.answer, a.notes from replacementpreventive a inner join preventiveactions b on b.serial = a.preventive inner join replacement c on c.serial = a.replacement inner join fridges d on d.serial = c.fridge_ID inner join fridgetype e on e.serial = d.type_id where b.deleted = 0 
