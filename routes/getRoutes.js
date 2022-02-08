const express = require("express");

const router = express.Router();

router.post("/getFile", (req, res) => {
  res.send("dummy file sent");
});

module.exports = router;
