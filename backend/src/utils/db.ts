import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // この一行を追加：証明書のチェックを緩めて接続を許可する
    rejectUnauthorized: false
  }
});