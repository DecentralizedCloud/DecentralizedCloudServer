const ipfs = require("ipfs-http-client");

const ipfsClient = ipfs.create({
  host: "localhost",
  port: "5001",
  protocol: "http",
});

module.exports = ipfsClient;
