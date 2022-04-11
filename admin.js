const admin = require("firebase-admin");
var serviceAccount = require("./firebaseCredentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://decentralizedcloudservice-default-rtdb.firebaseio.com",
});

module.exports = admin;

//hello
//tfgyhuijfgtyhuj
//change done
