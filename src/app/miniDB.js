import express from "express";
import { MiniRouter } from "./routes/MiniRouter.js";

const miniDBApp = ({ miniModel }) => {
  const app = express();
  app.use(express.json());
  app.disable("x-powered-by");

  app.use("/mini", MiniRouter({ miniModel: miniModel }));

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  });

  return app;
};

export default miniDBApp;
