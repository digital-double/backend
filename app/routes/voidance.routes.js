const express = require('express');
const router = express.Router();
const voidanceController = require('../controllers/voidance.controller');
const { isLoggedIn } = require('../middlewares/authorization.middleware');


router.get('/invites', isLoggedIn, voidanceController.getAllVoidanceInvites); //good
router.get('/generated', isLoggedIn, voidanceController.getAllGeneratedVoidances); //good
router.get('/invites/:id', isLoggedIn, voidanceController.getVoidanceInvite); //good
router.get('/generated/:id', isLoggedIn, voidanceController.getGeneratedVoidance); //good

router.post('/invites', isLoggedIn, voidanceController.createVoidanceInvite); //good
router.post('/', isLoggedIn, voidanceController.createVoidance); //good

router.patch('/invites/:id', isLoggedIn, voidanceController.voidanceUpdateStatus); //good
router.patch('/generated/:id/upload-status', isLoggedIn, voidanceController.updateGeneratedVoidanceUploadStatus); //good
router.patch('/generated/:id/quality-score', isLoggedIn, voidanceController.updateGeneratedVoidanceQualityScore); //good

router.delete('/generated/:id', isLoggedIn, voidanceController.deleteGeneratedVoidance); //good
router.delete('/invites/:id', isLoggedIn, voidanceController.deleteVoidanceInvite); //good

module.exports = router;
