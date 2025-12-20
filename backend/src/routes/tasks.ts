import express, { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { pool } from '../utils/db';

const router = express.Router();

router.get('/project/:projectId', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE project_id = $1 AND user_id = $2 ORDER BY id ASC',
      [req.params.projectId, req.userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, status, priority, projectId } = req.body;
    const id = uuidv4();
    const result = await pool.query(
      'INSERT INTO tasks (id, title, description, status, priority, project_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [id, title, description || '', status || 'todo', priority || 'medium', projectId, req.userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Task Create Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const result = await pool.query(
      'UPDATE tasks SET status = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [status, req.params.id, req.userId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

export default router;