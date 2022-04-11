const ipfs = require("ipfs-api");

var ipfsAPI = ipfs("127.0.0.1", "5001", { protocol: "http" }); // leaving out the arguments will default to these values

module.exports = ipfsAPI;
