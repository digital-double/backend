const db = require('../models');

const { CompanyAdmin, Company, Campaign } = db;

// Get all admin members of a certain company
exports.getCompanyAdmins = async (req, res, next) => {
    try {
      const { companyID } = req.body;
  
      const admins = await CompanyAdmin.findAll({
        where: { companyID },
        attributes: { exclude: ['password', 'deletedAt', 'createdAt', 'updatedAt'] },
      });
  
      return res.status(200).json({
        message: 'Admins retrieved successfully',
        data: admins,
      });
    } catch (err) {
      console.error('Error retrieving company admins:', err);
      return next(err);
    }
  };
 
  
// Create a new admin for a certain company
exports.createCompanyAdmin = async (req, res, next) => {
    try {
      const { companyID, email, accessRights } = req.body;
  
    
      if (!companyID || !email || !accessRights ) {
        throw new StatusError('Company ID, email, and accessRights are required to create an admin.', 400);
      }

      const adminExists = await CompanyAdmin.findOne({
        where: {
            companyID : companyID,
        }
      })

      if(adminExists){
        return false;
      }

      await CompanyAdmin.create({
      companyID,
      email,
      accessRights,
      });

      return true
    } catch (err) {
      console.error('Error creating company admin:', err);
      return next(err);
    }
  };
 
  
  // Delete an admin of a certain company
exports.deleteCompanyAdmin = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const admin = await CompanyAdmin.findByPk(id);
      if (!admin) {
        return res.status(404).json({
          message: 'Admin not found',
        });
      }
  
      await admin.destroy();
      return res.status(200).json({
        message: 'Admin deleted successfully',
      });
    } catch (err) {
      console.error('Error deleting company admin:', err);
      return next(err);
    }
  };
  

  // Update an admin of a certain company
exports.updateCompanyAdmin = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { email, password, accessRights } = req.body;
  
      const admin = await CompanyAdmin.findByPk(id);
      if (!admin) {
        return res.status(404).json({
          message: 'Admin not found',
        });
      }
  
      // Update fields
      admin.email = email || admin.email;
      if (password) {
        admin.password = password; // Note: Hash the password before updating it
      }
      admin.accessRights = accessRights || admin.accessRights;
  
      await admin.save();
  
      return res.status(200).json({
        message: 'Admin updated successfully',
        data: admin,
      });
    } catch (err) {
      console.error('Error updating company admin:', err);
      return next(err);
    }
  };
  