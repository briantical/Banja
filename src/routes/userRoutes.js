const { Router } = require('express');
const { User } = require('../models');

const usersroutes = Router();

usersroutes.get('/contact', (req, res) => {
  if (req.session.user) {
    const {
      user: { names },
      home = '/'
    } = req.session;
    res.render('contact', { names, home });
  } else {
    res.render('contact', { names: 'Guest', home: '/' });
  }
});

usersroutes.get('/aboutus', (req, res) => {
  if (req.session.user) {
    const {
      user: { names },
      home = '/'
    } = req.session;
    res.render('aboutus', { names, home });
  } else {
    res.render('aboutus', { names: 'Guest', home: '/' });
  }
});

usersroutes.get('/resetpassword', (req, res) => {
  res.render('resetpassword', { names: 'Guest', home: '/' });
});

usersroutes.post('/resetpassword', async (req, res) => {
  try {
    const { username, oldpassword, newpassword } = req.body;
    const user = await User.findOne({ username });

    const { password } = user;

    if (password === oldpassword) {
      await User.updateOne({ username }, { password: newpassword });
      res.redirect(
        `/?message={"type": "success","msg":"Password successfully changed"}`
      );
    } else {
      res.redirect(
        `/?message={"type": "error","msg": "Confirm your login details"}`
      );
    }
  } catch (error) {
    // console.log(error)
  }
});

module.exports = usersroutes;
