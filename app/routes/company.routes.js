const express = require('express');
const router = express.Router();
const { isLoggedIn, isAdminOfCompany } = require('../middlewares/authorization.middleware');
const company  = require('../controllers/company.controller')
const admin = require('../controllers/companyAdmin.controller')


router.get('/', isLoggedIn, company.getAllCompanies); //good
router.get('/search/:id', isLoggedIn, company.getCompanyById); //good
router.get('/:companyName', isLoggedIn, company.getProfile); //good

router.post('/',  company.createCompany); //update
// router.post('/members', isAdminOfCompany, admin.createCompanyMember);

router.patch('/:id', isLoggedIn, isAdminOfCompany, company.updateCompany); //good

router.delete('/:id', isLoggedIn, isAdminOfCompany, company.deleteCompany); // good

module.exports = router;