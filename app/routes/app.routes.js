const express = require('express');
const router = express.Router();
const app = require( '../controllers/app.controller.js');
const { isLoggedIn, isAccountOwner } = require('../middlewares/authorization.middleware.js');
const session = require('../controllers/session.controller.js');
const passport = require('passport');


router.get('/', isLoggedIn, app.getMain); //good
router.get('/filter', isLoggedIn, app.retrieveFiltered) // good
router.get('/:userName', isLoggedIn, app.getProfile) //good
router.get('/:userName/notification', isLoggedIn, isAccountOwner, app.getnotification) // broken due isadmindatabase

router.post('/login', passport.authenticate('local'), session.login); // good
router.post('/logout', isLoggedIn, session.logout); // good

module.exports = router