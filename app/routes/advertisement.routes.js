const express = require('express');
const router = express.Router();
const advertisement = require( '../controllers/advertisement.controller.js');
const { isLoggedIn, isCompany, isAccountOwner } = require('../middlewares/authorization.middleware.js');
const {validateAdvertisementRequestBody} = require('../middlewares/validation.middleware.js');
const upload = require('../middlewares/upload.middleware.js')


router.get('/', isLoggedIn, advertisement.getAdvertisementById); 
router.get('/:id', isLoggedIn, advertisement.downloadImage);

router.post('/:userName', isLoggedIn, isAccountOwner, isCompany, validateAdvertisementRequestBody, upload.single('image'), advertisement.createAdvertisement); 


router.delete('/:userName', isLoggedIn, isCompany, isAccountOwner, advertisement.deleteAdvertisement); 

module.exports = router