const express = require('express');
const router = express.Router();
const app = require( '../controllers/app.controller.js');
const { isLoggedIn, isAccountOwner } = require('../middlewares/authorization.middleware.js');


router.get('/', isLoggedIn, app.getMain); //good
router.get('/filter', isLoggedIn, app.retrieveFiltered) // broken
router.get('/:userName', isLoggedIn, app.getProfile) //good
router.get('/:userName/notification', isLoggedIn, isAccountOwner, app.getnotification) // broken due isadmindatabase

module.exports = router