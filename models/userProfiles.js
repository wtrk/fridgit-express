const mongoose = require('mongoose');
 
const userProfilesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 150,
    },
    can_view: {
      type: Number,
      max: 1,
      default: 0,
    },
    can_edit: {
      type: Number,
      max: 1,
      default: 0,
    },
    can_delete: {
      type: Number,
      max: 1,
      default: 0,
    }
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('UserProfiles', userProfilesSchema);