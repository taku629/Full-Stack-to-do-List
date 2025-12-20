import express, { Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../utils/db';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

router.post('/register', async (req: any, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    const result = await pool.query(
      'INSERT INTO users (id, email, password, name) VALUES ($1, $2, $3, $4) RETURNING id, email, name',
      [id, email, hashedPassword, name]
    );

    const token = jwt.sign({ userId: id }, JWT_SECRET);
    res.status(201).json({ token, user: result.rows[0] });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req: any, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, result.rows[0].password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: result.rows[0].id }, JWT_SECRET);
    res.json({ token, user: { id: result.rows[0].id, email: result.rows[0].email, name: result.rows[0].name } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;