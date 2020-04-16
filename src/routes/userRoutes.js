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
    await user
      .changePassword(oldpassword, newpassword)
      .then(() => {
        res.redirect(
          '/?message={"type": "success","msg": "Password successfully changed"}'
        );
      })
      .catch((error) => {
        const { message } = error;
        res.redirect(`/?message={"type": "error","msg":"${message}"}`);
      });
  } catch (error) {
    res.redirect(
      '/?message={"type": "success","msg": "Password successfully changed"}'
    );
  }
});

module.exports = usersroutes;
