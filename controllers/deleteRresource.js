const express = require("express");
const admin = require("../admin");

exports.deleteResource =  (req, res) => {
    console.log(req.body);
    const { userId, apiKey, projectId, projectName, filePath } = req.body;
    const dbRef = admin
        .database().ref(`${userId}/projects/${projectId}/data/${filePath}`);
        dbRef.remove().then(() => {
            res.status(200).json({success:"Resource deleted successfully"})
        })
        .catch((error)=> {
            res.status(400).json(error)
        })
}