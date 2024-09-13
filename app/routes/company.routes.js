const express = require('express');

const router = express.Router();


// Get Company object
router.get('/company', isLoggedIn, res.send('digital double user'));


module.exports = router;