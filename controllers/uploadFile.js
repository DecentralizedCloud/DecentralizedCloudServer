const fs = require("fs");

const ipfs = require("../ipfsClient");

exports.uploadFile = async (req, res) => {
  //   console.log(req);
  const { fields, files } = req;
  console.log(fields);
  console.log(files);
  const hash = await addFile(fields.fileName, files.file.filepath);
  console.log(hash);
  res.status(200).json({ hash });
};

//Helpers

const addFile = async (fileName, filePath) => {
  const file = fs.readFileSync(filePath);
  const { cid } = await ipfs.add({ path: fileName, content: file });
  const fileHash = cid;
  return fileHash;
};
