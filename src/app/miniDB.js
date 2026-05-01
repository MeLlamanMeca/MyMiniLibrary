import express from "express";
import { MiniRouter } from "./routes/MiniRouter.js";

const miniDBApp = ({ miniModel }) => {
  const app = express();
  app.use(express.json());
  app.disable("x-powered-by");

  app.use("/mini", MiniRouter({ miniModel: miniModel }));

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  });

  const PORT = 8080;
  app.listen(PORT, () => {
    console.log(`Server listening: http://localhost:${PORT}`);
  });
};

export default miniDBApp;
