
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/ping", authController.ping);

module.exports = router;
