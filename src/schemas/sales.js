const mongoose = require("mongoose");

let sale = new mongoose.Schema({
  ids: String,
  supervisor: String,
  number_of_working_days: Number,
  email: String
});

module.exports = sale;
