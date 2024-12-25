const express = require('express');
const router = express.Router();
const app = require( '../controllers/app.controller.js');
const { isLoggedIn } = require('../middlewares/authorization.middleware.js');


router.get('/', isLoggedIn, app.getMain); //good
router.get('/filter', isLoggedIn, app.retrieveFiltered) // broken
router.get('/:userName', isLoggedIn, app.getProfile) //good
router.get('/notification/:userID', isLoggedIn, app.getVoidanceInvites) //good

module.exports = router