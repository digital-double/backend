const express = require('express');

const router = express.Router();
// const { isLoggedIn } = require('../middlewares/authorization.middleware');

// Get all companies
router.get('/', (req, res) => {
  res.send('Get all companies route');
});

// Get a specific company
router.get('/:id', (req, res) => {
  res.send(`Get company with id: ${req.params.id}`);
});

// Create a new company
router.post('/', (req, res) => {
  res.send('Create new company route');
});

// Update company profile
router.put('/:id', (req, res) => {
  res.send(`Update company with id: ${req.params.id}`);
});

// Update company logo
router.patch('/:id/logo', (req, res) => {
  res.send(`Update logo for company with id: ${req.params.id}`);
});

// Update company banner
router.patch('/:id/banner', (req, res) => {
  res.send(`Update banner for company with id: ${req.params.id}`);
});

// Update company verification status
router.patch('/:id/verification', (req, res) => {
  res.send(`Update verification status for company with id: ${req.params.id}`);
});

// Update number of running ads
router.patch('/:id/running-ads', (req, res) => {
  res.send(`Update number of running ads for company with id: ${req.params.id}`);
});

// Update company bank details
router.patch('/:id/bank-details', (req, res) => {
  res.send(`Update bank details for company with id: ${req.params.id}`);
});

// Update company PayPal account
router.patch('/:id/paypal', (req, res) => {
  res.send(`Update PayPal account for company with id: ${req.params.id}`);
});

// Update company bank payment status
router.patch('/:id/payment-status', (req, res) => {
  res.send(`Update bank payment status for company with id: ${req.params.id}`);
});

// Delete a company
router.delete('/:id', (req, res) => {
  res.send(`Delete company with id: ${req.params.id}`);
});

// Get company settings
router.get('/:id/settings', (req, res) => {
  res.send(`Get settings for company with id: ${req.params.id}`);
});

// Update company settings
router.put('/:id/settings', (req, res) => {
  res.send(`Update settings for company with id: ${req.params.id}`);
});

// Get all FAQs for a company
router.get('/:id/faq', (req, res) => {
  res.send(`Get all FAQs for company with id: ${req.params.id}`);
});

// Get a specific FAQ for a company
router.get('/:id/faq/:faqId', (req, res) => {
  res.send(`Get FAQ with id: ${req.params.faqId} for company with id: ${req.params.id}`);
});

// Create a new FAQ for a company
router.post('/:id/faq', (req, res) => {
  res.send(`Create new FAQ for company with id: ${req.params.id}`);
});

// Update a FAQ for a company
router.put('/:id/faq/:faqId', (req, res) => {
  res.send(`Update FAQ with id: ${req.params.faqId} for company with id: ${req.params.id}`);
});

// Delete a FAQ for a company
router.delete('/:id/faq/:faqId', (req, res) => {
  res.send(`Delete FAQ with id: ${req.params.faqId} for company with id: ${req.params.id}`);
});

module.exports = router;