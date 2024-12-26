const express = require('express');
const router = express.Router();
// const { isLoggedIn } = require('../middlewares/authorization.middleware');


router.get('/credentials', (req, res) => {
  res.send('Get all Instagram credentials route');
});

router.post('/:id', (req, res) => {
  res.send('Create new Instagram credentials route');
});

router.patch('/credentials/:id/link', (req, res) => {
  res.send(`Link/Unlink Instagram account for credentials with id: ${req.params.id}`);
});

router.delete('/credentials/:id', (req, res) => {
  res.send(`Delete Instagram credentials with id: ${req.params.id}`);
});

module.exports = router;
