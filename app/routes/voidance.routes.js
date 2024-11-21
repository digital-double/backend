const express = require('express');
const router = express.Router();
const voidanceController = require('../controllers/voidance.controller');
const { isLoggedIn } = require('../middlewares/authorization.middleware');


router.get('/invites', isLoggedIn, voidanceController.getAllVoidanceInvites);
router.get('/generated', isLoggedIn, voidanceController.getAllGeneratedVoidances);
router.get('/invites/:id', isLoggedIn, voidanceController.getVoidanceInvite);
router.get('/generated/:id', isLoggedIn, voidanceController.getGeneratedVoidance);

router.post('/invites', isLoggedIn, voidanceController.createVoidanceInvite);
router.post('/generated', isLoggedIn, voidanceController.createVoidance);

router.patch('/invites/:id', isLoggedIn, voidanceController.voidanceUpdateStatus);
router.patch('/generated/:id/upload-status', isLoggedIn, voidanceController.updateGeneratedVoidanceUploadStatus);
router.patch('/generated/:id/quality-score', isLoggedIn, voidanceController.updateGeneratedVoidanceQualityScore);

router.delete('/generated/:id', isLoggedIn, voidanceController.deleteGeneratedVoidance);
router.delete('/invites/:id', isLoggedIn, voidanceController.deleteVoidanceInvite);

module.exports = router;
