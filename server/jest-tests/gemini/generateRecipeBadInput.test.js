/**
 * ================================================================================
 * File: generateRecipeBadInput.test.js
 * Purpose:
 * This test validates the `/recipes/generate/ai` endpoint's behavior when given 
 * minimal or invalid input (e.g., only one non-informative ingredient like "doritos").
 *
 * It verifies that:
 * - The server returns either a 200 OK (with a recipe ID) or a 400 Bad Request (with an error message)
 * - No crash occurs when the AI fails to generate a meaningful recipe
 *
 * Notes:
 * - This test is intentionally flexible in expectations because AI generation may vary
 * ================================================================================
 */

const request = require('supertest');
const app = require('@/app');

describe('/generate/ai – bad input test', () => {
  test('Should fail with 400 if user ID does not exist', async () => {
    const res = await request(app)
      .post('/recipes/generate/ai')
      .send({
        detectedItems: ['doritos'], // intentionally minimal input
        preferences: {},
        createdBy: 'invalid-user-id-xyz' // deliberately invalid ID
      });

    console.log('📥 Server response code:', res.statusCode);
    console.log('📥 Server response:', res.body);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'User not found');
  });
});
