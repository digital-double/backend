const express = require('express');
const router = express.Router();
const voidanceController = require('../controllers/voidance.controller');
// const { isLoggedIn } = require('../middlewares/authorization.middleware');

// Voidance Invite Routes

// Get all voidance invites
router.get('/invites', voidanceController.getAllVoidanceInvites);

// Get a specific voidance invite
router.get('/invites/:id', voidanceController.getVoidanceInvite);

// Create a new voidance invite
router.post('/invites', voidanceController.createVoidanceInvite);

// Update a voidance invite
router.put('/invites/:id', voidanceController.updateVoidanceInvite);

// Delete a voidance invite
router.delete('/invites/:id', voidanceController.deleteVoidanceInvite);

// Update voidance invite acceptance status
router.patch('/invites/:id/acceptance', voidanceController.updateVoidanceInviteAcceptance);

// Voidance Generated Routes

// Get all generated voidances
router.get('/generated', voidanceController.getAllGeneratedVoidances);

// Get a specific generated voidance
router.get('/generated/:id', voidanceController.getGeneratedVoidance);

// Create a new generated voidance
router.post('/generated', voidanceController.createGeneratedVoidance);

// Update a generated voidance
router.put('/generated/:id', voidanceController.updateGeneratedVoidance);

// Delete a generated voidance
router.delete('/generated/:id', voidanceController.deleteGeneratedVoidance);

// Update generated voidance upload status
router.patch('/generated/:id/upload-status', voidanceController.updateGeneratedVoidanceUploadStatus);

// Update generated voidance quality score
router.patch('/generated/:id/quality-score', voidanceController.updateGeneratedVoidanceQualityScore);

module.exports = router;
