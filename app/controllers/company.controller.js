const db = require('../models');

const { Company } = db 


exports.getAllCompanies = async (req, res, next) => {
  try {
    const companies = await Company.findAll({
      attributes: {
        exclude: ['deletedAt',"description" ,'banner','websiteUrl','industry','bankName','bankAccName',
            'bankAccNo','bankRoutingNo','paypalAcc','bankIban','bankPaymentStatus','createdAt','updatedAt'], 
      },
    });
    return res.status(200).json({
      message: 'Companies retrieved successfully',
      data: companies,
    });
  } catch (err) {
    return next(err);
  }
},


exports.updateCompany = async (req, res, next) =>{
  try {
    const { companyID } = req.user;

    const company = await Company.findByPk(companyID);

    if (!company) {
      throw new StatusError("company",404)
    }

    const updatedCompany = await company.update(req.body);

    return res.status(200).json({
      message: 'Company updated successfully',
      data: updatedCompany,
    });

  } catch (err) {
    return next(err);
  }
},

exports.deleteCompany = async (req, res, next) =>{
   try {
     const { companyID } = req.user;

     const company = await Company.findByPk(companyID);

     if (!company) {
       throw new StatusError("company",404)
     }

     await company.destroy();

     return res.status(200).json({
       message: 'Company deleted successfully',
     });
   } catch (err) {
     return next(err);
   }
}

