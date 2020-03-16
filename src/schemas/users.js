const mongoose = require("mongoose");

let user = new mongoose.Schema({
  names: String,
  role: [String],
  phone_number: String,
  date_of_birth: Date,
  date_of_registration: Date
});

module.exports = user;
