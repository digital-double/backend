const db = require('../models');

const { Advertisement } = db;

exports.createAdvertisement = async (req, res, next) => {
  try {
    const { campaignID, title, Status, adStart, adEnd, 
      alocatedBudget, description, avgCPC, name } = req.body;

    if (!campaignID || !title || !Status || !adStart || !adEnd || 
      !alocatedBudget || !description || !avgCPC || !name)
      {
        throw new StatusError("Missing data", 400);
      }

    const advertisement = await Advertisement.create({
      ...req.body,
      imagePath: req.file.path, // File path saved by multer
    });

    return res.status(201).json({
      message: 'Advertisement created successfully',
      data: advertisement,
    });
  } catch (err) {
    return next(err);
  }
};


exports.deleteAdvertisement = async (req, res, next) => {
    try {
      const { id } = req.body;
  
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
  

exports.getAdvertisementById = async (req, res, next) => {
    try {
      const { id } = req.body;
  
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
  