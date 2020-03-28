const mongoose = require("mongoose");
const userschema = require("./schema");
const passportLocalMongoose = require("passport-local-mongoose");

userschema.plugin(passportLocalMongoose, { usernameField: "username" });

let User = mongoose.model("User", userschema);

module.exports = User;
