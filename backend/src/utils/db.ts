import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // RenderのDB接続に必須の設定です
  }
});

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL');
});