import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// GET all projects (optionally filter by category)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const projects = await Project.find(filter);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new project
router.post('/', async (req, res) => {
  const project = new Project(req.body);
  try {
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a project by ID
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    Object.assign(project, req.body);

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a project by ID
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await project.remove();
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
