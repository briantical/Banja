const mongoose = require("mongoose");
import { customer as customerschema } from "./../schemas";

let Customer = mongoose.model("User", customerschema);

export default Customer;
