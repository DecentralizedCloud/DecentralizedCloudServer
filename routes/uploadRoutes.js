const express = require("express");
const { uploadFile } = require("../controllers/uploadFile");

const router = express.Router();

router.post("/uploadToBucket", uploadFile);

module.exports = router;
