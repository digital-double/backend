const express = require('express');
const router = express.Router();
const app = require( '../controllers/app.controller.js');
const { isLoggedIn, isAccountOwner } = require('../middlewares/authorization.middleware.js');
const session = require('../controllers/session.controller.js');
const passport = require('passport');


router.get('/', isLoggedIn, app.getMain); 
router.get('/filter', isLoggedIn, app.retrieveFiltered) 
router.get('/:userName', isLoggedIn, app.getProfile) 
router.get('/:userName/notification', isLoggedIn, isAccountOwner, app.getnotification) 

router.post('/login', passport.authenticate('local'), session.login); 
router.post('/logout', isLoggedIn, session.logout); 

module.exports = router