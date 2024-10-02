const express = require('express');
const router = express.Router();
// const { isLoggedIn } = require('../middlewares/authorization.middleware');

// Voidance Invite Routes

// Get all voidance invites
router.get('/invites', (req, res) => {
  res.send('Get all voidance invites route');
});

// Get a specific voidance invite
router.get('/invites/:id', (req, res) => {
  res.send(`Get voidance invite with id: ${req.params.id}`);
});

// Create a new voidance invite
router.post('/invites', (req, res) => {
  res.send('Create new voidance invite route');
});

// Update a voidance invite
router.put('/invites/:id', (req, res) => {
  res.send(`Update voidance invite with id: ${req.params.id}`);
});

// Delete a voidance invite
router.delete('/invites/:id', (req, res) => {
  res.send(`Delete voidance invite with id: ${req.params.id}`);
});

// Update voidance invite acceptance status
router.patch('/invites/:id/acceptance', (req, res) => {
  res.send(`Update acceptance status for voidance invite with id: ${req.params.id}`);
});

// Voidance Generated Routes

// Get all generated voidances
router.get('/generated', (req, res) => {
  res.send('Get all generated voidances route');
});

// Get a specific generated voidance
router.get('/generated/:id', (req, res) => {
  res.send(`Get generated voidance with id: ${req.params.id}`);
});

// Create a new generated voidance
router.post('/generated', (req, res) => {
  res.send('Create new generated voidance route');
});

// Update a generated voidance
router.put('/generated/:id', (req, res) => {
  res.send(`Update generated voidance with id: ${req.params.id}`);
});

// Delete a generated voidance
router.delete('/generated/:id', (req, res) => {
  res.send(`Delete generated voidance with id: ${req.params.id}`);
});

// Update generated voidance upload status
router.patch('/generated/:id/upload-status', (req, res) => {
  res.send(`Update upload status for generated voidance with id: ${req.params.id}`);
});

// Update generated voidance quality score
router.patch('/generated/:id/quality-score', (req, res) => {
  res.send(`Update quality score for generated voidance with id: ${req.params.id}`);
});

module.exports = router;
