const express = require("express");
const admin = require("../admin");
var ipfsAPI = require("../ipfsAPI");
const router = express.Router();

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
  ipfsAPI.cat(hash, (err, data) => {
    if (err || !data)
      return res.status(400).json({ error: "Some error occured" });

    res.set("Content-Type", mimetype);
    res.send(data);
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
