const db = require('../models');
const { AffiliateLink } = require('../models');
const crypto = require('crypto');

require('dotenv').config();

exports.generateAffiliateLink = async (voidanceID, redirectTo) => {
  try {
    const uniqueIdentifier = crypto.randomBytes(8).toString('hex'); // Generate a unique token
    const link = `${process.env.BASE_URL}/affiliate/${uniqueIdentifier}`;

    if(!voidanceID || !redirectTo) throw new StatusError("missing data", 400)

    const affiliateLink = await AffiliateLink.create({
      voidanceID,
      link,
      redirectTo,
    });

    return affiliateLink;
  } catch (error) {
    throw error;
  }
};

