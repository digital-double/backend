const db = require('../models');
const path = require('path');
const fs = require('fs');

const { Advertisement } = db;

exports.createAdvertisement = async (req, res, next) => {
  try {

    const advertisement = await Advertisement.create({
      ...req.body,
      imagePath: req.file.path, S
    });

    return res.status(201).json({
      message: 'Advertisement created successfully',
      data: advertisement,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

exports.downloadImage = async (req, res) => {
  try {
      const { id } = req.params;
      const advertisement = await Advertisement.findByPk(id);

      if (!advertisement || !advertisement.imagePath) {
          return res.status(404).json({ error: 'Image not found' });
      }

      const imagePath = path.resolve(advertisement.imagePath);

      if (!fs.existsSync(imagePath)) {
          return res.status(404).json({ error: 'Image file not found on server' });
      }

      res.sendFile(imagePath);
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
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
  