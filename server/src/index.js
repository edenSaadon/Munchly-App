//index.js מאזין לפורט.


// //require('dotenv').config();
// const app = require("./app");

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// // });
// const app = require("./app");

// const PORT = 3000;
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });


const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on http://0.0.0.0:${PORT}`);
});

