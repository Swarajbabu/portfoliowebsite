const express = require('express');
const verifyToken = require('../middleware/auth');
const { loadData, saveData } = require('../db');
const router = express.Router();

const FILE = 'hero.json';
const DEFAULTS = {
  _id: '1',
  firstName: 'Vecha Laxmi',
  lastName: 'Swaraj Babu',
  badgeText: 'Available for opportunities',
  typingStrings: [
    'Full-Stack Developer',
    'React.js Enthusiast',
    'Problem Solver',
    'Data Analyst',
    'AI App Builder',
  ],
  description: 'Computer Science Engineering student passionate about Data Analytics, Web Development, and AI-based applications. Building the future, one line of code at a time.',
  linkedin: 'https://www.linkedin.com/in/laxmiswarajbabu/',
  github: 'https://github.com/Swarajbabu',
  email: 'swarajvecha@gmail.com',
};

let heroData = loadData(FILE, DEFAULTS);

// GET /api/hero (public)
router.get('/', (req, res) => {
  res.json({ success: true, data: heroData });
});

// PUT /api/hero (protected)
router.put('/', verifyToken, (req, res) => {
  const allowed = ['firstName', 'lastName', 'badgeText', 'typingStrings', 'description', 'linkedin', 'github', 'email'];
  allowed.forEach(key => {
    if (req.body[key] !== undefined) heroData[key] = req.body[key];
  });
  saveData(FILE, heroData);
  res.json({ success: true, data: heroData });
});

module.exports = router;
