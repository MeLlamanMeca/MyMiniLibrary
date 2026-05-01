import cors from "cors";
import process from "process";

// Cualquiera puede hacer GET
export const corsPublic = cors({
  origin: "*",
  methods: ["GET"],
});

// Solo orígenes de confianza pueden hacer PUT
export const corsPrivate = cors({
  origin: process.env.CORS_PRIVATE_ORIGINS
    ? process.env.CORS_PRIVATE_ORIGINS.split(",")
    : [],
  methods: ["PUT"],
  credentials: true,
});
