const { Router } = require("express");

const usersroutes = Router();

usersroutes.get("/contact", (req, res) => {
  res.render("contact");
});

usersroutes.get("/aboutus", (req, res) => {
  res.render("aboutus");
});

module.exports = usersroutes;
