require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("./config/firebaseAdmin");
const fridgeRoutes = require('./routes/fridgeRoutes'); // ✅ זה חסר!
//const authRoutes = require("./routes/authRoutes");
const userRoutes = require('./routes/userRoutes');
const recepieRoutes = require('./routes/recepieRoutes');


const app = express();

app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/users', userRoutes);
app.use('/recipes', recepieRoutes);
//app.use("/api", authRoutes);
app.use('/fridge', fridgeRoutes);




module.exports = app;
