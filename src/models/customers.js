const mongoose = require("mongoose");
const { customer } = require("./../schemas");

let Customer = mongoose.model("Customer", customer);

module.exports = Customer;
