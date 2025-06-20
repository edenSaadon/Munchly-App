// ### Purpose ###
// This test ensures that protected routes reject requests with an invalid token.
// It validates that the backend properly returns a 401 Unauthorized response
// when the Authorization header contains a fake or malformed token.

const request = require('supertest');
const app = require('../../../src/app'); // Make sure this is your Express app

describe(' Token verification – invalid token', () => {
  test('Should return 401 when token is invalid', async () => {
    const res = await request(app)
      .get('/users/profile') // You can replace with any protected route
      .set('Authorization', 'Bearer invalid_token');

    expect(res.statusCode).toBe(401);
    expect(
      res.body.message?.toLowerCase() || res.body.error?.toLowerCase()
    ).toMatch(/unauthorized|invalid/i);
  });
});
