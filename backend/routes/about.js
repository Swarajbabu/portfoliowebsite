const express = require('express');
const verifyToken = require('../middleware/auth');
const { loadData, saveData } = require('../db');
const router = express.Router();

const FILE = 'about.json';
const DEFAULTS = {
  _id: '1',
  heading: 'Passionate about Data & Code',
  bio1: 'I am a Computer Science Engineering student passionate about Data Analytics, Web Development, and AI-based applications. I enjoy building interactive dashboards, intelligent systems, and full-stack applications.',
  bio2: "I focus on problem-solving, automation, and creating user-friendly digital experiences. Whether it's analyzing complex datasets or building a responsive web app, I love turning ideas into reality.",
  location: 'India',
  degree: 'B.Tech CSE',
  focus: 'Full-Stack & AI',
  passion: 'Problem Solving',
  photoUrl: '',
};

let aboutData = loadData(FILE, DEFAULTS);

// GET /api/about (public)
router.get('/', (req, res) => {
  res.json({ success: true, data: aboutData });
});

// PUT /api/about (protected)
router.put('/', verifyToken, (req, res) => {
  const allowed = ['heading', 'bio1', 'bio2', 'location', 'degree', 'focus', 'passion', 'photoUrl'];
  allowed.forEach(key => {
    if (req.body[key] !== undefined) aboutData[key] = req.body[key];
  });
  saveData(FILE, aboutData);
  res.json({ success: true, data: aboutData });
});

// POST /api/about/photo (protected)
router.post('/photo', verifyToken, (req, res) => {
  const { photo } = req.body;
  if (photo === undefined) return res.status(400).json({ message: 'No photo provided' });
  aboutData.photoUrl = photo;
  saveData(FILE, aboutData);
  res.json({ success: true, data: { photoUrl: aboutData.photoUrl } });
});

module.exports = router;
