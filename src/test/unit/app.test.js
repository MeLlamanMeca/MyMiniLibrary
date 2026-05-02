import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../app/miniDB.js", () => ({
  default: vi.fn(() => ({
    listen: vi.fn((port, cb) => cb && cb())
  }))
}));

vi.mock("../../app/models/MiniModel.js", () => ({
  default: vi.fn().mockImplementation(function(config) {
    this.pool = config.pool;
    this.type = "MiniModel";
  })
}));

vi.mock("../../app/config/db.js", () => ({
  pool: { type: "Pool" }
}));

vi.mock("dotenv", () => ({
  default: { config: vi.fn() }
}));

describe("app.js entry point", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("should initialize the app with correctly configured model", async () => {
    await import("../../app/app.js");

    const miniDBApp = (await import("../../app/miniDB.js")).default;
    const MiniModel = (await import("../../app/models/MiniModel.js")).default;
    const { pool } = await import("../../app/config/db.js");
    const dotenv = (await import("dotenv")).default;

    expect(dotenv.config).toHaveBeenCalled();
    expect(MiniModel).toHaveBeenCalledWith({ pool });
    expect(miniDBApp).toHaveBeenCalledWith({
      miniModel: expect.objectContaining({ pool, type: "MiniModel" })
    });
  });
});
