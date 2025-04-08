require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("./config/firebaseAdmin");
const fridgeRoutes = require('./routes/fridgeRoutes'); // ✅ זה חסר!
const authRoutes = require("./routes/authRoutes");
const userRoutes = require('./routes/userRoutes');
const recepieRoutes = require('./routes/recepieRoutes');

const app = express();

// ✅ חובה! קודם להבין JSON:
app.use(express.json());

// ✅ ואז לאפשר CORS:
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ ואז רק להפעיל את כל הראוטים:
app.use('/users', userRoutes);
app.use('/recipes', recepieRoutes);
app.use("/api", authRoutes);
app.use('/fridge', fridgeRoutes);


// לבדיקה:
app.get("/ping", (req, res) => {
  console.log("📡 Received /ping request");
  res.json({ message: "pong!" });
});

module.exports = app;
