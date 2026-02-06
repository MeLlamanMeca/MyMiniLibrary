import { WhScannerApp } from './WhScannerApp.js'
import UserModel from './models/UserModel.js'

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

WhScannerApp({ userModel: new UserModel({ pool }), unitModel: null, squadModel: null, weaponModel: null })