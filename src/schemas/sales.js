const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let sale = new mongoose.Schema({
  ids: String,
  userID: ObjectId,
  supervisor: String,
  number_of_working_days: Number,
  email: String
});

module.exports = sale;
