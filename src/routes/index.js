const { Router } = require("express");
const approutes = Router();

const adminroutes = require("./adminRoutes");
const loginroutes = require("./loginRoutes");
const salesroutes = require("./salesRoutes");
const userroutes = require("./userRoutes");

approutes.use("/user", userroutes);
approutes.use("/login", loginroutes);
approutes.use("/sales", salesroutes);
approutes.use("/admin", adminroutes);

approutes.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(function(err) {
      if (err) {
        console.log("Failed to destroy session");
      } else {
        return res.redirect("/login");
      }
    });
  }
});

module.exports = approutes;
