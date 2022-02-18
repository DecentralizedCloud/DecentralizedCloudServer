const ipfs = require("ipfs-api");

var ipfsAPI = ipfs("localhost", "5001", { protocol: "http" }); // leaving out the arguments will default to these values

module.exports = ipfsAPI;
