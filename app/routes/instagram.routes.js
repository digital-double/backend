const express = require('express');
const router = express.Router();
// const { isLoggedIn } = require('../middlewares/authorization.middleware');


router.get('/credentials', (req, res) => {
  res.send('Get all Instagram credentials route');
});


router.get('/credentials/:id', (req, res) => {
  res.send(`Get Instagram credentials with id: ${req.params.id}`);
});


router.post('/credentials', (req, res) => {
  res.send('Create new Instagram credentials route');
});


router.put('/credentials/:id', (req, res) => {
  res.send(`Update Instagram credentials with id: ${req.params.id}`);
});


router.delete('/credentials/:id', (req, res) => {
  res.send(`Delete Instagram credentials with id: ${req.params.id}`);
});


router.patch('/credentials/:id/link', (req, res) => {
  res.send(`Link/Unlink Instagram account for credentials with id: ${req.params.id}`);
});


router.get('/content', (req, res) => {
  res.send('Get all Instagram content route');
});


router.get('/content/:id', (req, res) => {
  res.send(`Get Instagram content with id: ${req.params.id}`);
});


router.post('/content', (req, res) => {
  res.send('Create new Instagram content route');
});


router.put('/content/:id', (req, res) => {
  res.send(`Update Instagram content with id: ${req.params.id}`);
});


router.delete('/content/:id', (req, res) => {
  res.send(`Delete Instagram content with id: ${req.params.id}`);
});

module.exports = router;
