
// // ✅ server/src/routes/userRoutes.js
// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');
// const userAuthMidd = require('../middleware/userAuthMidd');

// // ✅ נתיב חדש לאימות טוקן
// router.get('/verify', userAuthMidd, (req, res) => {
//     res.status(200).json({ uid: req.user.uid });
//   });

// // יצירת משתמש חדש (ללא צורך בטוקן – רק בעת הרשמה)
// router.post('/', userController.createUser);
// // שליפת פרטי משתמש
// router.get('/:uid', userAuthMidd, userController.getUser);

// // עדכון העדפות משתמש
// router.post('/:uid/preferences', userAuthMidd, userController.updatePreferences);

// // הוספת מתכון לרשימת לייקים
// router.post('/:uid/like', userAuthMidd, userController.addLikedRecipe);

// // הוספת סריקה של מקרר
// router.post('/:uid/fridge', userAuthMidd, userController.addFridgeSnapshot);

// // הוספת מתכון שנוצר עבור המשתמש
// router.post('/:uid/generated', userAuthMidd, userController.addGeneratedRecipe);

// router.post('/add-item/:uid', userAuthMidd, addItemToFridgeHandler);

// router.post('/remove-item/:uid', userAuthMidd, deleteFridgeItemHandler);

// module.exports = router;

// ✅ server/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // ייבוא נכון של הקונטרולר
const userAuthMidd = require('../middleware/userAuthMidd');

// ✅ נתיב חדש לאימות טוקן
router.get('/verify', userAuthMidd, (req, res) => {
  res.status(200).json({ uid: req.user.uid });
});

// יצירת משתמש חדש (ללא צורך בטוקן – רק בעת הרשמה)
router.post('/', userController.createUser);

// שליפת פרטי משתמש
router.get('/:uid', userAuthMidd, userController.getUser);

// עדכון העדפות משתמש
router.post('/:uid/preferences', userAuthMidd, userController.updatePreferences);

// הוספת מתכון לרשימת לייקים
router.post('/:uid/like', userAuthMidd, userController.addLikedRecipe);

// הוספת סריקה של מקרר
router.post('/:uid/fridge', userAuthMidd, userController.addFridgeSnapshot);

// הוספת מתכון שנוצר עבור המשתמש
router.post('/:uid/generated', userAuthMidd, userController.addGeneratedRecipe);

// הוספת פריט למקרר
router.post('/:uid/add-item', userAuthMidd, userController.addItemToFridgeHandler);  // הוספתי את הפונקציה כאן

// מחיקת פריט מהמקרר
router.post('/:uid/remove-item', userAuthMidd, userController.deleteFridgeItemHandler);  // הוספתי את הפונקציה למחיקת פריט

module.exports = router;
