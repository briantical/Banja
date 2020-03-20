const { Router } = require("express");
const { User, Sale, Customer } = require("./../models");
const passport = require("passport");

const salesroutes = Router();

salesroutes.get("/customers", async (req, res) => {
  try {
    let customers = await Customer.find().populate("userID");
    if (req.query.ids) {
      customers = await Customer.find({ ids: req.query.ids }).populate(
        "userID"
      );
    }
    res.render("customers", { customers });
  } catch (error) {
    console.log(error);
    console.log("Could not retrieve the customers");
  }
});

salesroutes.post("/customers", async (req, res) => {
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
});

module.exports = salesroutes;
