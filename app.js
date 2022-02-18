require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

const uploadRouter = require("./routes/uploadRoutes");
const getRouter = require("./routes/getRoutes");
const {
  validateJSONCredentials,
  validateFormDataCredentials,
} = require("./middlewares/validateRequest");

//sets port using env if available
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/upload", validateFormDataCredentials, uploadRouter);

app.use("/get", validateJSONCredentials, getRouter);

app.listen(port, () => {
  console.log(`Up and running on :${port}!!`);
});
