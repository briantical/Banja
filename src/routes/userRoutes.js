const { Router } = require("express");

const usersroutes = Router();

usersroutes.get("/contact", (req, res) => {
  res.render("contact");
});

usersroutes.get("/aboutus", (req, res) => {
  res.render("aboutus");
});

usersroutes.get("*", (req, res) => {
  res.render("index");
});

module.exports = usersroutes;
