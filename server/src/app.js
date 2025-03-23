const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json");

const app = express();

app.use(express.json());

app.get("/test-firebase", async (req, res) => {
  try {
    const users = await admin.auth().listUsers();
    res.json({ message: "Firebase is working!", usersCount: users.users.length });
  } catch (error) {
    res.status(500).json({ error: "Firebase error", details: error.message });
  }
});

module.exports = app;
