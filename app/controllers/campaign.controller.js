const db = require('../models');

const { Campaign, Company,Advertisement } = db

exports.getAllCampaigns = async (req, res, next)=>{
  const { companyID } = req.user
    try {
      const campaigns = await Campaign.findAll({
        where: { companyID: companyID }, 
        attributes: {
          exclude: ['deletedAt', 'createdAt', 'updatedAt', 'companyID'], 
        },
      });
      
      if (campaigns.length == 0) {
        throw new StatusError("campaign",404)
      }

      return res.status(200).json({
        message: 'Campaigns retrieved successfully',
        data: campaigns,
      });
    } catch (err) {
      return next(err);
    }
},

exports.createCampaign = async (req, res, next) => {
    try {
      const {title, description, totalBudget, campaignStatus, campaignStart, campaignEnd} = req.body

      if(!title || !description || !totalBudget || !campaignStatus || !campaignStart || !campaignEnd){
        throw new StatusError("missing input", 400)
      }
      
      const newCampaign = await Campaign.create(req.body);

      return res.status(201).json({
        message: 'Campaign created successfully',
        data: newCampaign,
      });
    } catch (err) {
      return next(err);
    }
}

exports.updateCampaign = async (req, res, next) => {
    try {
      const { id } = req.body;

      const campaign = await Campaign.findByPk(id);
      if (!campaign) {
        throw new StatusError("campaign",404)
      }

      const updatedCampaign = await campaign.update(req.body);


      return res.status(200).json({
        message: 'Campaign updated successfully',
        data: updatedCampaign,
      });
    } catch (err) {
      return next(err);
    }
},

exports.getAdvertisementsInCampaign = async (req, res, next) => {
  try {
    const { campaignID } = req.params;

    const advertisements = await Advertisement.findAll({
      where: { campaignID },
      attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] },
    });

    if (!advertisements || advertisements.length == 0) {
      throw new StatusError("advertisements",404)
    }

    return res.status(200).json({
      message: 'Advertisements retrieved successfully',
      data: advertisements,
    });
  } catch (err) {
    return next(err); 
  }
};

exports.deleteCampaign = async (req, res, next) => {
    try {
      const { id } = req.body;

      const campaign = await Campaign.findByPk(id);

      if (!campaign) {
        throw new StatusError("campaign",404)
      }

      await campaign.destroy(); 

      return res.status(200).json({
        message: 'Campaign deleted successfully',
      });
    } catch (err) {
      return next(err);
    }
}
