const express = require("express");
const admin = require("../admin");
var ipfsAPI = require("../ipfsAPI");
const crypto = require("crypto");
const router = express.Router();
const fs = require("fs");

/*
 * Request to retrive file from IPFS
 */
router.post("/getFile", async (req, res) => {
  console.log(req.body);
  const { userId, apiKey, projectId, projectName, reference } = req.body;

  const dbRef = admin
    .database()
    .ref(`${userId}/projects/${projectId}/data/${reference}`);
  let data;
  try {
    data = await (await dbRef.get()).val();
  } catch (err) {
    console.log(err);
  }

  const { hash, mimetype } = data;
  ipfsAPI.cat(hash, (err, d) => {
    if (err || !d) {
      console.log(err);
      return res.status(400).json({ error: "Some error occured" });
    }
    res.set("Content-Type", mimetype);

    // decryption starts
    const algorithm = "aes-256-cbc"; // Choosing Algorithm
    const securityKey = Buffer.concat([Buffer.from(projectId, "base64")], 32); // initVector and securityKey will be used to encrypt data
    const initVector = Buffer.concat([Buffer.from(apiKey, "base64")], 16);
    let encryptedText = Buffer.from(d.toString(), "base64");
    // console.log("after buffer from");
    // console.log(encryptedText);
    const decipher = crypto.createDecipheriv(
      algorithm,
      securityKey,
      initVector
    );
    let decrypted = decipher.update(encryptedText, "base64", "base64");
    decrypted += decipher.final("base64");
    // decryption ends
    // console.log(decrypted);
    res.send(Buffer.from(decrypted, "base64"));
    // res.send(decrypted);
  });
});

router.post("/metadata", async (req, res) => {
  console.log(req.body);
  const { userId, apiKey, projectId, projectName, reference } = req.body;

  const dbRef = admin
    .database()
    .ref(`${userId}/projects/${projectId}/data/${reference}`);

  let data = await (await dbRef.get()).val();

  console.log(data);

  return res.status(200).json(data);
});

module.exports = router;
