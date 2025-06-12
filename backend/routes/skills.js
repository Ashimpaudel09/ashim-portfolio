import express from 'express';
import Skill from '../models/Skill.js';

const router = express.Router();

// GET all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new skill
router.post('/', async (req, res) => {
  const skill = new Skill(req.body);
  try {
    const savedSkill = await skill.save();
    res.status(201).json(savedSkill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a skill by ID
router.put('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });

    // Update fields from req.body
    Object.assign(skill, req.body);

    const updatedSkill = await skill.save();
    res.json(updatedSkill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a skill by ID
router.delete('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });

    await skill.remove();
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
