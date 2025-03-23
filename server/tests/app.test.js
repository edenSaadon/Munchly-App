const request = require("supertest");
const app = require("../src/app");

describe("Basic Server Test", () => {
  it("should return pong from /api/ping", async () => {
    const res = await request(app).get("/api/ping");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "pong" });
  });
});