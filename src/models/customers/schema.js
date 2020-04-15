const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;

const customerschema = new mongoose.Schema({
  userID: { type: ObjectId, ref: 'User' },
  customerID: String,
  NIN: String,
  nationality: String,
  marital_status: String,
  documents: Boolean,
  vehicle_type: String,
  down_paymnet: Number,
  stage_name: String,
  lc_one: String,
  lc_three: String,
  referee_name: String,
  referee_dob: Date,
  referee_contact: String,
  referee_occupation: String
});

module.exports = customerschema;
