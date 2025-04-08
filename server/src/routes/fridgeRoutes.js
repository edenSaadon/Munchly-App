const express = require('express');
const router = express.Router();
const userAuthMidd = require('../middleware/userAuthMidd');
const { scanFridgeHandler } = require('../controllers/fridgeController');

router.post('/scan', userAuthMidd, scanFridgeHandler);


module.exports = router;
