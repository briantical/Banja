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

module.exports = approutes;
