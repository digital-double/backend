const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/authorization.middleware');
const advertisement = require('../controllers/advertisement.controller')

// Get all advertisements
router.get('/', isLoggedIn, advertisement.getAllCampaigns);

// Get a specific advertisement
router.get('/:id', (req, res) => {
  res.send(`Get advertisement with id: ${req.params.id}`);
});

// Create a new advertisement
router.post('/', isLoggedIn, advertisement.createCampaign);

// Update an advertisement
router.put('/:id', isLoggedIn, advertisement.updateCampaign);

// Delete an advertisement
router.delete('/:id', isLoggedIn, advertisement.deleteCampaign);

// Update advertisement status
router.patch('/:id/status', (req, res) => {
  res.send(`Update status for advertisement with id: ${req.params.id}`);
});

// Update advertisement budget
router.patch('/:id/budget', (req, res) => {
  res.send(`Update budget for advertisement with id: ${req.params.id}`);
});

// Update advertisement metrics (conversions, leads, etc.)
router.patch('/:id/metrics', (req, res) => {
  res.send(`Update metrics for advertisement with id: ${req.params.id}`);
});

// Update advertisement engagement (likes, comments)
router.patch('/:id/engagement', (req, res) => {
  res.send(`Update engagement for advertisement with id: ${req.params.id}`);
});

module.exports = router;
