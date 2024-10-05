const express = require('express');

const router = express.Router();

const userRoutes = require('./user.routes');
const companyRoutes = require('./company.routes');
const voidanceRoutes = require('./voidance.routes');
const advertisementRoutes = require('./advertisement.routes');
const instagramRoutes = require('./instagram.routes');

// this file acts as the main router for all incoming requests
router.get('/', (_req, res) => {
  res.send('digital double');
});

router.post('/csp-reports', (req, res) => {
  console.error(req.body);
  res.status(204).end();
});

router.use('/users', userRoutes);
router.use('/companies', companyRoutes);
router.use('/voidance', voidanceRoutes);
router.use('/advertisements', advertisementRoutes);
router.use('/instagram', instagramRoutes);

module.exports = router;