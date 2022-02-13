const ipfs = require("ipfs-http-client");

const ipfsClient = ipfs.create({
  host: "localhost",
  port: "5002",
  protocol: "http",
});

module.exports = ipfsClient;
