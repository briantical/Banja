const mongoose = require("mongoose");
const userschema = require("./schema");

let User = mongoose.model("User", userschema);

module.exports = User;
