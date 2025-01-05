const express = require('express');
const router = express.Router();
const { isLoggedIn, isAccountOwner, isCompany, isAdmin } = require('../middlewares/authorization.middleware');
const company  = require('../controllers/company.controller')
const companyAdmin  = require('../controllers/companyAdmin.controller')
const { checkUsername, checkEmail,} = require('../middlewares/validation.middleware.js');


router.get('/', isLoggedIn, company.getAllCompanies); 

router.post('/signup', checkUsername, checkEmail, company.createCompany, companyAdmin.createCompanyAdmin); 
// router.post('/members', isAdminOfCompany, admin.createCompanyMember);

router.patch('/:userName', isLoggedIn, isAccountOwner, company.updateCompany); 

router.delete('/:userName', isLoggedIn, isCompany, isAdmin, isAccountOwner, company.deleteCompany); 

module.exports = router;