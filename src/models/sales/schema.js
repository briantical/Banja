const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let saleschema = new mongoose.Schema({
  ids: String,
  userID: { type: ObjectId, ref: "User" },
  supervisor: String,
  number_of_working_days: Number,
  email: String
});

module.exports = saleschema;
