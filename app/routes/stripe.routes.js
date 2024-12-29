const express = require('express');
const router = express.Router();
const stripe = require( '../controllers/stripe.controller.js');
const { isLoggedIn } = require('../middlewares/authorization.middleware.js');


router.post('/checkout', isLoggedIn, stripe.checkout) 

router.get('/checkout', isLoggedIn, stripe.getCheckout) 
router.get('/user', isLoggedIn, stripe.getStripeUser)

router.patch('/user', isLoggedIn, stripe.updateStripeUser)


router.delete('/user', isLoggedIn, stripe.delStripeUser)

module.exports = router