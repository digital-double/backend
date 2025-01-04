const { AffiliateLink } = require('../models');
const crypto = require('crypto');

exports.generateAffiliateLink = async (voidanceId, redirectTo) => {
  try {
    const uniqueIdentifier = crypto.randomBytes(8).toString('hex'); // Generate a unique token
    const link = `${process.env.BASE_URL}/affiliate/${uniqueIdentifier}`;

    const affiliateLink = await AffiliateLink.create({
      voidanceId,
      link,
      redirectTo,
    });

    return affiliateLink;
  } catch (error) {
    console.error('Error generating affiliate link:', error);
    throw error;
  }
};
