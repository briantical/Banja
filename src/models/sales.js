const mongoose = require("mongoose");
import { sale as saleschema } from "./../schemas";

let Sale = mongoose.model("User", saleschema);

export default Sale;
