const express = require('express');
const router = express.Router();
const stripe = require( '../controllers/stripe.controller.js');
const { isLoggedIn } = require('../middlewares/authorization.middleware.js');


router.post('/checkout', isLoggedIn, stripe.checkout) 
router.get('/checkout', isLoggedIn, stripe.getCheckout) 
router.post('/user', isLoggedIn, stripe.createUser) 

module.exports = router