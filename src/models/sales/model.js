const mongoose = require("mongoose");
const saleschema = require("./schema");

let Sale = mongoose.model("Sale", saleschema);

module.exports = Sale;
