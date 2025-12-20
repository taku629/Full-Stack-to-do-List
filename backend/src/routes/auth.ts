import express, { Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../utils/db';

const router = express.Router();

// 新規登録
router.post('/register', async (req: any, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    const result = await pool.query(
      'INSERT INTO users (id, email, password, name) VALUES ($1, $2, $3, $4) RETURNING id, email, name',
      [id, email, hashedPassword, name]
    );

    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET || 'secret');
    res.status(201).json({ token, user: result.rows[0] });
  } catch (error) {
    // ここが重要！Renderのログにエラーの正体を出します
    console.error('Registration Error Details:', error); 
    res.status(500).json({ error: 'Registration failed' });
  }
});

// ログイン
router.post('/login', async (req: any, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret');
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    console.error('Login Error Details:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;