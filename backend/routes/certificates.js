const express = require('express');
const verifyToken = require('../middleware/auth');
const { loadData, saveData } = require('../db');
const router = express.Router();

const FILE = 'certificates.json';
const DEFAULTS = [
  { _id: '1', title: 'Introduction to Internet of Things', issuer: 'NPTEL', issuedDate: '2023-10-01', credentialUrl: '', imageUrl: '', order: 1 },
  { _id: '2', title: 'Explainable Machine Learning', issuer: 'Duke University (Coursera)', issuedDate: '2024-02-01', credentialUrl: '', imageUrl: '', order: 2 },
  { _id: '3', title: 'Build Generative AI Apps', issuer: 'Udemy', issuedDate: '2024-05-01', credentialUrl: '', imageUrl: '', order: 3 },
  { _id: '4', title: 'Build Your Own Chatbot', issuer: 'IBM (Coursera)', issuedDate: '2024-07-01', credentialUrl: '', imageUrl: '', order: 4 },
];

let certificates = loadData(FILE, DEFAULTS);

// GET /api/certificates
router.get('/', (req, res) => {
  res.json({ success: true, data: certificates.sort((a, b) => a.order - b.order) });
});

// GET /api/certificates/:id
router.get('/:id', (req, res) => {
  const cert = certificates.find(c => c._id === req.params.id);
  if (!cert) return res.status(404).json({ message: 'Certificate not found' });
  res.json({ success: true, data: cert });
});

// POST /api/certificates (protected)
router.post('/', verifyToken, (req, res) => {
  const { title, issuer, issuedDate, credentialUrl, imageUrl, order } = req.body;
  if (!title || !issuer) return res.status(400).json({ message: 'Title and issuer required' });
  const newCert = {
    _id: Date.now().toString(),
    title, issuer, issuedDate: issuedDate || '',
    credentialUrl: credentialUrl || '', imageUrl: imageUrl || '',
    order: order || certificates.length + 1
  };
  certificates.push(newCert);
  saveData(FILE, certificates);
  res.status(201).json({ success: true, data: newCert });
});

// PUT /api/certificates/:id (protected)
router.put('/:id', verifyToken, (req, res) => {
  const idx = certificates.findIndex(c => c._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Certificate not found' });
  certificates[idx] = { ...certificates[idx], ...req.body };
  saveData(FILE, certificates);
  res.json({ success: true, data: certificates[idx] });
});

// DELETE /api/certificates/:id (protected)
router.delete('/:id', verifyToken, (req, res) => {
  const idx = certificates.findIndex(c => c._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Certificate not found' });
  certificates.splice(idx, 1);
  saveData(FILE, certificates);
  res.json({ success: true, message: 'Certificate deleted' });
});

module.exports = router;
