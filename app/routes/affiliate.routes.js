const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/authorization.middleware.js');
const affiliate  = require('../controllers/affiliate.controller')


router.get('/:uniqueIdentifier', affiliate.registerClick); //good

router.get('/affiliate-analytics/:voidanceId',  affiliate.getAffiliateAnalytics); //good



module.exports = router;