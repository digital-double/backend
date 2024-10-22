const express = require('express');
const router = express.Router();
const voidanceController = require('../controllers/voidance.controller');
const { isLoggedIn } = require('../middlewares/authorization.middleware');

// Voidance Invite Routes

// Get all voidance invites
router.get('/invites', isLoggedIn, voidanceController.getAllVoidanceInvites);

// Get a specific voidance invite
router.get('/invite', isLoggedIn, voidanceController.getVoidanceInvite);

// Create a new voidance invite
router.post('/invite', isLoggedIn, voidanceController.createVoidanceInvite);

// Update a voidance invite
router.put('/invite', isLoggedIn, voidanceController.updateVoidanceInvite);

// Delete a voidance invite
router.delete('/invite', isLoggedIn, voidanceController.deleteVoidanceInvite);

// Update voidance invite acceptance status
router.patch('/invite/acceptance', isLoggedIn, voidanceController.updateVoidanceInviteAcceptance);

// Voidance Generated Routes

// Get all generated voidances
router.get('/generated', isLoggedIn, voidanceController.getAllGeneratedVoidances);

// Get a specific generated voidance
router.get('/generated', isLoggedIn, voidanceController.getGeneratedVoidance);

// Create a new generated voidance
router.post('/generated', isLoggedIn, voidanceController.createGeneratedVoidance);

// Update a generated voidance
router.put('/generated', isLoggedIn, voidanceController.updateGeneratedVoidance);

// Delete a generated voidance
router.delete('/generated', isLoggedIn, voidanceController.deleteGeneratedVoidance);

// Update generated voidance upload status
router.patch('/generated/upload-status', isLoggedIn, voidanceController.updateGeneratedVoidanceUploadStatus);

// Update generated voidance quality score
router.patch('/generated/quality-score', isLoggedIn, voidanceController.updateGeneratedVoidanceQualityScore);

module.exports = router;
