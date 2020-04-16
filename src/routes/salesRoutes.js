const { Router } = require('express');
const { User, Customer } = require('../models');

const salesroutes = Router();

salesroutes.get('/customerslist', async (req, res) => {
  if (req.session.user) {
    const {
      user: { names },
      home
    } = req.session;
    try {
      let customers = await Customer.find().populate('userID');
      if (req.query.customerID) {
        customers = await Customer.find({
          customerID: req.query.customerID
        }).populate('userID');

        res.render('customers', { customers, names, home });
      } else {
        res.render('customers', { customers, names, home });
      }
    } catch (error) {
      // console.log('Could not retrieve the customers');
    }
  } else {
    res.redirect('/');
  }
});

salesroutes.get('/customers', (req, res) => {
  if (req.session.user) {
    const {
      user: { names },
      home
    } = req.session;
    res.render('addcustomer', { names, home });
  } else {
    res.redirect('/');
  }
});

salesroutes.post('/customers', async (req, res) => {
  if (req.session.user) {
    try {
      const {
        names,
        role,
        username,
        password,
        phone_number,
        date_of_birth,
        date_of_registration
      } = req.body;

      const userdetails = {
        names,
        role,
        username,
        password,
        phone_number,
        date_of_birth,
        date_of_registration
      };
      const user = new User(userdetails);

      await User.register(user, req.body.password, async (error, _theuser) => {
        if (error) throw error;
        try {
          const {
            customerID,
            NIN,
            nationality,
            marital_status,
            documents,
            vehicle_type,
            down_paymnet,
            stage_name,
            lc_one,
            lc_three,
            referee_name,
            referee_dob,
            referee_contact,
            referee_occupation
          } = req.body;

          let customerdetails = {
            customerID,
            NIN,
            nationality,
            marital_status,
            documents,
            vehicle_type,
            down_paymnet,
            stage_name,
            lc_one,
            lc_three,
            referee_name,
            referee_dob,
            referee_contact,
            referee_occupation
          };
          const { _id: userID } = _theuser;
          customerdetails = { ...customerdetails, userID };

          const customer = new Customer(customerdetails);

          await customer.save();
          res.redirect('/sales/customerslist');
        } catch (error) {
          // console.log('Could not create the customer');
        }
      });
    } catch (error) {
      // console.log('Could not create user');
    }
  } else {
    res.redirect('/');
  }
});

salesroutes.get('/deletecustomer', async (req, res) => {
  if (req.session.user) {
    try {
      const {
        rolesman: {
          _id: rolesmen_id,
          userID: { _id: user_id }
        }
      } = req.body;
      await User.deleteOne({ _id: user_id });
      await Customer.deleteOne({ _id: rolesmen_id });

      res.redirect('/sales/customerslist');
    } catch (error) {
      res.redirect('/sales/customerslist');
    }
  } else res.redirect('/');
});

salesroutes.post('/editcustomer', (req, res) => {
  if (req.session.user) {
    if (req.body) {
      const { rolesman } = req.body;
      req.session.rolesman = rolesman;
      res.redirect('/sales/editcustomer');
    } else {
      res.redirect('/sales/customerslist');
    }
  } else res.redirect('/');
});

salesroutes.get('/editcustomer', (req, res) => {
  if (req.session.user && req.session.rolesman) {
    const {
      user: { names },
      rolesman,
      home
    } = req.session;
    res.render('editcustomer', { names, rolesman, home });
  } else {
    res.redirect('/');
  }
});

salesroutes.post('/editcustomers', async (req, res) => {
  if (req.session.user) {
    const parameters = req.body;

    Object.keys(parameters).forEach((key) => {
      if (parameters[key] === '') {
        delete parameters[key];
      }
    });

    const { role_id, user_id } = req.body;
    delete parameters.role_id;
    delete parameters.user_id;

    try {
      await User.updateOne({ _id: user_id }, parameters);
      await Customer.updateOne({ _id: role_id }, parameters);

      res.redirect('/sales/customerslist');
    } catch (error) {
      // console.log(error);
      res.redirect('/sales/customerslist');
    }
  } else res.redirect('/');
});

module.exports = salesroutes;
