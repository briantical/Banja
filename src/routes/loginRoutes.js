const { Router } = require('express');
const passport = require('passport');

const permissions = require('../../permissions');

const loginroutes = Router();

// loginroutes.get("/", (req, res) => {
//   res.render("index");
// });

loginroutes.post(
  '/',
  passport.authenticate('local', { failureRedirect: '/' }),
  (req, res) => {
    req.session.user = req.user;
    const { names, role: userRole } = req.user;
    const role = permissions[userRole];
    res.redirect(`${role.homepage}?names=${names}`);
  }
);

loginroutes.get('/resetpassword', (req, res) => {
  res.render('resetpassword');
});

loginroutes.get('*', (req, res) => {
  res.render('index');
});

module.exports = loginroutes;
