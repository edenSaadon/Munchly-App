const express = require('express');
const router = express.Router();
const userAuthMidd = require('../middleware/userAuthMidd');
const multer = require('multer');
const upload = multer(); // מעלה לקובץ זמני בזיכרון
const { scanFridgeHandler } = require('../controllers/fridgeController'); 
const { addItemToFridgeHandler } = require('../controllers/userController');

// router.post('/scan', userAuthMidd, scanFridgeHandler);
// הוספת מוצר חדש לפריזר
router.post('/scan', userAuthMidd, upload.single('image'), scanFridgeHandler);


module.exports = router;
