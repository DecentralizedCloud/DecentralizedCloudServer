const admin = require("../admin");
const formidable = require("formidable");

admin.database();
exports.validateJSONCredentials = async (req, res, next) => {
  const { userId, apiKey, projectId, projectName } = req.body;
  console.log(req.body);
  if (!userId || !apiKey || !projectId || !projectName) {
    return res.status(400).json({ error: "not initialized properly" });
  }

  const dbRef = admin.database().ref(userId).child("APIKey");
  const projref = admin
    .database()
    .ref(userId)
    .child("projects")
    .child(projectId)
    .child("projectName");

  try {
    let realAPIKey = await dbRef.once("value");
    let realProjectName = await projref.once("value");

    if (!realAPIKey.exists()) {
      console.log("NO API KEY FOUND!!");
      return res.json({ error: "Some error occured" });
    }

    if (!realProjectName.exists()) {
      console.log("NO PROJECT NAME FOUND!!");
      return res.json({ error: "Some error occured" });
    }

    realAPIKey = await realAPIKey.val();
    realProjectName = await realProjectName.val();

    if (realAPIKey !== apiKey) {
      console.log(realAPIKey);
      return res.status(403).json({ error: "Invalid API key" });
    }
    if (projectName !== realProjectName) {
      return res.status(404).json({ error: "Project not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }

  next();
};

exports.validateFormDataCredentials = async (req, res, next) => {
  let form = formidable({ multiples: true, keepExtensions: true });

  console.log("parsing form");
  let reqCopy = Object.create(req);
  // console.log(reqCopy);
  form.parse(req, async (err, fields, files) => {
    console.log("form parsed");
    const { userId, apiKey, projectId, projectName } = fields;

    if (!userId || !apiKey || !projectId || !projectName) {
      return res.status(400).json({ error: "not initialized properly" });
    }

    const dbRef = admin.database().ref(userId).child("APIKey");
    const projref = admin
      .database()
      .ref(userId)
      .child("projects")
      .child(projectId)
      .child("projectName");

    try {
      let realAPIKey = await dbRef.once("value");
      let realProjectName = await projref.once("value");

      if (!realAPIKey.exists()) {
        console.log("NO API KEY FOUND!!");
        return res.json({ error: "Some error occured" });
      }

      if (!realProjectName.exists()) {
        console.log("NO PROJECT NAME FOUND!!");
        return res.json({ error: "Some error occured" });
      }

      realAPIKey = await realAPIKey.val();
      realProjectName = await realProjectName.val();

      if (realAPIKey !== apiKey) {
        console.log(realAPIKey);
        return res.status(403).json({ error: "Invalid API key" });
      }
      if (projectName !== realProjectName) {
        return res.status(404).json({ error: "Project not found" });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err });
    }
    console.log("calling next()");
    req.fields = fields;
    req.files = files;
    next();
  });
};
