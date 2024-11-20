const express = require('express');
const passport = require('passport');
const router = express.Router();
const user = require( '../controllers/user.controller.js');
const session = require('../controllers/session.controller.js');
const mailer = require('../controllers/mailer.controller.js');
const { isLoggedIn } = require('../middlewares/authorization.middleware.js');
const {
  checkUsername,
  checkEmail,
} = require('../middlewares/validation.middleware.js');

// Post login request
router.post('/login', passport.authenticate('local'), session.login);

// Post logout request
router.post('/logout', isLoggedIn, session.logout);

// patch User Password
router.patch('/updatePassword', isLoggedIn, user.updatePassword); 

// Update a User with id
router.patch('/:userName/update', isLoggedIn, user.updateOne);

// Set resetPassword attributes & send resetPasswordMail
router.post(
  '/resetPassword',
  user.setResetToken,
  mailer.sendResetPasswordInstructions
);

// update User password & login
router.post('/updatePassword/:token', user.replacePassword);

// Validate session cookie
router.get('/session', session.validateSession); 

// Get User object
router.get('/:userName', isLoggedIn, user.retrieveOne); 

// express signup
router.post(
  '/signup',
  checkUsername,
  checkEmail,
  user.expressSignup,
  passport.authenticate('local'),
  session.validationResponse
);

module.exports = router;