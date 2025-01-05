const express = require('express');
const router = express.Router();
const { isLoggedIn, isCompany, isAccountOwner } = require('../middlewares/authorization.middleware');
const campaign = require('../controllers/campaign.controller')


router.get('/:userName/:campaignID', isLoggedIn, campaign.getAdvertisementsInCampaign);  
router.get('/:userName', isLoggedIn, isCompany, isAccountOwner, campaign.getAllCampaigns);

router.post('/:userName', isLoggedIn, isCompany, isAccountOwner, campaign.createCampaign); 

router.patch('/:userName', isLoggedIn, isCompany, isAccountOwner, campaign.updateCampaign); 

router.delete('/:userName', isLoggedIn, isCompany, isAccountOwner, campaign.deleteCampaign); 



module.exports = router;
