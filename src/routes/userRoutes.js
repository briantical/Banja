const { Router } = require('express');

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

module.exports = usersroutes;
