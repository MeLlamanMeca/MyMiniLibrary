import process from "process";

const getAllowedOrigins = () => {
  if (!process.env.CORS_PRIVATE_ORIGINS) {
    return [];
  }

  return process.env.CORS_PRIVATE_ORIGINS.split(",")
    .map(origin => origin.trim())
    .filter(Boolean);
};

export const enforcePrivateOrigin = (req, res, next) => {
  const origin = req.get("Origin");
  const allowedOrigins = getAllowedOrigins();

  if (!origin || !allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: "Origin not allowed" });
  }

  return next();
};
