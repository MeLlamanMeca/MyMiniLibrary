import cors from "cors";
import process from "process";

export const corsPublic = cors({
  origin: "*",
  methods: ["GET"],
});

export const corsPrivate = cors({
  origin: process.env.CORS_PRIVATE_ORIGINS
    ? process.env.CORS_PRIVATE_ORIGINS.split(",")
    : [],
  methods: ["PUT", "DELETE", "PATCH", "POST"],
  credentials: true,
});
