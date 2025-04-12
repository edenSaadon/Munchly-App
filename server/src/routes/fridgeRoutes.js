const express = require('express');
const router = express.Router();
const userAuthMidd = require('../middleware/userAuthMidd');
const { scanFridgeHandler } = require('../controllers/fridgeController'); // ודא שהפונקציה מיובאת כראוי

// ודא שהפונקציה קיימת לפני שאתה מפעיל את הנתיב
router.post('/scan', userAuthMidd, scanFridgeHandler);

//const fridgeController = require('./controllers/fridgeController');  // ייבוא הקונטרולר

// הוספת הראוט
//app.post('/fridge/scan', userAuthMidd, fridgeController.scanFridgeHandler); // הוספת האימות בנתיב

module.exports = router;
