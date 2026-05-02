import miniDBApp from "./miniDB.js";
import MiniModel from "./models/MiniModel.js";
import dotenv from "dotenv";
dotenv.config();
import { pool } from "./config/db.js";

const app = miniDBApp({ miniModel: new MiniModel({ pool }) });

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening: http://localhost:${PORT}`);
});
