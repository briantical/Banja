const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userschema = require('./schema');

userschema.plugin(passportLocalMongoose, { usernameField: 'username' });

const User = mongoose.model('User', userschema);

module.exports = User;
