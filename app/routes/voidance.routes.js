const express = require('express');
const router = express.Router();
const voidanceController = require('../controllers/voidance.controller');
const { isLoggedIn } = require('../middlewares/authorization.middleware');

// Voidance Invite Routes

// Get all voidance invites
router.get('/invites', isLoggedIn, voidanceController.getAllVoidanceInvites);

// Get a specific voidance invite
router.get('/invites/:id', isLoggedIn, voidanceController.getVoidanceInvite);

// Create a new voidance invite
router.post('/invites', isLoggedIn, voidanceController.createVoidanceInvite);

// Delete a voidance invite
router.delete('/invites/:id', isLoggedIn, voidanceController.deleteVoidanceInvite);

// Update voidance invite acceptance status
router.patch('/invites/:id/acceptance', isLoggedIn, voidanceController.voidanceUpdateStatus);

// Voidance Generated Routes

// Get all generated voidances
router.get('/generated', isLoggedIn, voidanceController.getAllGeneratedVoidances);

// Get a specific generated voidance
router.get('/generated/:id', isLoggedIn, voidanceController.getGeneratedVoidance);

// Create a new generated voidance
router.post('/generated', isLoggedIn, voidanceController.createVoidance);

// Delete a generated voidance
router.delete('/generated/:id', isLoggedIn, voidanceController.deleteGeneratedVoidance);

// Update generated voidance upload status
router.patch('/generated/:id/upload-status', isLoggedIn, voidanceController.updateGeneratedVoidanceUploadStatus);

// Update generated voidance quality score
router.patch('/generated/:id/quality-score', isLoggedIn, voidanceController.updateGeneratedVoidanceQualityScore);

module.exports = router;
