// server/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// יצירת משתמש
router.post('/', userController.createUser);

// שליפת פרטי משתמש
router.get('/:uid', userController.getUser);

// הוספת מתכון לרשימת לייקים
router.post('/:uid/like', userController.addLikedRecipe);

// הוספת סריקה של מקרר
router.post('/:uid/fridge', userController.addFridgeSnapshot);

// הוספת מתכון שנוצר עבור המשתמש
router.post('/:uid/generated', userController.addGeneratedRecipe);

module.exports = router;
