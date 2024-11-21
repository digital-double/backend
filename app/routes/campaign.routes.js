const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/authorization.middleware');
const campaign = require('../controllers/campaign.controller')


router.get('/', isLoggedIn, campaign.getAllCampaigns);

router.post('/', isLoggedIn, campaign.createCampaign);

router.patch('/:id', isLoggedIn, campaign.updateCampaign);

router.delete('/:id', isLoggedIn, campaign.deleteCampaign);



module.exports = router;
