const express = require("express");
const { uploadFile } = require("../controllers/uploadFile");

const router = express.Router();

router.post("/uploadToBucket", uploadFile);

router.post("/uploadToFolder", (req, res) => {
  res.send("in upload to folder");
});

module.exports = router;
