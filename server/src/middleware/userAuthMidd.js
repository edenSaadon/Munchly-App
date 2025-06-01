// ========================================================
// User Authentication Middleware – Firebase Token Verifier
// ========================================================
//
// Purpose:
// This middleware verifies the Firebase ID token sent by the client in the Authorization header.
// It ensures that only authenticated users can access protected routes.
//
// Behavior:
// - Expects a Bearer token in the Authorization header
// - Verifies the token using Firebase Admin SDK
// - If valid, attaches the decoded user info to req.user and calls next()
// - If invalid or missing, responds with HTTP 401 Unauthorized
//
// Usage:
// Apply this middleware to any route that requires authentication.
// Example: router.get('/profile', userAuthMidd, controller.getUserProfile)

const admin = require('../config/firebaseAdmin');

const userAuthMidd = async (req, res, next) => {
  console.log('🛡️ Middleware triggered');

  // Extract Authorization header (expected format: Bearer <token>)
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('⚠️ No Authorization header or wrong format');
    return res.status(401).json({ message: 'Missing or invalid token' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    // Verify token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Attach decoded token to request for downstream access

    console.log('✅ Token verified for UID:', decodedToken.uid);
    next(); // Allow request to proceed to route handler
  } catch (error) {
    console.error('❌ Token verification failed:', error.message);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = userAuthMidd;
