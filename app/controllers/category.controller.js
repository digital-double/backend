const db = require('../models');

const { User, Category } = db
const { Op } = require('sequelize');


exports.postUserCategory = async (req, res, next)=>{
    try{   
        const {id} = req.user
        const {type} = req.body

        if(!Array.isArray(type)) throw new StatusError("Data mismatch", 400) 

        const user = await User.findByPk(id);

        type.forEach(async data => {
            const category = await Category.findOne({where: { type: data,}}) 
            await user.addCategory(category)
        })
        
        return res.status(200).json({
            message: 'category posted successfully',
          });
    }catch (err) {
        return next(err);
    }
  }

  exports.getUserCategory = async (req, res, next)=>{
    try{
        const {id} = req.user
        const user = await User.findByPk(id, {
            include: {
              model: Category,
              through: { attributes: [] }, // Exclude UserCategory-specific fields
            },
          });

        if(!user) throw new StatusError("category", 404); 
        
        const data = user.Categories

        return res.status(200).json({
            message: 'category retrieved successfully',
            data,
          });
    }catch (err) {
        return next(err);
    }
  }

  exports.getCategoryUsers = async (req, res, next)=>{
    try{
        const {type} = req.body
        const category = await Category.findOne({
            where: { type: type },
            include: {
              model: User,
              through: { attributes: [] },
            },
          });

          if(!category) throw new StatusError("models", 404);
          
          const data = category.Users

        return res.status(200).json({
            message: 'all users retrieved successfully',
            data,
          });
    }catch (err) {
        return next(err);
    }
  }

  exports.deleteCategoriesByTypes = async (req, res, next) => {
    try {
        const {type} = req.body

        if (!Array.isArray(type)) throw new Error('Input data mismatch', 400);
  
        await Category.destroy({
            where: {
            type: {
                [Op.in]: type,
            },
            },
        });
  
      return res.status(200).json({
        message: 'categories deleted successfully',
      });
    } catch (error) {
        return next(err);
    }
  };

