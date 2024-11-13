const express = require('express');
const router = express.Router();
const app = require( '../controllers/app.controller.js');
const { isLoggedIn } = require('../middlewares/authorization.middleware.js');


router.get('/', isLoggedIn, app.getMain);

module.exports = router