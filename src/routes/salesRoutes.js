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
      let customers = await Customer.find({ supervisor: names }).populate(
        'user'
      );
      if (req.query.customerID) {
        customers = await Customer.find({
          customerID: req.query.customerID
        }).populate('user');

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
    const role = 'customers';
    try {
      const { names, username, phoneNumber, dateOfBirth } = req.body;
      const dateOfRegistration = new Date();
      const userdetails = {
        names,
        role,
        username,
        phoneNumber,
        dateOfBirth,
        dateOfRegistration
      };
      const newuser = new User(userdetails);
      const password = 'notrequired';
      const { names: supervisor } = req.session.user;

      await User.register(newuser, password, async (error, _theuser) => {
        if (error) throw error;
        const {
          NIN,
          nationality,
          maritalStatus,
          documents,
          vehicleType,
          downPaymnet,
          stageName,
          lcOne,
          lcThree,
          refereeName,
          refereeDob,
          refereeContact,
          refereeOccupation
        } = req.body;

        const customerID = `${names
          .split(' ')
          .slice(0, 1)
          .join('')}${new Date().getFullYear()}${stageName.slice(0, 3)}`;
        const lastPayment = new Date();

        let customerdetails = {
          customerID,
          NIN,
          nationality,
          maritalStatus,
          documents,
          vehicleType,
          downPaymnet,
          lastPayment,
          stageName,
          supervisor,
          lcOne,
          lcThree,
          refereeName,
          refereeDob,
          refereeContact,
          refereeOccupation
        };
        const { _id: user } = _theuser;
        customerdetails = { ...customerdetails, user };

        const customer = new Customer(customerdetails);

        await customer.save();
        res.redirect('/sales/customerslist');
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
          _id: rolesmenID,
          user: { _id: userID }
        }
      } = req.body;
      await User.deleteOne({ _id: userID });
      await Customer.deleteOne({ _id: rolesmenID });

      res.redirect('/sales/customerslist');
    } catch (error) {
      res.redirect('/sales/customerslist');
    }
  } else res.redirect('/');
});

salesroutes.get('/editcustomer', (req, res) => {
  if (req.session.user) {
    const { rolesman } = req.query;
    const {
      user: { names },
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

    const { roleID, userID } = req.body;
    delete parameters.roleID;
    delete parameters.userID;

    try {
      await User.updateOne({ _id: userID }, parameters);
      await Customer.updateOne({ _id: roleID }, parameters);

      res.redirect('/sales/customerslist');
    } catch (error) {
      // console.log(error);
      res.redirect('/sales/customerslist');
    }
  } else res.redirect('/');
});

module.exports = salesroutes;
