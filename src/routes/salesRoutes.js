const { Router } = require("express");
const { User, Customer } = require("./../models");

const salesroutes = Router();

salesroutes.get("/customerslist", async (req, res) => {
  if (req.session.user) {
    try {
      let customers = await Customer.find().populate("userID");

      if (req.query.names) {
        if (req.query.ids) {
          customers = await Customer.find({
            ids: req.query.ids
          }).populate("userID");
          res.render("customers", { customers, names: req.query.names });
        }
        res.render("customers", { customers, names: req.query.names });
      }
    } catch (error) {
      console.log(error);
      console.log("Could not retrieve the customers");
    }
  } else {
    res.redirect("/");
  }
});

salesroutes.get("/customers", (req, res) => {
  if (req.session.user) {
    res.render("addcustomer");
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
        date_of_registration
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
            referee_occupation
          } = req.body);

          let { _id: userID } = _theuser;
          customerdetails = { ...customerdetails, userID };

          let customer = new Customer(customerdetails);
          console.log("Created the customer");

          await customer.save().then(() => res.redirect("/sales/customers"));
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

module.exports = salesroutes;
