const mongoose = require("mongoose");

let sale = new mongoose.Schema({
  names: String,
  ids: String,
  password: String,
  supervisor: String,
  number_of_working_days: Number,
  username: String,
  email: String
});

export default sale;
