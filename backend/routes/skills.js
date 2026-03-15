const express = require('express');
const verifyToken = require('../middleware/auth');
const { loadData, saveData } = require('../db');
const router = express.Router();

const FILE = 'skills.json';
const DEFAULTS = [
  { _id: '1', name: 'C', category: 'Languages', level: 'Intermediate', icon: 'code' },
  { _id: '2', name: 'C++', category: 'Languages', level: 'Intermediate', icon: 'code' },
  { _id: '3', name: 'Python', category: 'Languages', level: 'Advanced', icon: 'python' },
  { _id: '4', name: 'JavaScript', category: 'Languages', level: 'Advanced', icon: 'js' },
  { _id: '5', name: 'SQL', category: 'Database', level: 'Intermediate', icon: 'database' },
  { _id: '6', name: 'React.js', category: 'Frontend', level: 'Advanced', icon: 'react' },
  { _id: '7', name: 'Node.js', category: 'Backend', level: 'Intermediate', icon: 'node' },
  { _id: '8', name: 'HTML', category: 'Frontend', level: 'Advanced', icon: 'html5' },
  { _id: '9', name: 'CSS', category: 'Frontend', level: 'Advanced', icon: 'css3' },
  { _id: '10', name: 'MySQL', category: 'Database', level: 'Intermediate', icon: 'database' },
  { _id: '11', name: 'Git', category: 'Tools', level: 'Intermediate', icon: 'git' },
];

let skills = loadData(FILE, DEFAULTS);

// GET /api/skills
router.get('/', (req, res) => {
  res.json({ success: true, data: skills });
});

// GET /api/skills/:id
router.get('/:id', (req, res) => {
  const skill = skills.find(s => s._id === req.params.id);
  if (!skill) return res.status(404).json({ message: 'Skill not found' });
  res.json({ success: true, data: skill });
});

// POST /api/skills (protected)
router.post('/', verifyToken, (req, res) => {
  const { name, category, level, icon } = req.body;
  if (!name || !category) return res.status(400).json({ message: 'Name and category required' });
  const newSkill = { _id: Date.now().toString(), name, category, level: level || 'Beginner', icon: icon || 'code' };
  skills.push(newSkill);
  saveData(FILE, skills);
  res.status(201).json({ success: true, data: newSkill });
});

// PUT /api/skills/:id (protected)
router.put('/:id', verifyToken, (req, res) => {
  const idx = skills.findIndex(s => s._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Skill not found' });
  skills[idx] = { ...skills[idx], ...req.body };
  saveData(FILE, skills);
  res.json({ success: true, data: skills[idx] });
});

// DELETE /api/skills/:id (protected)
router.delete('/:id', verifyToken, (req, res) => {
  const idx = skills.findIndex(s => s._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Skill not found' });
  skills.splice(idx, 1);
  saveData(FILE, skills);
  res.json({ success: true, message: 'Skill deleted' });
});

module.exports = router;
