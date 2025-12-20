
import express, { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { pool } from '../utils/db';

const router = express.Router();

router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM projects WHERE user_id = $1 ORDER BY id DESC', [req.userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description } = req.body;
    const id = uuidv4();
    const result = await pool.query(
      'INSERT INTO projects (id, name, description, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, name, description || '', req.userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Project Create Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;