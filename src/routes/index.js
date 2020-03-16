const { Router } = require("express");
const { User, Sale, Customer } = require("./../models");

const api = Router();

api.get("/", (req, res) => {
  res.render("index");
});

api.post("/login", (req, res) => {
  let { username } = req.body;
  try {
    let user = User.find({ username });
    // If your user name belongs to admin, supervisor
    //redirect o specific page
  } catch (error) {}
});

api.get("/register", (req, res) => {
  res.render("register");
});

api.get("/resetpassword", (req, res) => {
  res.render("resetpassword");
});

api.get("*", (req, res) => {
  res.render("index");
});

module.exports = api;
