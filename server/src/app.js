require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("./config/firebaseAdmin");
const fridgeRoutes = require('./routes/fridgeRoutes'); // ✅ זה חסר!
const authRoutes = require("./routes/authRoutes");
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');


const app = express();

app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
//app.use("/api", authRoutes);
app.use('/fridge', fridgeRoutes);

// // // לבדיקה:
// // app.get("/ping", (req, res) => {
// //   console.log("📡 Received /ping request");
// //   res.json({ message: "pong!" });
// // });


module.exports = app;
