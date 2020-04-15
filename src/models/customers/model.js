const mongoose = require('mongoose');
const customerschema = require('./schema');

const Customer = mongoose.model('Customer', customerschema);

module.exports = Customer;
