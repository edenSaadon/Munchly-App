const express = require('express');
const router = express.Router();
const userAuthMidd = require('../middleware/userAuthMidd');
const { scanFridgeHandler } = require('../controllers/fridgeController'); 
const { addItemToFridgeHandler } = require('../controllers/userController');

router.post('/scan', userAuthMidd, scanFridgeHandler);
// הוספת מוצר חדש לפריזר


module.exports = router;
