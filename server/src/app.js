require("dotenv").config();
const express = require("express");
const admin = require("./config/firebaseAdmin"); 

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
const authRoutes = require("./routes/authRoutes");

app.use("/api", authRoutes);

module.exports = app;
