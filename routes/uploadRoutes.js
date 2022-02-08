const express = require("express");

const router = express.Router();

router.post("/uploadToBucket", (req, res) => {
  res.send("in upload to bucket");
});

router.post("/uploadToFolder", (req, res) => {
  res.send("in upload to folder");
});

module.exports = router;
