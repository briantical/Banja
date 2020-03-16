const mongoose = require("mongoose");
const { user } = require("./../schemas");

let User = mongoose.model("User", user);

module.exports = User;
