const express = require('express');
const router = express.Router();
const { isLoggedIn, isCompany, isAccountOwner } = require('../middlewares/authorization.middleware');
const campaign = require('../controllers/campaign.controller')


router.get('/', isLoggedIn, isCompany, isAccountOwner, campaign.getAllCampaigns); 

router.post('/', isLoggedIn, isCompany, isAccountOwner, campaign.createCampaign); 

router.patch('/:id', isLoggedIn, isCompany, isAccountOwner, campaign.updateCampaign); 

router.delete('/:id', isLoggedIn, isCompany, isAccountOwner, campaign.deleteCampaign); 



module.exports = router;
