import miniDBApp from "./miniDB.js";
import MiniModel from "./models/MiniModel.js";
import dotenv from "dotenv";
dotenv.config();
import { pool } from "./config/db.js";

miniDBApp({ miniModel: new MiniModel({ pool }) });
