const { Router } = require('express');
const { User, Sale } = require('../models');

const adminroutes = Router();

adminroutes.get('/saleslist', async (req, res) => {
  if (req.session.user) {
    const {
      user: { names },
      home
    } = req.session;
    try {
      let sales = await Sale.find().populate('user');
      if (req.query.ids) {
        sales = await Sale.find({ ids: req.query.ids }).populate('user');
        res.render('salesmen', { sales, names, home });
      } else {
        res.render('salesmen', { sales, names, home });
      }
    } catch (error) {
      // console.log('Could not retrieve the sales executive');
      // throw error;
    }
  } else {
    res.redirect('/');
  }
});

adminroutes.get('/sales', async (req, res) => {
  try {
    if (req.session.user) {
      const supervisors = await Sale.find().populate('user');
      const {
        user: { names },
        home
      } = req.session;
      res.render('addsalesman', { names, supervisors, home });
    } else {
      res.redirect('/');
    }
  } catch (error) {
    // console.log(error);
    // throw error
  }
});

adminroutes.post('/sales', async (req, res) => {
  if (req.session.user) {
    const role = 'sales';
    const dateOfRegistration = new Date();

    try {
      const { names, username, phoneNumber, dateOfBirth } = req.body;

      const userdetails = {
        names,
        role,
        username,
        phoneNumber,
        dateOfBirth,
        dateOfRegistration
      };
      const newuser = new User(userdetails);
      const password = 'banjasupervisor';

      await User.register(newuser, password, async (error, _theuser) => {
        if (error) throw error;
        const { ids, supervisor, numberOfWorkingDays, email } = req.body;

        let salesdetails = {
          ids,
          supervisor,
          numberOfWorkingDays,
          email
        };

        const { _id: user } = _theuser;
        salesdetails = { ...salesdetails, user };

        const salesexecutive = new Sale(salesdetails);

        await salesexecutive
          .save()
          .then(() => res.redirect('/admin/saleslist'));
      });
    } catch (error) {
      // console.log('Could not create user');
      // throw error
    }
  } else {
    res.redirect('/');
  }
});

adminroutes.get('/deletesales', async (req, res) => {
  if (req.session.user) {
    try {
      const {
        rolesman: {
          _id: rolesmenID,
          user: { _id: userID }
        }
      } = req.body;
      await User.deleteOne({ _id: userID });
      await Sale.deleteOne({ _id: rolesmenID });

      res.redirect('/admin/saleslist');
    } catch (error) {
      res.redirect('/admin/saleslist');
    }
  } else res.redirect('/');
});

adminroutes.get('/editsales', async (req, res) => {
  try {
    if (req.session.user) {
      const { rolesman } = req.query;
      const {
        user: { names },
        home
      } = req.session;
      const supervisors = await Sale.find().populate('user');
      res.render('editsalesman', {
        names,
        rolesman,
        home,
        supervisors
      });
    } else {
      res.redirect('/');
    }
  } catch (error) {
    res.redirect('/admin/saleslist');
  }
});

adminroutes.post('/editsalesman', async (req, res) => {
  if (req.session.user) {
    const parameters = req.body;

    Object.keys(parameters).forEach((key) => {
      if (parameters[key] === '') {
        delete parameters[key];
      }
    });

    const { roleID, userID } = req.body;
    delete parameters.roleID;
    delete parameters.userID;

    try {
      await User.updateOne({ _id: userID }, parameters);
      await Sale.updateOne({ _id: roleID }, parameters);

      res.redirect('/admin/saleslist');
    } catch (error) {
      // console.log(error);
      res.redirect('/admin/saleslist');
    }
  } else res.redirect('/');
});

module.exports = adminroutes;
