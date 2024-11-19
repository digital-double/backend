const db = require('../models');

const { Company } = db 

// Get all companies
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
    console.error('Error retrieving companies:', err);
    return next(err);
  }
},

// Get a specific company by ID
exports.getCompanyById = async (req, res, next) =>{
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id, {
      attributes: {
        exclude: ['deletedAt','bankName','bankAccName',
            'bankAccNo','bankRoutingNo','paypalAcc','bankIban','bankPaymentStatus','createdAt','updatedAt'], 
      },
    });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    return res.status(200).json({
      message: 'Company retrieved successfully',
      data: company,
    });
  } catch (err) {
    console.error('Error retrieving company:', err);
    return next(err);
  }
},

// Create a new company
exports.createCompany= async (req, res, next) => {
  try {
    const newCompany = await Company.create(req.body);
    return res.status(201).json({
      message: 'Company created successfully',
      data: newCompany,
    });
  } catch (err) {
    console.error('Error creating company:', err);
    return next(err);
  }
},


// Update an existing company
exports.updateCompany = async (req, res, next) =>{
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    const updatedCompany = await company.update(req.body);
    return res.status(200).json({
      message: 'Company updated successfully',
      data: updatedCompany,
    });
  } catch (err) {
    console.error('Error updating company:', err);
    return next(err);
  }
},

// Delete a company (soft delete due to `paranoid: true`)
 exports.deleteCompany = async (req, res, next) =>{
   try {
     const { id } = req.params;
     const company = await Company.findByPk(id);
     if (!company) {
       return res.status(404).json({ message: 'Company not found' });
     }
     await company.destroy(); // Soft delete
     return res.status(200).json({
       message: 'Company deleted successfully',
     });
   } catch (err) {
     console.error('Error deleting company:', err);
     return next(err);
   }
 }