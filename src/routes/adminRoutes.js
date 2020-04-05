const { Router } = require("express");
const { User, Sale } = require("./../models");

const adminroutes = Router();

adminroutes.get("/saleslist", async (req, res) => {
  if (req.session.user) {
    let { names } = req.session.user;
    try {
      let sales = await Sale.find().populate("userID");
      if (req.query.ids) {
        sales = await Sale.find({ ids: req.query.ids }).populate("userID");
      }
      res.render("salesmen", { sales, names });
    } catch (error) {
      console.log("Could not retrieve the sales executive");
    }
  } else {
    res.redirect("/");
  }
});

adminroutes.get("/sales", (req, res) => {
  if (req.session.user) {
    let { names } = req.session.user;
    res.render("addsalesman", { names });
  } else {
    res.redirect("/");
  }
});

adminroutes.post("/sales", async (req, res) => {
  if (req.session.user) {
    try {
      let userdetails = ({
        names,
        role,
        password,
        username,
        phone_number,
        date_of_birth,
        date_of_registration,
      } = req.body);
      let user = new User(userdetails);

      await User.register(user, req.body.password, async (error, _theuser) => {
        if (error) throw error;
        console.log("Created the user");

        try {
          let salesdetails = ({
            ids,
            supervisor,
            number_of_working_days,
            email,
          } = req.body);

          let { _id: userID } = _theuser;
          salesdetails = { ...salesdetails, userID };

          let salesexecutive = new Sale(salesdetails);
          console.log("Created the sales executive");

          await salesexecutive
            .save()
            .then(() => res.redirect("/admin/saleslist"));
        } catch (error) {
          console.log("Could not create the sales executive");
        }
      });
    } catch (error) {
      console.log("Could not create user");
    }
  } else {
    res.redirect("/");
  }
});

adminroutes.get("/deletesales", async (req, res) => {
  if (req.session.user) {
    try {
      let { user_id, rolesmen_id } = req.query;
      await User.deleteOne({ _id: user_id });
      await Sale.deleteOne({ _id: rolesmen_id });

      res.redirect("/admin/saleslist");
    } catch (error) {
      res.redirect("/admin/saleslist");
    }
  } else res.redirect("/");
});

adminroutes.post("/editsales", (req, res) => {
  if (req.session.user) {
    if (req.body) {
      let { rolesman } = req.body;
      req.session.rolesman = rolesman;
      res.redirect("/admin/editsales");
    } else {
      res.redirect("/admin/saleslist");
    }
  } else res.redirect("/");
});

adminroutes.get("/editsales", (req, res) => {
  if (req.session.user && req.session.rolesman) {
    let {
      user: { names },
      rolesman,
    } = req.session;
    res.render("editsalesman", { names, rolesman });
  } else {
    res.redirect("/");
  }
});

adminroutes.post("/editsalesman", async (req, res) => {
  if (req.session.user) {
    try {
      let user = ({
        names,
        role,
        password,
        username,
        phone_number,
        date_of_birth,
        date_of_registration,
      } = req.body);

      await User.updateOne({ _id: userID }, user);

      let sales = ({
        ids,
        supervisor,
        number_of_working_days,
        email,
      } = req.body);

      await Sale.updateOne({ _id: salesID }, sales);
    } catch (error) {
      res.redirect("/admin/saleslist");
    }
  } else res.redirect("/");
});

module.exports = adminroutes;
