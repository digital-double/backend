const express = require('express');
const router = express.Router();
const { isLoggedIn, isAdminOfCompany } = require('../middlewares/authorization.middleware');
const company  = require('../controllers/company.controller')
const admin = require('../controllers/companyAdmin.controller')

// Get all companies
router.get('/', isLoggedIn, company.getAllCompanies);

// Get a specific company
router.get('/search/:id', isLoggedIn, company.getCompanyById);

// Create a new company
router.post('/', isLoggedIn, company.createCompany);

// Update company profile
router.patch('/:id', isLoggedIn, isAdminOfCompany, company.updateCompany);

// Delete a company
router.delete('/:id', isLoggedIn, company.deleteCompany);

// get company Profile
router.get('/:companyName', isLoggedIn, company.getProfile);

// post company admin
router.post('/admin', isAdminOfCompany, admin.createCompanyAdmin);

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