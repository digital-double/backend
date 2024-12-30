const db = require('../models');

const { CompanyAdmin, Company, Campaign } = db;


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
      return next(err);
    }
};
   
exports.checkCompanyAdmin = async (req, res, next) => {
    try {
      const { companyID, email } = req.body;
     
      if (!companyID || !email ) {
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

      return true
    } 
    catch (err) {
      return next(err);
    }
};

exports.postCompanyAdmin = async (req, res, next, user) => {
    try{
      const { companyID, email } = req.body;
      await CompanyAdmin.create({
        companyID,
        email,
        accessRights : 'Admin',
        userID : user.id
      });
    }
    catch(err){
      return next(err);
    }
}
 
exports.deleteCompanyAdmin = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const admin = await CompanyAdmin.findByPk(id);

      if (!admin) {
        throw new StatusError('admin', 404);
      }
  
      await admin.destroy();
      return res.status(200).json({
        message: 'Admin deleted successfully',
      });
    } catch (err) {
      return next(err);
    }
};
  
exports.updateCompanyAdmin = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { email, password, accessRights } = req.body;
  
      const admin = await CompanyAdmin.findByPk(id);
      if (!admin) {
        throw new StatusError('admin', 404);
      }

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
      return next(err);
    }
};
  