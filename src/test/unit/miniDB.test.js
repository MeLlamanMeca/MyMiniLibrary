import { describe, it, expect, vi, beforeEach } from "vitest";
import miniDBApp from "../../app/miniDB.js";

const mockApp = {
  use: vi.fn(),
  disable: vi.fn()
};

vi.mock("express", () => {
  const express = vi.fn(() => mockApp);
  express.json = vi.fn(() => "json-middleware");
  return { default: express };
});

vi.mock("../../app/routes/MiniRouter.js", () => ({
  MiniRouter: vi.fn(() => "mini-router")
}));

describe("miniDBApp", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("should set up the express app correctly", () => {
    const mockMiniModel = { name: "mockModel" };
    miniDBApp({ miniModel: mockMiniModel });

    expect(mockApp.use).toHaveBeenCalledWith("json-middleware");
    expect(mockApp.disable).toHaveBeenCalledWith("x-powered-by");
    expect(mockApp.use).toHaveBeenCalledWith("/mini", "mini-router");
  });

  it("should have an error handler", () => {
    miniDBApp({ miniModel: {} });

    const errorHandler = mockApp.use.mock.calls.find(call => typeof call[0] === "function" && call[0].length === 4)[0];

    const mockRes = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    const mockErr = new Error("Test Error");

    errorHandler(mockErr, {}, mockRes, () => {});

    expect(console.error).toHaveBeenCalledWith(mockErr);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});
