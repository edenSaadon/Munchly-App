// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const admin = require("./config/firebaseAdmin");
// const fridgeRoutes = require('./routes/fridgeRoutes'); // ✅ זה חסר!
// //const authRoutes = require("./routes/authRoutes");
// const userRoutes = require('./routes/userRoutes');
// const recipeRoutes = require('./routes/recipeRoutes');


// const app = express();

// app.use(express.json());

// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use('/users', userRoutes);
// app.use('/recipes', recipeRoutes);
// //app.use("/api", authRoutes);
// app.use('/fridge', fridgeRoutes);
// app.use('/generate', recipeRoutes);


// // // // לבדיקה:
// // // app.get("/ping", (req, res) => {
// // //   console.log("📡 Received /ping request");
// // //   res.json({ message: "pong!" });
// // // });


// module.exports = app;


// =======================================================================
// File: app.js
// Purpose:
// This is the main Express application setup for the Munchly backend.
// It initializes middleware, loads route handlers, and prepares the app
// to be started from the index.js file.
//
// Routes:
//   - /users     → user-related endpoints (profile, preferences, likes)
//   - /recipes   → recipe-related endpoints (generate, save, fetch)
//   - /fridge    → image upload and item detection
// =======================================================================

require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const cors = require("cors");
const admin = require("./config/firebaseAdmin"); // Firebase Admin SDK init

// Import route handlers
const fridgeRoutes = require('./routes/fridgeRoutes'); // Handles /fridge routes
const userRoutes = require('./routes/userRoutes');     // Handles /users routes
const recipeRoutes = require('./routes/recipeRoutes'); // Handles /recipes and /generate routes

const app = express(); // Create Express application instance

app.use(express.json()); // Parse incoming requests with JSON payloads

// Enable CORS for all origins and methods
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Register route modules
app.use('/users', userRoutes);       // Mount user-related routes
app.use('/recipes', recipeRoutes);   // Mount recipe-related routes
app.use('/fridge', fridgeRoutes);    // Mount fridge scan routes
app.use('/generate', recipeRoutes);  // Alias for generate/ai route



module.exports = app; // Export the configured Express app
