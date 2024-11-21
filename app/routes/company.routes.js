const express = require('express');
const router = express.Router();
const { isLoggedIn, isAdminOfCompany } = require('../middlewares/authorization.middleware');
const company  = require('../controllers/company.controller')
const admin = require('../controllers/companyAdmin.controller')


router.get('/', isLoggedIn, company.getAllCompanies);
router.get('/search/:id', isLoggedIn, company.getCompanyById);
router.get('/:companyName', isLoggedIn, company.getProfile);

router.post('/',  company.createCompany);
router.post('/members', isAdminOfCompany, admin.createCompanyMember);

router.patch('/:id', isLoggedIn, isAdminOfCompany, company.updateCompany);

router.delete('/:id', isLoggedIn, company.deleteCompany);

module.exports = router;