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
        date_of_registration
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
            email
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

module.exports = adminroutes;
