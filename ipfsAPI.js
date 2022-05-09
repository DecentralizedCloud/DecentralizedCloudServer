const ipfs = require("ipfs-api");

var ipfsAPI = ipfs("20.213.239.201", "5001", { protocol: "http" }); // leaving out the arguments will default to these values

module.exports = ipfsAPI;
