const db = require('../models');
const {createStripeCustomer, createStripeAccount} = require('./stripe.controller')

const { CompanyAdmin, Company } = db;


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

exports.createCompanyAndAdmin = async (req, res, next) => {
    try{
      const stripeId = await createStripeCustomer(req, res, next)
      const accountId = await createStripeAccount(req, "company")
      req.body.stripeId = stripeId.id
      req.body.accountId = accountId.id

      const data = await Company.createCompany(req)

      const {email, password} = req.body
      const { id, userName } = data;

      const adminData = await CompanyAdmin.createNewAdmin(id, userName, email, password, "admin")


      return res.status(200).json({
        message:"company registered successfully",
        adminData: {
          id: adminData.id,
          userName: adminData.userName,
          accessRights: adminData.accessRights,
          company: req.companyData,
        }
      })
    }
    catch(err){
      console.error(err)
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
  