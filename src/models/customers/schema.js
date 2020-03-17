const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let customerschema = new mongoose.Schema({
  userID: ObjectId,
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
