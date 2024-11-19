const db = require('../models');

const { Campaign, Company } = db

exports.getAllCampaigns = async (req, res, next)=>{
  // Get all campaign
  const { companyID } = req.body
    try {
      const campaigns = await Campaign.findAll({
        where: { companyID: companyID }, // Example filter: Only active campaigns
        include: [
          {
            model: Company,
            required: true,
            attributes: ['companyName', 'logo'], // Include only necessary fields from Company
          },
        ],
        attributes: {
          exclude: ['deletedAt', 'createdAt', 'updatedAt', 'companyID'], // Exclude unwanted fields
        },
      });

      return res.status(200).json({
        message: 'Campaigns retrieved successfully',
        data: campaigns,
      });
    } catch (err) {
      console.error('Error retrieving campaigns:', err);
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
            attributes: ['companyName', 'logo'], // Include only necessary fields from Company
          },
        ],
        attributes: {
          exclude: ['deletedAt', 'createdAt'], // Exclude unwanted fields
        },
      });

      return res.status(201).json({
        message: 'Campaign created successfully',
        data: createdCampaign,
      });
    } catch (err) {
      console.error('Error creating campaign:', err);
      return next(err);
    }
}

  // Update an existing campaign
 exports.updateCampaign = async (req, res, next) => {
    try {
      const { id } = req.params;

      const campaign = await Campaign.findByPk(id);
      if (!campaign) {
        return res.status(404).json({ message: 'Campaign not found' });
      }

      await campaign.update(req.body);

      const updatedCampaign = await Campaign.findOne({
        where: { id: campaign.id },
        include: [
          {
            model: Company,
            required: true,
            attributes: ['companyName', 'logo'], // Include only necessary fields from Company
          },
        ],
        attributes: {
          exclude: ['deletedAt', 'createdAt', 'updatedAt'], // Exclude unwanted fields
        },
      });

      return res.status(200).json({
        message: 'Campaign updated successfully',
        data: updatedCampaign,
      });
    } catch (err) {
      console.error('Error updating campaign:', err);
      return next(err);
    }
  },

  // Delete a campaign
  exports.deleteCampaign = async (req, res, next) => {
    try {
      const { id } = req.params;

      const campaign = await Campaign.findByPk(id);
      if (!campaign) {
        return res.status(404).json({ message: 'Campaign not found' });
      }

      await campaign.destroy(); // Soft delete due to `paranoid: true`

      return res.status(200).json({
        message: 'Campaign deleted successfully',
      });
    } catch (err) {
      console.error('Error deleting campaign:', err);
      return next(err);
    }
  }
