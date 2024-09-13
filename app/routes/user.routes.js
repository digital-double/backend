const express = require('express');

const router = express.Router();
const { isLoggedIn } = require('../middlewares/authorization.middleware');


// Get User object
router.get('/user', isLoggedIn, res.send('digital double user'));


module.exports = router;