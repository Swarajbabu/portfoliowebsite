const express = require('express');
const verifyToken = require('../middleware/auth');
const { loadData, saveData } = require('../db');
const router = express.Router();

const FILE = 'contact.json';
const DEFAULTS = {
  _id: '1',
  email: 'swarajvecha@gmail.com',
  phone: '',
  location: 'India',
  linkedin: 'https://www.linkedin.com/in/laxmiswarajbabu/',
  github: 'https://github.com/Swarajbabu',
  twitter: '',
  website: '',
  bio: 'Open to new opportunities and collaborations. Feel free to reach out!',
};

let contactInfo = loadData(FILE, DEFAULTS);

// GET /api/contact
router.get('/', (req, res) => {
  res.json({ success: true, data: contactInfo });
});

// PUT /api/contact (protected)
router.put('/', verifyToken, (req, res) => {
  contactInfo = { ...contactInfo, ...req.body };
  saveData(FILE, contactInfo);
  res.json({ success: true, data: contactInfo });
});

// POST /api/contact/message (public)
router.post('/message', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }
  console.log('New contact message:', { name, email, message });
  res.json({ success: true, message: 'Message received! I will get back to you soon.' });
});

module.exports = router;
