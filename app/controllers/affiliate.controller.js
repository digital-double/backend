const db = require('../models');
const { AffiliateLink } = db;

require('dotenv').config();

exports.registerClick = async (req, res, next) => {
    try {
        const { uniqueIdentifier } = req.params;
    
        const affiliateLink = await AffiliateLink.findOne({
          where: { link: `${process.env.BASE_URL}/affiliate/${uniqueIdentifier}` },
        });
    
        if (!affiliateLink || affiliateLink.lenght == 0) {
          return res.status(404).json({ message: 'Affiliate link not found.' });
        }
    
        affiliateLink.clicks += 1;
        await affiliateLink.save();
    
        return res.redirect(affiliateLink.redirectTo);
      } catch (err) {
        return next(err)
      }
}

exports.getAffiliateAnalytics = async (req, res, next) => {
    try {
        const { voidanceId } = req.params;
    
        const links = await AffiliateLink.findAll({
          where: { voidanceId },
          attributes: ['id', 'link', 'clicks', 'redirectTo'],
        });
    
        return res.status(200).json({
          message: 'Affiliate link analytics retrieved successfully.',
          data: links,
        });
      } catch (err) {
        return next (err)
      }
}