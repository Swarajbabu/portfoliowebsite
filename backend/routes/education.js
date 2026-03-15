const express = require('express');
const verifyToken = require('../middleware/auth');
const { loadData, saveData } = require('../db');
const router = express.Router();

const FILE = 'education.json';
const DEFAULTS = [
  {
    _id: '1',
    degree: 'B.Tech – Computer Science and Engineering',
    institution: 'Lovely Professional University',
    location: 'Punjab, India',
    startYear: '2022',
    endYear: 'Present',
    grade: '',
    description: 'Pursuing Bachelor of Technology in Computer Science and Engineering with a focus on software development, data analytics, and AI.',
    order: 1,
  },
  {
    _id: '2',
    degree: 'Intermediate Education (12th Grade)',
    institution: 'Narayana Junior College',
    location: 'Andhra Pradesh, India',
    startYear: '2020',
    endYear: '2022',
    grade: '',
    description: 'Completed intermediate education with Mathematics, Physics, and Chemistry.',
    order: 2,
  },
  {
    _id: '3',
    degree: 'Matriculation (10th Grade)',
    institution: 'Greenwood High School',
    location: 'Andhra Pradesh, India',
    startYear: '2018',
    endYear: '2020',
    grade: '',
    description: 'Completed secondary education with a focus on sciences and mathematics.',
    order: 3,
  },
];

let education = loadData(FILE, DEFAULTS);

// GET /api/education
router.get('/', (req, res) => {
  res.json({ success: true, data: education.sort((a, b) => a.order - b.order) });
});

// GET /api/education/:id
router.get('/:id', (req, res) => {
  const edu = education.find(e => e._id === req.params.id);
  if (!edu) return res.status(404).json({ message: 'Education entry not found' });
  res.json({ success: true, data: edu });
});

// POST /api/education (protected)
router.post('/', verifyToken, (req, res) => {
  const { degree, institution, location, startYear, endYear, grade, description, order } = req.body;
  if (!degree || !institution) return res.status(400).json({ message: 'Degree and institution required' });
  const newEdu = {
    _id: Date.now().toString(),
    degree, institution, location: location || '',
    startYear: startYear || '', endYear: endYear || '',
    grade: grade || '', description: description || '',
    order: order || education.length + 1
  };
  education.push(newEdu);
  saveData(FILE, education);
  res.status(201).json({ success: true, data: newEdu });
});

// PUT /api/education/:id (protected)
router.put('/:id', verifyToken, (req, res) => {
  const idx = education.findIndex(e => e._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Education entry not found' });
  education[idx] = { ...education[idx], ...req.body };
  saveData(FILE, education);
  res.json({ success: true, data: education[idx] });
});

// DELETE /api/education/:id (protected)
router.delete('/:id', verifyToken, (req, res) => {
  const idx = education.findIndex(e => e._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Education entry not found' });
  education.splice(idx, 1);
  saveData(FILE, education);
  res.json({ success: true, message: 'Education entry deleted' });
});

module.exports = router;
