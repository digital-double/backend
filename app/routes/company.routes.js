const express = require('express');
const router = express.Router();
const { isLoggedIn, isAdminOfCompany, isAccountOwner } = require('../middlewares/authorization.middleware');
const company  = require('../controllers/company.controller')


router.get('/', isLoggedIn, company.getAllCompanies); //good

router.post('/',  company.createCompany); //update
// router.post('/members', isAdminOfCompany, admin.createCompanyMember);

router.patch('/:id', isLoggedIn, isAccountOwner, company.updateCompany); //good  security missing

router.delete('/:id', isLoggedIn, isAccountOwner, isAdminOfCompany, company.deleteCompany); // good security missing

module.exports = router;