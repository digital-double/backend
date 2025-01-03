const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/authorization.middleware');
const category = require('../controllers/category.controller')



router.post('/', isLoggedIn, category.postUserCategory); 
router.get('/', isLoggedIn, category.getUserCategory); 
router.get('/models', isLoggedIn, category.getCategoryUsers);

router.delete('/', isLoggedIn, category.deleteCategoriesByTypes); 


module.exports = router;