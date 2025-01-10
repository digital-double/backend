const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const affiliateRoutes = require('./affiliate.routes');
const companyRoutes = require('./company.routes');
const voidanceRoutes = require('./voidance.routes');
const campaignRoutes = require('./campaign.routes');
const instagramRoutes = require('./instagram.routes');
const categoryRoutes = require('./category.routes');
const advertisementRoutes = require('./advertisement.routes')
const appRoutes = require('./app.routes');
const stripeRoutes = require('./stripe.routes');

const path = require('path');
const viewsPath = path.join(__dirname, '../../public');
router.use(express.static(viewsPath));
// this file acts as the main router for all incoming requests
router.get('/', (_req, res) => {
  res.sendFile(path.join(viewsPath, 'index.html'));
});

router.use('/app', appRoutes)
router.use('/affiliates', affiliateRoutes)
router.use('/users', userRoutes);
router.use('/cats', categoryRoutes);
router.use('/orgs', companyRoutes);
router.use('/ads',advertisementRoutes)
router.use('/vds', voidanceRoutes);
router.use('/campaigns', campaignRoutes);
router.use('/instagram', instagramRoutes);
router.use('/payments', stripeRoutes);

router.post('/csp-reports', (req, res) => {
  console.error(req.body);
  res.status(204).end();
});

module.exports = router;
