const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/authorization.middleware');
const campaign = require('../controllers/campaign.controller')


router.get('/', isLoggedIn, campaign.getAllCampaigns); //good

router.post('/', isLoggedIn, campaign.createCampaign); //good security middleware

router.patch('/:id', isLoggedIn, campaign.updateCampaign); //security middleware

router.delete('/:id', isLoggedIn, campaign.deleteCampaign); // security middleware



module.exports = router;
