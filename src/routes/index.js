const { Router } = require("express");

const api = Router();

api.get("/", (req, res) => {
  res.render("index");
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
