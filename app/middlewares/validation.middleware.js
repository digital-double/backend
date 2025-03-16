const { body, validationResult } = require('express-validator');
const {hashIPAddress} = require('../util/IpHashing');
const db = require('../models');
const { AffiliateLink } = db;


exports.checkEmail = (req, _res, next) => {
  return body('email')
    .isEmail()
    .run(req)
    .then(() => {
      if (!validationResult(req).isEmpty())
        return next(new StatusError('Invalid email', 422));
      return next();
    });
};

exports.checkUsername = (req, _res, next) => {
  return body('userName')
    .matches(/^[a-z0-9-_.]{4,20}$/i)
    .run(req)
    .then(() => {
      if (!validationResult(req).isEmpty())
        return next(new StatusError('Invalid username', 422));
      return next();
    });
};

exports.validateAdvertisementRequestBody = (req, _res, next) => {
    const requiredFields = [
      'campaignID',
      'title',
      'Status',
      'adStart',
      'adEnd',
      'alocatedBudget',
      'description',
      'avgCPC',
      'name',
    ];
  
    const missingFields = requiredFields.filter(field => !req.body[field]);
  
    if (missingFields.length > 0) {
      throw new StatusError(`Missing required fields: ${missingFields.join(', ')}`, 400);
    }

    next();
}

exports.checkAffiliateLinkExists = async (req, res, next) => {
  try {
      const { uniqueIdentifier } = req.params;
      const hashedIP = hashIPAddress(req.ip);

      const affiliateLink = await AffiliateLink.findOne({
          where: { link: `${process.env.BASE_URL}/affiliates/${uniqueIdentifier}` },
      });

      if (!affiliateLink) {
          throw new StatusError({message: 'Affiliate link not found.'}, 400);
      }

      req.affiliateLink = affiliateLink;
      req.hashedIP = hashedIP;
      
      next();
  } catch (err) {
      next(err);
  }
};
