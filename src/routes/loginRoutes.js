const { Router } = require("express");
const passport = require("passport");

const permissions = require("./../../permissions");

const loginroutes = Router();

loginroutes.get("/", (req, res) => {
  res.render("index");
});

loginroutes.post(
  "/",
  passport.authenticate("local", { failureRedirect: "/" }),
  (req, res) => {
    let roles = permissions[req.user.role];
  }
);

loginroutes.get("/resetpassword", (req, res) => {
  res.render("resetpassword");
});

loginroutes.get("*", (req, res) => {
  res.render("index");
});

module.exports = loginroutes;
