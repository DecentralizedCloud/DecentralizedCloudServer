const ipfs = require("ipfs-http-client");

const ipfsClient = ipfs.create({
	host: "20.213.239.201",
	port: "5001",
	protocol: "http",
});

module.exports = ipfsClient;
