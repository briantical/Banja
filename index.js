const pug = require("pug");
const express = require("express");
const mongoose = require("mongoose");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");

//Project defined modules
const approutes = require("./src/routes");

const { User } = require("./src/models");

const PORT = 3030;
const DB_URI = "mongodb://localhost:27017/banja";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

let MONGO_DB_URI = process.env.MONGODB_URI || DB_URI;

console.log(process.env.MONGODB_URI);

let app = express();

/**
 * body-parser to capture that form data and convert it to JSON
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize passport
app.use(passport.initialize());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Using the favicons
app.use(favicon(__dirname + "/public/favicon/favicon.ico"));

// Use sessions forr tracking the pages
app.set("trust proxy", 1);
app.use(
  session({
    cookie: {
      secure: true,
      maxAge: 60000
    },
    secret: "thesecret",
    resave: true,
    saveUninitialized: false
  })
);

//Define the template engine to use
app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");

//Access the public folder for css
// Access the public folder in the root directory
app.use("/static", express.static(__dirname + "/public"));

app.use("/", approutes);

mongoose.connect(MONGO_DB_URI, options, error => {
  if (error) throw error;
  console.log(`Successfully started the database`);
});

app.listen(`${PORT}`, () => {
  console.log(`Listening on PORT ${PORT}`);
});
