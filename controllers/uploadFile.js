const fs = require("fs");
const crypto = require("crypto");
const admin = require("../admin");
const ipfs = require("../ipfsClient");

exports.uploadFile = async (req, res) => {
  //   console.log(req);
  const { fields, files } = req; 
  console.log(fields);
  console.log(files.file);
  const hash = await addFile(fields.fileName, files.file.filepath, fields.projectId, fields.apiKey);
  console.log(hash.toString());
  const { userId, apiKey, projectId, projectName, fileName, reference } =
    fields;
  const dbRefPath = `${userId}/projects/${projectId}/data/${reference}`;
  const dbRef = admin.database().ref(dbRefPath);
  const extension = files.file.originalFilename.split(".")[1];
  const mimetype = files.file.mimetype;
  let obj = {
    createdOn: admin.database.ServerValue.TIMESTAMP,
    downloadURL: `https://ipfs.io/ipfs/${hash}`,
    extension,
    fileName: fileName.split(".")[0],
    hash: hash.toString(),
    mimetype,
  };
  console.log(obj);
  await dbRef.child(fileName).set(obj);
  res.status(200).json({ obj });
};

//Helpers

const addFile = async (fileName, filePath, projectId, apiKey) => {
  const file = fs.readFileSync(filePath);
  // Encryption Starts
  const algorithm = "aes-256-gcm"; // Choosing Algorithm
  const initVector = Buffer.from(apiKey); // initVector and securityKey will be used to encrypt data
  const securityKey = Buffer.from(projectId);
  const cipher = crypto.createCipheriv(algorithm, securityKey, initVector); // initialize cipher
  let encryptedFile = cipher.update(file, "utf-8", "hex"); // encrypt the file 
  encryptedFile += cipher.final("hex"); 
  // Encryption Ends

  const { cid } = await ipfs.add({ path: fileName, content: encryptedFile });
  return cid;
};
