const express = require('express');
const verifyToken = require('../middleware/auth');
const { loadData, saveData } = require('../db');
const router = express.Router();

const FILE = 'projects.json';
const DEFAULTS = [
  {
    _id: '1',
    title: 'AI Mock Interview Platform',
    description: 'An AI-powered system conducting personalized interviews with real-time voice/video interaction and NLP feedback. Built with React, Node.js, and integrated with AI APIs for smart question generation.',
    technologies: ['React.js', 'Node.js', 'NLP', 'Convex', 'OpenAI'],
    githubUrl: 'https://github.com/Swarajbabu',
    liveUrl: '',
    imageUrl: '',
    featured: true,
    order: 1,
  },
  {
    _id: '2',
    title: 'Smart Task Management System',
    description: 'Full-stack task management application with secure CRUD operations, user authentication, priority tracking, and a responsive modern UI.',
    technologies: ['React.js', 'Node.js', 'MySQL', 'Express', 'JWT'],
    githubUrl: 'https://github.com/Swarajbabu',
    liveUrl: '',
    imageUrl: '',
    featured: true,
    order: 2,
  },
];

let projects = loadData(FILE, DEFAULTS);

// GET /api/projects
router.get('/', (req, res) => {
  res.json({ success: true, data: projects });
});

// GET /api/projects/:id
router.get('/:id', (req, res) => {
  const project = projects.find(p => p._id === req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json({ success: true, data: project });
});

// POST /api/projects (protected)
router.post('/', verifyToken, (req, res) => {
  const { title, description, technologies, githubUrl, liveUrl, imageUrl, featured, order } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });
  const newProject = {
    _id: Date.now().toString(),
    title, description: description || '', technologies: technologies || [],
    githubUrl: githubUrl || '', liveUrl: liveUrl || '', imageUrl: imageUrl || '',
    featured: featured || false, order: order || projects.length + 1
  };
  projects.push(newProject);
  saveData(FILE, projects);
  res.status(201).json({ success: true, data: newProject });
});

// PUT /api/projects/:id (protected)
router.put('/:id', verifyToken, (req, res) => {
  const idx = projects.findIndex(p => p._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Project not found' });
  projects[idx] = { ...projects[idx], ...req.body };
  saveData(FILE, projects);
  res.json({ success: true, data: projects[idx] });
});

// DELETE /api/projects/:id (protected)
router.delete('/:id', verifyToken, (req, res) => {
  const idx = projects.findIndex(p => p._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Project not found' });
  projects.splice(idx, 1);
  saveData(FILE, projects);
  res.json({ success: true, message: 'Project deleted' });
});

module.exports = router;
