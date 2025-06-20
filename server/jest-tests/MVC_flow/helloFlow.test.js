// ==============================================================================
// File: jest-tests/mvc-flow/helloFlow.test.js
// Purpose:
// This Jest test demonstrates a full MVC (Model-View-Controller) flow in a simple,
// isolated scenario. It verifies that:
//
// 1. A request to `/hello` is routed correctly.
// 2. The route calls the appropriate controller.
// 3. The controller calls the model logic.
// 4. The final response is generated correctly.
//
// This structure is useful to validate how well MVC components are wired together.
// ==============================================================================

const request = require('supertest');
const app = require('./helloApp'); // Express app with the route registered

describe('MVC Flow – /hello route', () => {
  test('Should return a greeting message from the model via controller and route', async () => {
    const res = await request(app).get('/hello?name=Eden');

    expect(res.statusCode).toBe(200); //  HTTP 200 expected
    expect(res.body).toHaveProperty('message'); //  JSON response should contain 'message'
    expect(res.body.message).toBe('Hello, Eden! Welcome to the MVC test.'); //  Message should match expected output
  });
});
