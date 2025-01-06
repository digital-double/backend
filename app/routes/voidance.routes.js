const express = require('express');
const router = express.Router();
const voidance = require('../controllers/voidance.controller');
const { isLoggedIn, isCompany, isAccountOwner } = require('../middlewares/authorization.middleware');
const upload = require('../middlewares/upload.middleware.js')


router.get('/:userName/invites', isLoggedIn, isAccountOwner, voidance.getAllVoidanceInvites); //good
router.get('/:userName', isLoggedIn, isAccountOwner, voidance.getAllVoidances); //good
router.get('/search/:id', isLoggedIn, voidance.getVoidanceById); //good

router.post('/invites', isLoggedIn, isCompany, voidance.postVoidanceInvite); //good prob fucked as well
router.post('/:userName', isLoggedIn, isAccountOwner, upload.single('image'), voidance.createVoidance); //will come back to it

router.patch('/:userName/:id', isLoggedIn, isAccountOwner, voidance.voidanceUpdateStatus); // fucked

router.delete('/:userName/:id', isLoggedIn, isAccountOwner, voidance.deleteVoidance); // good
router.delete('/:userName/invites/:id', isLoggedIn, isCompany, voidance.deleteVoidanceInvite); //good

module.exports = router;
