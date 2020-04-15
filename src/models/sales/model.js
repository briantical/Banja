const mongoose = require('mongoose');
const saleschema = require('./schema');

const Sale = mongoose.model('Sale', saleschema);

module.exports = Sale;
