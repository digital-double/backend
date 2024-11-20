const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/authorization.middleware');
const campaign = require('../controllers/campaign.controller')


router.get('/', isLoggedIn, campaign.getAllCampaigns);

router.get('/:id', (req, res) => {
  res.send(`Get advertisement with id: ${req.params.id}`);
});

router.post('/', isLoggedIn, campaign.createCampaign);

router.patch('/:id', isLoggedIn, campaign.updateCampaign);

router.delete('/:id', isLoggedIn, campaign.deleteCampaign);

router.patch('/:id/status', (req, res) => {
  res.send(`Update status for campaign with id: ${req.params.id}`);
});


module.exports = router;
