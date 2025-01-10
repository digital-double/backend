const db = require('../models');
const { AffiliateLink, ReferralIP  } = db;
const crypto = require("crypto");


require('dotenv').config();


function hashIPAddress(ipAddress) {
  const hash = crypto.createHash("sha256"); // Use a secure hashing algorithm
  hash.update(ipAddress);
  return hash.digest("hex");
}


exports.registerClick = async (req, res, next) => {
    try {
      const { uniqueIdentifier } = req.params;
      const ipAddress = req.ip;
      const hashedIP = hashIPAddress(ipAddress); 

      const affiliateLink = await AffiliateLink.findOne({
        where: { link: `${process.env.BASE_URL}/affiliate/${uniqueIdentifier}` },
      });
     
      if (!affiliateLink || affiliateLink.lenght == 0) {
        return res.status(404).json({ message: 'Affiliate link not found.' });
      }

      const existingClick = await ReferralIP.findOne({
        where: {
          affiliateLinkID: affiliateLink.id,
          hashedIPAddress: hashedIP,
        },
      });
      if(!existingClick){
        affiliateLink.clicks += 1;
        await affiliateLink.save();
        await ReferralIP.create({
          affiliateLinkID: affiliateLink.id,
          hashedIPAddress: hashedIP,
        });
      }

      return res.redirect(affiliateLink.redirectTo);
      } catch (err) {
        console.error(err)
        return next(err)
      }

      
}

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