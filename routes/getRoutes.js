const express = require("express");
const admin = require("../admin");
var ipfsAPI = require("../ipfsAPI");
const crypto = require("crypto");
const router = express.Router();
const fs = require("fs");

/*
 * Request to retrive file from IPFS
 */
router.get("/getFile", async (req, res) => {
  console.log(req.body);
  const { userId, apiKey, projectId, projectName, filePath } = req.body;

  const dbRef = admin
    .database()
    .ref(`${userId}/projects/${projectId}/data/${filePath}`);

  let data = await (await dbRef.get()).val();

  console.log(data);

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
    // let encryptedText = d;
    const decipher = crypto.createDecipheriv(
      algorithm,
      securityKey,
      initVector
    );
    let decrypted = decipher.update(encryptedText, "base64", "base64");

    decrypted += decipher.final("base64");
    // fs.writeFileSync("temp.txt", decrypted);
    // decryption ends
    res.send(decrypted);
  });
});

router.get("/metadata", async (req, res) => {
  console.log(req.body);
  const { userId, apiKey, projectId, projectName, filePath } = req.body;

  const dbRef = admin
    .database()
    .ref(`${userId}/projects/${projectId}/data/${filePath}`);

  let data = await (await dbRef.get()).val();

  console.log(data);

  return res.status(200).json(data);
});

module.exports = router;
