const { Router } = require('express');
const { User, Sale } = require('../models');

const adminroutes = Router();

adminroutes.get('/saleslist', async (req, res) => {
  if (req.session.user) {
    const { names } = req.session.user;
    try {
      let sales = await Sale.find().populate('userID');
      if (req.query.ids) {
        sales = await Sale.find({ ids: req.query.ids }).populate('userID');
        res.render('salesmen', { sales, names });
      } else {
        res.render('salesmen', { sales, names });
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
      const supervisors = await Sale.find().populate('userID');
      const { names } = req.session.user;
      res.render('addsalesman', { names, supervisors });
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
    try {
      const {
        names,
        role,
        password,
        username,
        phone_number,
        date_of_birth,
        date_of_registration
      } = req.body;

      let userdetails = {
        names,
        role,
        password,
        username,
        phone_number,
        date_of_birth,
        date_of_registration
      };
      const user = new User(userdetails);

      await User.register(user, req.body.password, async (error, _theuser) => {
        if (error) throw error;

        try {
          const { ids, supervisor, number_of_working_days, email } = req.body;

          let salesdetails = {
            ids,
            supervisor,
            number_of_working_days,
            email
          };

          const { _id: userID } = _theuser;
          salesdetails = { ...salesdetails, userID };

          const salesexecutive = new Sale(salesdetails);

          await salesexecutive
            .save()
            .then(() => res.redirect('/admin/saleslist'));
        } catch (error) {
          // console.log('Could not create the sales executive');
          // throw error
        }
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
      let {
        rolesman: {
          _id: rolesmen_id,
          userID: { _id: user_id }
        }
      } = req.body;
      await User.deleteOne({ _id: user_id });
      await Sale.deleteOne({ _id: rolesmen_id });

      res.redirect('/admin/saleslist');
    } catch (error) {
      res.redirect('/admin/saleslist');
    }
  } else res.redirect('/');
});

adminroutes.post('/editsales', (req, res) => {
  if (req.session.user) {
    if (req.body) {
      const { rolesman } = req.body;
      req.session.rolesman = rolesman;
      res.redirect('/admin/editsales');
    } else {
      res.redirect('/admin/saleslist');
    }
  } else res.redirect('/');
});

adminroutes.get('/editsales', (req, res) => {
  if (req.session.user && req.session.rolesman) {
    const {
      user: { names },
      rolesman
    } = req.session;
    res.render('editsalesman', { names, rolesman });
    req.session.rolesman = undefined;
  } else {
    req.session.rolesman = undefined;
    res.redirect('/');
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

    let { role_id, user_id } = req.body;
    delete parameters.role_id;
    delete parameters.user_id;

    try {
      await User.updateOne({ _id: user_id }, parameters);
      await Sale.updateOne({ _id: role_id }, parameters);

      res.redirect('/admin/saleslist');
    } catch (error) {
      // console.log(error);
      res.redirect('/admin/saleslist');
    }
  } else res.redirect('/');
});

module.exports = adminroutes;
