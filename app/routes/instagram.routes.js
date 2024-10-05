const express = require('express');
const router = express.Router();
// const { isLoggedIn } = require('../middlewares/authorization.middleware');

// Instagram Credentials Routes

// Get all Instagram credentials
router.get('/credentials', (req, res) => {
  res.send('Get all Instagram credentials route');
});

// Get specific Instagram credentials
router.get('/credentials/:id', (req, res) => {
  res.send(`Get Instagram credentials with id: ${req.params.id}`);
});

// Create new Instagram credentials
router.post('/credentials', (req, res) => {
  res.send('Create new Instagram credentials route');
});

// Update Instagram credentials
router.put('/credentials/:id', (req, res) => {
  res.send(`Update Instagram credentials with id: ${req.params.id}`);
});

// Delete Instagram credentials
router.delete('/credentials/:id', (req, res) => {
  res.send(`Delete Instagram credentials with id: ${req.params.id}`);
});

// Link/Unlink Instagram account
router.patch('/credentials/:id/link', (req, res) => {
  res.send(`Link/Unlink Instagram account for credentials with id: ${req.params.id}`);
});

// Instagram Content Routes

// Get all Instagram content
router.get('/content', (req, res) => {
  res.send('Get all Instagram content route');
});

// Get specific Instagram content
router.get('/content/:id', (req, res) => {
  res.send(`Get Instagram content with id: ${req.params.id}`);
});

// Create new Instagram content
router.post('/content', (req, res) => {
  res.send('Create new Instagram content route');
});

// Update Instagram content
router.put('/content/:id', (req, res) => {
  res.send(`Update Instagram content with id: ${req.params.id}`);
});

// Delete Instagram content
router.delete('/content/:id', (req, res) => {
  res.send(`Delete Instagram content with id: ${req.params.id}`);
});

module.exports = router;
