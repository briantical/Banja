const express = require("express");

let server = express();

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(3000, () => {
  console.log("Listening on PORT 3000");
});
