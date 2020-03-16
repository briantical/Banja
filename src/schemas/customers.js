const mongoose = require("mongoose");

let customer = new mongoose.Schema({
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

module.exports = customer;
