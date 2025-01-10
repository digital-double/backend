const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/authorization.middleware.js');
const affiliate  = require('../controllers/affiliate.controller')


router.get('/:uniqueIdentifier', affiliate.registerClick); 

router.get('/analytics/:voidanceID', isLoggedIn,  affiliate.getAffiliateAnalytics);



module.exports = router;