// require("dotenv").config();
// const express = require("express");
// const admin = require("./config/firebaseAdmin");
// const vision = require("@google-cloud/vision");

// const app = express();
// app.use(express.json());


// // 🔹 Health check - Firebase Auth
// app.get("/test-firebase", async (req, res) => {
//   try {
//     const users = await admin.auth().listUsers();
//     res.json({ message: "Firebase Auth is working!", usersCount: users.users.length });
//   } catch (error) {
//     res.status(500).json({ error: "Firebase error", details: error.message });
//   }
// });

// // 🔹 Firestore - Write & Read test
// app.get("/test-firestore", async (req, res) => {
//   try {
//     const docRef = admin.firestore().collection("testCollection").doc("test");
//     await docRef.set({ message: "Hello Firestore!" });

//     const snapshot = await docRef.get();
//     const data = snapshot.data();

//     res.json({ message: "Firestore is working!", data });
//   } catch (error) {
//     res.status(500).json({ error: "Firestore error", details: error.message });
//   }
// });

// // 🔹 Vision API test - Label detection on public image
// const visionClient = new vision.ImageAnnotatorClient();
// app.get("/test-vision", async (req, res) => {
//   try {
//     const [result] = await visionClient.labelDetection({
//       image: {
//         source: {
//           imageUri: "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png"
//         }
//       }
//     });

//     const labels = result.labelAnnotations.map(label => label.description);
//     res.json({ message: "Vision API is working!", labels });
//   } catch (error) {
//     res.status(500).json({ error: "Vision API error", details: error.message });
//   }
// });

// // 🔹 API routes
// const authRoutes = require("./routes/authRoutes");
// app.use("/api", authRoutes);

// module.exports = app;


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



