const express = require('express');
const verifyToken = require('../middleware/auth');
const { loadData, saveData } = require('../db');
const router = express.Router();

const FILE = 'training.json';
const DEFAULTS = [
  {
    _id: '1',
    title: 'DSA Training',
    organization: 'Programming Pathshala',
    description: 'Focused on problem solving, algorithms, and advanced data structures including arrays, linked lists, stacks, queues, trees, and graphs.',
    startDate: '2023-06-01',
    endDate: '2023-12-01',
    type: 'Training',
    order: 1,
  },
  {
    _id: '2',
    title: 'Data Analyst Intern',
    organization: 'Unified Mentor Pvt Ltd',
    description: 'Analyzed large datasets using Python (Pandas, NumPy). Performed Data Cleaning & EDA. Built interactive Power BI dashboards. Developed predictive models and created visualizations.',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    type: 'Experience',
    order: 2,
  },
];

let trainingExperience = loadData(FILE, DEFAULTS);

// GET /api/training
router.get('/', (req, res) => {
  res.json({ success: true, data: trainingExperience.sort((a, b) => a.order - b.order) });
});

// GET /api/training/:id
router.get('/:id', (req, res) => {
  const item = trainingExperience.find(t => t._id === req.params.id);
  if (!item) return res.status(404).json({ message: 'Entry not found' });
  res.json({ success: true, data: item });
});

// POST /api/training (protected)
router.post('/', verifyToken, (req, res) => {
  const { title, organization, description, startDate, endDate, type, order } = req.body;
  if (!title || !organization) return res.status(400).json({ message: 'Title and organization required' });
  const newItem = {
    _id: Date.now().toString(),
    title, organization, description: description || '',
    startDate: startDate || '', endDate: endDate || '',
    type: type || 'Training', order: order || trainingExperience.length + 1
  };
  trainingExperience.push(newItem);
  saveData(FILE, trainingExperience);
  res.status(201).json({ success: true, data: newItem });
});

// PUT /api/training/:id (protected)
router.put('/:id', verifyToken, (req, res) => {
  const idx = trainingExperience.findIndex(t => t._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Entry not found' });
  trainingExperience[idx] = { ...trainingExperience[idx], ...req.body };
  saveData(FILE, trainingExperience);
  res.json({ success: true, data: trainingExperience[idx] });
});

// DELETE /api/training/:id (protected)
router.delete('/:id', verifyToken, (req, res) => {
  const idx = trainingExperience.findIndex(t => t._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Entry not found' });
  trainingExperience.splice(idx, 1);
  saveData(FILE, trainingExperience);
  res.json({ success: true, message: 'Entry deleted' });
});

module.exports = router;
