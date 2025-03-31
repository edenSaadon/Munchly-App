// server/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userAuthMidd = require('../middleware/userAuthMidd');


// יצירת משתמש חדש (ללא צורך בטוקן – רק בעת הרשמה)
router.post('/', userController.createUser);

// שליפת פרטי משתמש
router.get('/:uid', userAuthMidd, userController.getUser);

// הוספת מתכון לרשימת לייקים
router.post('/:uid/like', userAuthMidd, userController.addLikedRecipe);

// הוספת סריקה של מקרר
router.post('/:uid/fridge', userAuthMidd, userController.addFridgeSnapshot);

// הוספת מתכון שנוצר עבור המשתמש
router.post('/:uid/generated', userAuthMidd, userController.addGeneratedRecipe);

module.exports = router;


