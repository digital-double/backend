const db = require('../models');

const { Campaign, Company } = db

exports.getAllCampaigns = async (req, res, next)=>{
  const { companyID } = req.body
    try {
      const campaigns = await Campaign.findAll({
        where: { companyID: companyID }, 
        include: [
          {
            model: Company,
            required: true,
            attributes: ['companyName', 'logo'], 
          },
        ],
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
      const newCampaign = await Campaign.create(req.body);

      const createdCampaign = await Campaign.findOne({
        where: { id: newCampaign.id },
        include: [
          {
            model: Company,
            required: true,
            attributes: ['companyName', 'logo'], 
          },
        ],
        attributes: {
          exclude: ['deletedAt', 'createdAt'], 
        },
      });

      return res.status(201).json({
        message: 'Campaign created successfully',
        data: createdCampaign,
      });
    } catch (err) {
      return next(err);
    }
}

exports.updateCampaign = async (req, res, next) => {
    try {
      const { id } = req.params;

      const campaign = await Campaign.findByPk(id);
      if (!campaign) {
        throw new StatusError("campaign",404)
      }

      await campaign.update(req.body);

      const updatedCampaign = await Campaign.findOne({
        where: { id: campaign.id },
        include: [
          {
            model: Company,
            required: true,
            attributes: ['companyName', 'logo'], 
          },
        ],
        attributes: {
          exclude: ['deletedAt', 'createdAt', 'updatedAt'], 
        },
      });

      return res.status(200).json({
        message: 'Campaign updated successfully',
        data: updatedCampaign,
      });
    } catch (err) {
      return next(err);
    }
},

exports.deleteCampaign = async (req, res, next) => {
    try {
      const { id } = req.params;

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
