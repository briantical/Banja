const { Router } = require("express");
const { User, Customer } = require("./../models");

const salesroutes = Router();

salesroutes.get("/customerslist", async (req, res) => {
  if (req.session.user) {
    let { names } = req.session.user;
    try {
      let customers = await Customer.find().populate("userID");
      if (req.query.customerID) {
        customers = await Customer.find({
          customerID: req.query.customerID,
        }).populate("userID");

        res.render("customers", { customers, names });
      } else {
        res.render("customers", { customers, names });
      }
    } catch (error) {
      console.log("Could not retrieve the customers");
    }
  } else {
    res.redirect("/");
  }
});

salesroutes.get("/customers", (req, res) => {
  if (req.session.user) {
    let { names } = req.session.user;
    res.render("addcustomer", { names });
  } else {
    res.redirect("/");
  }
});

salesroutes.post("/customers", async (req, res) => {
  if (req.session.user) {
    try {
      let userdetails = ({
        names,
        role,
        username,
        password,
        phone_number,
        date_of_birth,
        date_of_registration,
      } = req.body);
      let user = new User(userdetails);

      await User.register(user, req.body.password, async (error, _theuser) => {
        console.log("Created the user");
        if (error) throw error;
        try {
          let customerdetails = ({
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
            referee_occupation,
          } = req.body);

          let { _id: userID } = _theuser;
          customerdetails = { ...customerdetails, userID };

          let customer = new Customer(customerdetails);
          console.log("Created the customer");

          await customer.save();
          res.redirect("/sales/customerslist");
        } catch (error) {
          console.log("Could not create the customer");
        }
      });
    } catch (error) {
      console.log("Could not create user");
    }
  } else {
    res.redirect("/");
  }
});

salesroutes.get("/deletecustomer", async (req, res) => {
  if (req.session.user) {
    try {
      let {
        rolesman: {
          _id: rolesmen_id,
          userID: { _id: user_id },
        },
      } = req.body;
      await User.deleteOne({ _id: user_id });
      await Customer.deleteOne({ _id: rolesmen_id });

      res.redirect("/sales/customerslist");
    } catch (error) {
      res.redirect("/sales/customerslist");
    }
  } else res.redirect("/");
});

salesroutes.post("/editcustomer", (req, res) => {
  if (req.session.user) {
    if (req.body) {
      let { rolesman } = req.body;
      req.session.rolesman = rolesman;
      res.redirect("/sales/editcustomer");
    } else {
      res.redirect("/sales/customerslist");
    }
  } else res.redirect("/");
});

salesroutes.get("/editcustomer", (req, res) => {
  if (req.session.user && req.session.rolesman) {
    let {
      user: { names },
      rolesman,
    } = req.session;
    res.render("editcustomer", { names, rolesman });
  } else {
    res.redirect("/");
  }
});

salesroutes.post("/editcustomers", async (req, res) => {
  if (req.session.user) {
    let parameters = req.body;

    for (const parameter in parameters) {
      if (parameters.hasOwnProperty(parameter)) {
        if (parameters[parameter] == "") {
          delete parameters[parameter];
        }
      }
    }
    let { role_id, user_id } = req.body;
    delete parameters.role_id;
    delete parameters.user_id;

    try {
      await User.updateOne({ _id: user_id }, parameters);
      await Customer.updateOne({ _id: role_id }, parameters);

      res.redirect("/sales/customerslist");
    } catch (error) {
      console.log(error);
      res.redirect("/sales/customerslist");
    }
  } else res.redirect("/");
});

module.exports = salesroutes;
