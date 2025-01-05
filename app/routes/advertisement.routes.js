const express = require('express');
const router = express.Router();
const advertisement = require( '../controllers/advertisement.controller.js');
const { isLoggedIn } = require('../middlewares/authorization.middleware.js');
const upload = require('../middlewares/upload.middleware.js')

router.get('/:campaignID', isLoggedIn, advertisement.getAdvertisementsByCampaign); // good
router.get('/search/:id', isLoggedIn, advertisement.getAdvertisementById); //good

router.post('/', isLoggedIn, upload.single('image'), advertisement.createAdvertisement); //good

router.delete('/:id', isLoggedIn, advertisement.deleteAdvertisement); //good

module.exports = router