const express = require('express');
const passport = require('passport');
const router = express.Router();
const user = require( '../controllers/user.controller.js');
const session = require('../controllers/session.controller.js');
const mailer = require('../controllers/mailer.controller.js');
const { isLoggedIn,isAccountOwner } = require('../middlewares/authorization.middleware.js');
const { checkUsername, checkEmail,} = require('../middlewares/validation.middleware.js');

router.get('/session', session.validateSession); 
router.get('/:userName', isLoggedIn, user.retrieveOne); 

router.post('/updatePassword/:token', user.replacePassword); 
router.post('/forgotPassword', user.setResetToken, mailer.sendResetPasswordInstructions); 
router.post('/signup', checkUsername, checkEmail, user.expressSignup, passport.authenticate('local'), session.validationResponse); 

router.patch('/updatePassword/:userName', isLoggedIn, isAccountOwner, user.updatePassword); 
router.patch('/:userName', isLoggedIn, isAccountOwner, user.updateOne); 




module.exports = router;