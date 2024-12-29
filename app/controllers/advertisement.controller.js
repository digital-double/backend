const db = require('../models');

const { Advertisement } = db;


// Get all advertisements for a specific campaign
exports.getAdvertisementsByCampaign = async (req, res, next) => {
    try {
      const { campaignID } = req.params;

      const advertisements = await Advertisement.findAll({
        where: { campaignID },
        attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] },
      });

      if (!advertisements) {
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
  
// Create a new advertisement for an existing campaign
exports.createAdvertisement = async (req, res, next) => {
    try {
      const { campaignID, title, Status, adStart, adEnd, alocatedBudget, description, avgCPC } = req.body;
  
      if (!campaignID) {
        throw new StatusError("campaign is required",400)
      }
  
      const advertisement = await Advertisement.create({
        campaignID,
        title,
        Status,
        adStart,
        adEnd,
        alocatedBudget,
        description,
        avgCPC,
      });
  
      return res.status(201).json({
        message: 'Advertisement created successfully',
        data: advertisement,
      });
    } catch (err) {
      return next(err);
    }
  };
 
  // Delete an advertisement
exports.deleteAdvertisement = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const advertisement = await Advertisement.findByPk(id);
      
      if (!advertisement) {
        throw new StatusError("advertisement",404)
      }
  
      await advertisement.destroy();
      return res.status(200).json({
        message: 'Advertisement deleted successfully',
      });
    } catch (err) {
      return next(err);
    }
  };
  
  // Get a specific advertisement by ID
exports.getAdvertisementById = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const advertisement = await Advertisement.findByPk(id, {
        attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] },
      });

      if (!advertisement) {
        throw new StatusError("advertisement",404)
      }
  
      return res.status(200).json({
        message: 'Advertisement retrieved successfully',
        data: advertisement,
      });
    } catch (err) {
      return next(err);
    }
  };
  