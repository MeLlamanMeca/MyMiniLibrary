import miniDBApp from "./src/miniDB.js";
import MiniModel from "./src/models/MiniModel.js";
import dotenv from "dotenv";
dotenv.config();
import { pool } from "./src/config/db.js";

miniDBApp({ miniModel: new MiniModel({ pool }) });
