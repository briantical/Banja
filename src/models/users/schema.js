const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
  names: String,
  role: String,
  password: String,
  username: String,
  phoneNumber: String,
  dateOfBirth: Date,
  dateOfRegistration: Date
});

module.exports = userschema;
