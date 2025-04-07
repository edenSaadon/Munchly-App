// ✅ server/src/middleware/userAuthMidd.js
const admin = require('../config/firebaseAdmin');

const userAuthMidd = async (req, res, next) => {
  console.log('🛡️ Middleware triggered');
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('⚠️ No Authorization header or wrong format');
    return res.status(401).json({ message: 'Missing or invalid token' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;

    console.log('✅ Token verified for UID:', decodedToken.uid);
    next();
  } catch (error) {
    console.error('❌ Token verification failed:', error.message);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = userAuthMidd;

