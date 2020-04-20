const multer = require('multer');
const path = require('path');
const { Router } = require('express');
const { User, Customer } = require('../models');

const salesroutes = Router();

// Define a storage location for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, './../documents'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.originalname.slice(0, 10)}-${uniqueSuffix}`);
  }
});
const upload = multer({ storage });

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
      } else if (req.query.newuser) {
        const { newuser } = req.query;
        res.render('customers', { customers, names, home, newuser });
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

salesroutes.post(
  '/customers',
  upload.array('verifiedDocs', 12),
  async (req, res) => {
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

          const { files } = req;
          let verifiedDocs = [];

          files.forEach((file) => {
            verifiedDocs = [...verifiedDocs, file.filename];
          });

          console.log(verifiedDocs);

          const {
            NIN,
            nationality,
            maritalStatus,
            documents,
            vehicleType,
            downPayment,
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
            verifiedDocs,
            vehicleType,
            downPayment: parseInt(downPayment, 10),
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
          res.redirect(`/sales/customerslist?newuser=${customerID}`);
        });
      } catch (error) {
        // console.log('Could not create user');
      }
    } else {
      res.redirect('/');
    }
  }
);

salesroutes.post('/deletecustomer', async (req, res) => {
  if (req.session.user) {
    try {
      const rolesman = JSON.parse(req.body.rolesman);
      const {
        _id: rolesmenID,
        user: { _id: userID }
      } = rolesman;

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
