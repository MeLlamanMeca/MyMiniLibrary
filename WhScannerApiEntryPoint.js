import { WhScannerApp } from './WhScannerApp.js'
import UserModel from './models/UserModel.js'
import unitModel from './models/UnitModel.js'
import squadModel from './models/SquadModel.js'
import weaponModel from './models/WeaponModel.js'
import dotenv from 'dotenv'
dotenv.config()
import { Pool } from 'pg'

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

WhScannerApp({ userModel: new UserModel({ pool }), unitModel: new unitModel({ pool }), squadModel: new squadModel({ pool }), weaponModel: new weaponModel({ pool }) })