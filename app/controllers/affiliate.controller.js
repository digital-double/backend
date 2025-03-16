const db = require('../models');
const { AffiliateLink, ReferralIP  } = db;

require('dotenv').config();

exports.registerClick = async (req, res, next) => {
  try {
      const { affiliateLink, hashedIP } = req;

      const existingClick = await ReferralIP.findOne({
          where: {
              affiliateLinkID: affiliateLink.id,
              hashedIPAddress: hashedIP,
          },
      });

      if (!existingClick) {
          affiliateLink.clicks += 1;
          await affiliateLink.save();
          await ReferralIP.create({
              affiliateLinkID: affiliateLink.id,
              hashedIPAddress: hashedIP,
          });
      }

      return res.redirect(affiliateLink.redirectTo);
  } catch (err) {
      next(err);
  }
};

exports.getAffiliateAnalytics = async (req, res, next) => {
    try {
        const { voidanceID } = req.params;
    
        const links = await AffiliateLink.findAll({
          where: { voidanceID },
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