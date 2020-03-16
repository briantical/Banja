const mongoose = require("mongoose");
const { sale } = require("./../schemas");

let Sale = mongoose.model("Sale", sale);

module.exports = Sale;
