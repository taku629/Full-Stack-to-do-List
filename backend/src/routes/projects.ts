import express, { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import datastore from '../utils/datastore';

const router = express.Router();

// Get all projects for the authenticated user
router.get('/', authMiddleware, (req: AuthRequest, res: Response): void => {
  try {
    const projects = datastore.getProjectsByUserId(req.userId!);
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new project
router.post('/', authMiddleware, (req: AuthRequest, res: Response): void => {
  try {
    const { name, description } = req.body;

    if (!name) {
      res.status(400).json({ error: 'Project name is required' });
      return;
    }

    const project = {
      id: uuidv4(),
      name,
      description: description || '',
      userId: req.userId!,
      createdAt: new Date().toISOString()
    };

    const createdProject = datastore.createProject(project);
    res.status(201).json(createdProject);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a specific project
router.get('/:id', authMiddleware, (req: AuthRequest, res: Response): void => {
  try {
    const project = datastore.getProjectById(req.params.id);

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    if (project.userId !== req.userId) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a project
router.put('/:id', authMiddleware, (req: AuthRequest, res: Response): void => {
  try {
    const project = datastore.getProjectById(req.params.id);

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    if (project.userId !== req.userId) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    const { name, description } = req.body;
    const updatedProject = datastore.updateProject(req.params.id, {
      name,
      description
    });

    res.json(updatedProject);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a project
router.delete('/:id', authMiddleware, (req: AuthRequest, res: Response): void => {
  try {
    const project = datastore.getProjectById(req.params.id);

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    if (project.userId !== req.userId) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    datastore.deleteProject(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
