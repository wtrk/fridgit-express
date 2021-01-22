const mongoose = require('mongoose');
const crypto = require('crypto');
const { stringify } = require('querystring');
 
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 150,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      max: 150,
      trim: true,
    },
    password: {
      type: String,
      max: 150,
    },
    address: {
      type: String,
      max: 150,
      trim: true,
    },
    mobile: {
      type: String,
      max: 150,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    usertype_id: {
      type: String,
      max: 150,
      trim: true,
    },
    profile_id: {
      type: String,
      max: 150,
      trim: true,
    },
    is_admin: {
      type: Number,
      max: 1,
      default: 0,
    },
    is_deleted: {
      type: Number,
      max: 1,
      default: 0,
    },
    receive_email: {
      type: Number,
      max: 1,
      default: 0,
    },
    can_change: {
      type: Number,
      max: 1,
      default: 0,
    },
    can_approve: {
      type: Number,
      max: 1,
      default: 0,
    },
    can_approve_maintenance: {
      type: Number,
      max: 1,
      default: 0,
    },
    can_approve_damaged: {
      type: Number,
      max: 1,
      default: 0,
    },
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('User', userSchema);