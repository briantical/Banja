const pug = require("pug");
const express = require("express");
const mongoose = require("mongoose");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");

const PORT = 3030;
const DB_URI = "mongodb://localhost:27017/banja";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

let app = express();

/**
 * body-parser to capture that form data and convert it to JSON
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Using the favicons
app.use(favicon(__dirname + "/public/favicon/favicon.ico"));

//Define the template engine to use
app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");

//Access the public folder for css
// Access the public folder in the root directory
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/resetpassword", (req, res) => {
  res.render("resetpassword");
});

app.get("*", (req, res) => {
  res.render("index");
});

mongoose.connect(DB_URI, options, error => {
  if (error) throw error;
  console.log(`Successfully started the database`);
});

app.listen(`${PORT}`, () => {
  console.log(`Listening on PORT ${PORT}`);
});
