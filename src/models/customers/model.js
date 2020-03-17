const mongoose = require("mongoose");
const customerschema = require("./schema");

let Customer = mongoose.model("Customer", customerschema);

module.exports = Customer;
