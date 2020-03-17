const { Router } = require("express");
const { User, Sale, Customer } = require("./../models");

const api = Router();

api.get("/", (req, res) => {
  res.render("index");
});

api.post("/signin", async (req, res) => {
  try {
    let { username } = req.body;
    let user = await User.findOne({ username: username });
    let { role } = user;

    if (role.includes("admin")) {
      res.redirect("/saleslist");
    } else if (role.includes("sales")) {
      res.redirect("/customerslist");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

api.get("/register", (req, res) => {
  res.render("register");
});

api.get("/saleslist", async (req, res) => {
  try {
    let sales = await Sale.find().populate("userID");
    if (req.query.ids) {
      sales = await Sale.find({ ids: req.query.ids }).populate("userID");
    }
    res.render("saleslist", { sales });
  } catch (error) {
    console.log(error);
    console.log("Could not retrieve the sales executive");
  }
});

api.get("/customerslist", async (req, res) => {
  try {
    let customers = await Customer.find();
    if (req.query.ids) {
      customers = await Customer.find({ ids: req.query.ids }).populate(
        "userID"
      );
    }
    res.render("customerslist", { customers }).populate("userID");
  } catch (error) {
    console.log("Could not retrieve the customers");
  }
});

api.post("/register_sales", async (req, res) => {
  try {
    let userdetails = ({
      names,
      role,
      password,
      username,
      phone_number,
      date_of_birth,
      date_of_registration
    } = req.body);
    let user = new User(userdetails);

    await user.save().then(async _theuser => {
      console.log("Created the user");
      try {
        let salesdetails = ({
          ids,
          supervisor,
          number_of_working_days,
          email
        } = req.body);

        let { _id: userID } = _theuser;
        salesdetails = { ...salesdetails, userID };

        let salesexecutive = new Sale(salesdetails);
        console.log("Created the sales executive");

        await salesexecutive.save().then(() => res.redirect("/saleslist"));
      } catch (error) {
        console.log("Could not create the sales executive");
      }
    });
  } catch (error) {
    console.log("Could not create user");
  }
});

api.post("/register_customer", async (req, res) => {
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

    await user.save().then(async _theuser => {
      console.log("Created the user");
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

        await customer.save().then(() => res.redirect("/customerslist"));
      } catch (error) {
        console.log("Could not create the customer");
      }
    });
  } catch (error) {
    console.log("Could not create user");
  }
});

api.get("/resetpassword", (req, res) => {
  res.render("resetpassword");
});

api.get("*", (req, res) => {
  res.render("index");
});

module.exports = api;
