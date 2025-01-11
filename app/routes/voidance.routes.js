const express = require('express');
const router = express.Router();
const voidance = require('../controllers/voidance.controller');
const { isLoggedIn, isCompany, isAccountOwner } = require('../middlewares/authorization.middleware');
const upload = require('../middlewares/upload.middleware.js')


router.get('/:userName/invites', isLoggedIn, isAccountOwner, voidance.getAllVoidanceInvites); 
router.get('/:userName', isLoggedIn, isAccountOwner, voidance.getAllVoidances); 
router.get('/search/:id', isLoggedIn, voidance.getVoidanceById); 

router.post('/invites', isLoggedIn, isCompany, voidance.postVoidanceInvite); 
router.post('/:userName', isLoggedIn, isAccountOwner, upload.single('image'), voidance.createVoidance); 

router.patch('/:userName/invite/:id', isLoggedIn, isAccountOwner, voidance.voidanceUpdateStatus);

router.delete('/:userName/:id', isLoggedIn, isAccountOwner, voidance.deleteVoidance); 
router.delete('/:userName/invites/:id', isLoggedIn, isCompany, voidance.deleteVoidanceInvite); 

module.exports = router;
