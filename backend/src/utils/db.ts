import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // セルフサイン証明書（独自の証明書）を許可する設定
    rejectUnauthorized: false
  }
});