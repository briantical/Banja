const mongoose = require("mongoose");
import { user as userschema } from "./../schemas";

let User = mongoose.model("User", userschema);

export default User;
