const express = require('express');
const router = express.Router();
const { isLoggedIn, isAccountOwner } = require('../middlewares/authorization.middleware');
const company  = require('../controllers/company.controller')
const companyAdmin  = require('../controllers/companyAdmin.controller')
const { checkUsername, checkEmail,} = require('../middlewares/validation.middleware.js');


router.get('/', isLoggedIn, company.getAllCompanies); //good

router.post('/signup', checkUsername, checkEmail, company.createCompany, companyAdmin.createCompanyAdmin); 
// router.post('/members', isAdminOfCompany, admin.createCompanyMember);

router.patch('/:id', isLoggedIn, isAccountOwner, company.updateCompany); //good  security missing

router.delete('/:id', isLoggedIn, isAccountOwner, company.deleteCompany); // good security missing

module.exports = router;