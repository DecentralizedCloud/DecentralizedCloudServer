const fs = require("fs");
const admin = require("../admin");
const ipfs = require("../ipfsClient");

exports.uploadFile = async (req, res) => {
  //   console.log(req);
  const { fields, files } = req;
  console.log(fields);
  console.log(files.file);
  const hash = await addFile(fields.fileName, files.file.filepath);
  console.log(hash.toString());
  const { userId, apiKey, projectId, projectName, fileName, reference } =
    fields;
  const dbRefPath = `${userId}/projects/${projectId}/data/${reference}`;
  const dbRef = admin.database().ref(dbRefPath);
  const extension = files.file.originalFilename.split(".")[1];
  let obj = {
    createdOn: admin.database.ServerValue.TIMESTAMP,
    downloadURL: `https://ipfs.io/ipfs/${hash}`,
    extension,
    fileName: fileName.split(".")[0],
    hash: hash.toString(),
  };
  console.log(obj);
  await dbRef.child(fileName).set(obj);
  res.status(200).json({ obj });
};

//Helpers

const addFile = async (fileName, filePath) => {
  const file = fs.readFileSync(filePath);
  const { cid } = await ipfs.add({ path: fileName, content: file });
  const fileHash = cid;
  return fileHash;
};
