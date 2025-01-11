const express = require('express');
const router = express.Router();
const advertisement = require( '../controllers/advertisement.controller.js');
const { isLoggedIn, isCompany, isAccountOwner } = require('../middlewares/authorization.middleware.js');
const upload = require('../middlewares/upload.middleware.js')


router.get('/', isLoggedIn, advertisement.getAdvertisementById); 

router.post('/:userName', isLoggedIn, isAccountOwner, upload.single('image'), advertisement.createAdvertisement); 

//missing a patch route

router.delete('/:userName', isLoggedIn, isCompany, isAccountOwner, advertisement.deleteAdvertisement); 

module.exports = router