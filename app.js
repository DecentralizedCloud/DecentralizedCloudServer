require("dotenv").config();
const express = require("express");

const app = express();

const port = process.env.PORT || 3000;
console.log("HEllo")
app.listen(port, () => {
  console.log(`Up and running on :${port}!!`);
});