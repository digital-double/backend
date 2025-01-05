const db = require('../models');

const { Company, Campaign } = db 


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

exports.createCompany= async (req, res, next) => {
  try {
    const {userName, companyName, password} = req.body

    if(!userName || !companyName || !password){
      throw new StatusError("missing data", 409)
    }

    const newCompany = await Company.create(req.body);
    req.companyData = newCompany;
    next();
  } catch (err) {
    return next(err);
  }
},

exports.updateCompany = async (req, res, next) =>{
  try {
    const { id } = req.body;

    const company = await Company.findByPk(id);

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
     const { id } = req.body;

     const company = await Company.findByPk(id);

     if (!company) {
       throw new StatusError("campaign",404)
     }

     await company.destroy();

     return res.status(200).json({
       message: 'Company deleted successfully',
     });
   } catch (err) {
     return next(err);
   }
}

