const mongoose = require("mongoose");

let customer = new mongoose.Schema({
  customerID: String,
  NIN: String,
  nationality: [String],
  marital_status: String,
  documents: Boolean,
  vehicle: {
    vehicle_type: String,
    down_paymnet: Number
  },
  address: {
    stage_name: String,
    lc_one: String,
    lc_three: String
  },
  referee: {
    name: String,
    date_of_birth: Date,
    phone_number: String,
    occupation: String
  }
});

module.exports = customer;
