require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("./config/firebaseAdmin");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require('./routes/userRoutes');
const recepieRoutes = require('./routes/recepieRoutes');
const app = express();
app.use('/users', userRoutes);     // ← כל הראוטים שקשורים ליוזרים
app.use('/recipes', recepieRoutes); // ← כל הראוטים של המתכונים

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get("/ping", (req, res) => {
  console.log("📡 Received /ping request");
  res.json({ message: "pong!" });
});



app.use("/api", authRoutes);

module.exports = app;



