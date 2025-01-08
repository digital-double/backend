const express = require('express');
const passport = require('passport');
const router = express.Router();
const user = require( '../controllers/user.controller.js');
const session = require('../controllers/session.controller.js');
const mailer = require('../controllers/mailer.controller.js');
const { isLoggedIn } = require('../middlewares/authorization.middleware.js');
const { checkUsername, checkEmail,} = require('../middlewares/validation.middleware.js');

router.get('/session', session.validateSession); //good
router.get('/:userName', isLoggedIn, user.retrieveOne); // good but requires lower case sanitisation for data inputs

router.post('/updatePassword/:token', user.replacePassword); // good
router.post('/forgotPassword', user.setResetToken, mailer.sendResetPasswordInstructions); //broken
router.post('/signup', checkUsername, checkEmail, user.expressSignup, passport.authenticate('local'), session.validationResponse); //good

router.patch('/updatePassword', isLoggedIn, user.updatePassword); //good
router.patch('/:userName', isLoggedIn, user.updateOne); // good




module.exports = router;