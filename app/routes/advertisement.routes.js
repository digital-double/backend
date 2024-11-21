const express = require('express');
const router = express.Router();
const advertisement = require( '../controllers/advertisement.controller.js');
const { isLoggedIn } = require('../middlewares/authorization.middleware.js');

router.get('/:campaignID', isLoggedIn, advertisement.getAdvertisementsByCampaign);
router.get('/search/:id', isLoggedIn, advertisement.getAdvertisementById);

router.post('/upload', isLoggedIn, advertisement.createAdvertisement);

router.delete('/:id', isLoggedIn, advertisement.deleteAdvertisement);



module.exports = router