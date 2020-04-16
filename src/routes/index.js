const { Router } = require('express');

const approutes = Router();

const adminroutes = require('./adminRoutes');
const loginroutes = require('./loginRoutes');
const salesroutes = require('./salesRoutes');
const userroutes = require('./userRoutes');

approutes.use('/user', userroutes);
approutes.use('/login', loginroutes);
approutes.use('/sales', salesroutes);
approutes.use('/admin', adminroutes);

approutes.get('/', (req, res) => {
  if (req.query.message) {
    const { message } = req.query;
    res.render('index', { message });
  } else {
    res.render('index');
  }
});

approutes.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        // console.log('Failed to destroy session');
        throw err;
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = approutes;
