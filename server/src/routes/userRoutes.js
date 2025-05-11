const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userAuthMidd = require('../middleware/userAuthMidd');


router.get('/profile', userAuthMidd, userController.getUserProfileHandler);

// ✅ אימות טוקן - מחזיר את ה-UID
router.get('/verify', userAuthMidd, (req, res) => {
  res.status(200).json({ uid: req.user.uid });
});
//router.get('/:uid/profile', userAuthMidd, userController.getUserProfileHandler);

// ✅ יצירת משתמש חדש - בשלב ההרשמה בלבד
router.post('/', userController.createUser);

// ✅ שליפת פרטי משתמש
router.get('/:uid', userAuthMidd, userController.getUser);

// ✅ עדכון העדפות משתמש
router.post('/:uid/preferences', userAuthMidd, userController.updatePreferences);

// ✅ הוספת מתכון שאהב המשתמש
router.post('/:uid/like', userAuthMidd, userController.addLikedRecipe);

// ✅ הוספת רשימת פריטים שזוהו ע"י Google Vision
router.post('/:uid/fridge', userAuthMidd, userController.addFridgeSnapshot);

// ✅ שמירת מתכון שנוצר עבור המשתמש
router.post('/:uid/generated', userAuthMidd, userController.addGeneratedRecipe);

// ✅ הוספת פריט לרשימת aiFridgeItems בלבד
router.post('/:uid/add-item', userAuthMidd, userController.addItemToFridgeHandler);

// ✅ הסרת פריט מרשימת aiFridgeItems בלבד
router.post('/:uid/remove-item', userAuthMidd, userController.deleteFridgeItemHandler);

// ✅ שמירת רשימת aiFridgeItems בעת מעבר למסך תפריט (אם רלוונטי)
router.post('/:uid/fridge/save-items', userAuthMidd, userController.saveFridgeItemsHandler);

// ✅ שמירת תמונת מקרר ופריטים כסנאפשוט סופי
router.post('/:uid/fridge/final-snapshot', userAuthMidd, userController.saveFinalFridgeSnapshotHandler);



module.exports = router;
