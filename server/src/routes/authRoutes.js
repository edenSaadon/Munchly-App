// const express = require("express");
// const router = express.Router();
// const authController = require("../controllers/authController");

// router.get("/ping", authController.ping);


// // Test route - Client ↔ Server communication
// router.get("/ping", (req, res) => {
//   res.json({ message: "Server is reachable from client" });
// });


// module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/ping", authController.ping);

module.exports = router;
