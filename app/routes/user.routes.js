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



// express signup
router.post(
  '/signup',
  checkUsername,
  checkEmail,
  user.expressSignup,
  passport.authenticate('local'),
  session.validationResponse
);

// Get all users
router.get('/', (req, res) => {
  res.send('Get all users route');
});

// Get a specific user
router.get('/:id', (req, res) => {
  res.send(`Get user with id: ${req.params.id}`);
});


// Update user profile
router.put('/:id', (req, res) => {
  res.send(`Update user with id: ${req.params.id}`);
});

// Update user address
router.patch('/:id/address', (req, res) => {
  res.send(`Update address for user with id: ${req.params.id}`);
});

// Delete a user
router.delete('/:id', (req, res) => {
  res.send(`Delete user with id: ${req.params.id}`);
});

// Ban/Unban a user
router.patch('/:id/ban', (req, res) => {
  res.send(`Ban/Unban user with id: ${req.params.id}`);
});

// Update user's engagement score
router.patch('/:id/engagement', (req, res) => {
  res.send(`Update engagement score for user with id: ${req.params.id}`);
});

// Update user's balance
router.patch('/:id/balance', (req, res) => {
  res.send(`Update balance for user with id: ${req.params.id}`);
});

// Get user settings
router.get('/:id/settings', (req, res) => {
  res.send(`Get settings for user with id: ${req.params.id}`);
});

// Update user settings
router.put('/:id/settings', (req, res) => {
  res.send("Update settings");
});

// Get all FAQs for a user
router.get('/:id/faq', (req, res) => {
  res.send(`Get all FAQs for user with id: ${req.params.id}`);
});

// Update a FAQ for a user
router.put('/:id/faq', (req, res) => {
  res.send("Update FAQ ");
});

// Delete a FAQ for a user
router.delete('/:id/faq', (req, res) => {
  res.send("Delete FAQ");
});

module.exports = router;