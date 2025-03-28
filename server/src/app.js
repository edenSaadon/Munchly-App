require("dotenv").config();
const express = require("express");
const admin = require("./config/firebaseAdmin");

const app = express();
app.use(express.json());

// בריאות / פינג
app.get("/test-firebase", async (req, res) => {
  try {
    const users = await admin.auth().listUsers();
    res.json({ message: "Firebase Auth is working!", usersCount: users.users.length });
  } catch (error) {
    res.status(500).json({ error: "Firebase error", details: error.message });
  }
});

// בדיקת Firestore עם כתיבה ממשית
app.get("/test-firestore", async (req, res) => {
  try {
    const docRef = admin.firestore().collection("testCollection").doc("test");
    
    // כתיבה ל־Firestore
    await docRef.set({ message: "Hello Firestore!" });

    // קריאה חזרה מה־Firestore
    const snapshot = await docRef.get();
    const data = snapshot.data();

    res.json({ message: "Firestore is working!", data });
  } catch (error) {
    res.status(500).json({ error: "Firestore error", details: error.message });
  }
});

const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

module.exports = app;
