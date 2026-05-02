import { describe, it, expect, beforeAll, beforeEach, afterAll, vi } from "vitest";
import request from "supertest";
import process from "process";

process.env.DB_USER = process.env.DB_TEST_USER || "testuser";
process.env.DB_HOST = process.env.DB_TEST_HOST || "localhost";
process.env.DB_NAME = process.env.DB_TEST_NAME || "test_minidb";
process.env.DB_PASSWORD = process.env.DB_TEST_PASSWORD || "testpassword";
process.env.DB_PORT = process.env.DB_TEST_PORT || "5433";
process.env.CORS_PRIVATE_ORIGINS = "http://localhost:3000";

import miniDBApp from "../../app/miniDB.js";
import MiniModel from "../../app/models/MiniModel.js";
import { setupTestDb, cleanupDb, seedDb, teardownTestDb, testPool } from "./setup.js";

let app;

beforeAll(async () => {
  await setupTestDb();
  app = miniDBApp({ miniModel: new MiniModel({ pool: testPool }) });
});

beforeEach(async () => {
  await cleanupDb();
  await seedDb();
});

afterAll(async () => {
  await teardownTestDb();
  vi.clearAllMocks();
  vi.resetModules();
});

describe("Mini API Integration Tests", () => {
  describe("GET /mini/:id", () => {
    it("should return a mini by ID", async () => {
      const res = await request(app).get("/mini/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ id: 1, name: "Space Marine Test" });
    });

    it("should return 404 if mini not found", async () => {
      const res = await request(app).get("/mini/999");
      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual({ error: "Mini not found" });
    });

    it("should return 400 for invalid ID", async () => {
      const res = await request(app).get("/mini/abc");
      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({ error: "Invalid ID" });
    });
  });

  describe("POST /mini", () => {
    it("should return 200 with In progress message for valid origin", async () => {
      const newMini = { name: "New Mini" };
      const res = await request(app)
        .post("/mini")
        .send(newMini)
        .set("Origin", "http://localhost:3000");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ message: "In progress" });
    });

    it("should return 403 for invalid origin", async () => {
      const newMini = { name: "New Mini" };
      const res = await request(app)
        .post("/mini")
        .send(newMini)
        .set("Origin", "http://unauthorized.com");

      expect(res.statusCode).toEqual(403);
      expect(res.body).toEqual({ error: "Origin not allowed" });
    });
  });

  describe("PATCH /mini/:id", () => {
    it("should return 200 with In progress message for valid origin", async () => {
      const updatedMini = { name: "Updated Mini" };
      const res = await request(app)
        .patch("/mini/1")
        .send(updatedMini)
        .set("Origin", "http://localhost:3000");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ message: "In progress" });
    });

    it("should return 403 for invalid origin", async () => {
      const updatedMini = { name: "Updated Mini" };
      const res = await request(app)
        .patch("/mini/1")
        .send(updatedMini)
        .set("Origin", "http://unauthorized.com");

      expect(res.statusCode).toEqual(403);
      expect(res.body).toEqual({ error: "Origin not allowed" });
    });
  });

  describe("DELETE /mini/:id", () => {
    it("should return 200 with In progress message for valid origin", async () => {
      const res = await request(app)
        .delete("/mini/1")
        .set("Origin", "http://localhost:3000");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ message: "In progress" });
    });

    it("should return 403 for invalid origin", async () => {
      const res = await request(app)
        .delete("/mini/1")
        .set("Origin", "http://unauthorized.com");

      expect(res.statusCode).toEqual(403);
      expect(res.body).toEqual({ error: "Origin not allowed" });
    });
  });
});
