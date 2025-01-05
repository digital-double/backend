const express = require('express');
const router = express.Router();
const advertisement = require( '../controllers/advertisement.controller.js');
const { isLoggedIn, isCompany, isAccountOwner } = require('../middlewares/authorization.middleware.js');
const upload = require('../middlewares/upload.middleware.js')


router.get('/:userName', isLoggedIn, advertisement.getAdvertisementById); //good

router.post('/:userName', isLoggedIn, upload.single('image'), advertisement.createAdvertisement); //good

//missing a patch route

router.delete('/:userName', isLoggedIn, isCompany, isAccountOwner, advertisement.deleteAdvertisement); //good

module.exports = router