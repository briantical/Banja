const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
  names: String,
  role: String,
  password: String,
  username: String,
  phone_number: String,
  date_of_birth: Date,
  date_of_registration: Date
});

module.exports = userschema;
