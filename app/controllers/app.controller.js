const db = require('../models');
const { Op } = require('sequelize');

const { Advertisement, Company, Campaign, User, Voidance, VoidanceInvite, ContactUs, CompanyAdmin} = db;

exports.getMain = async (req, res, next) => {
  try {
    const advertisements = await Advertisement.findAll({
      where: {
          Status: true 
      },
      include: [
          {
              model: Campaign,
              required: true,
              include: [
                  {
                      model: Company,
                      required: true,
                  }
              ]
          }
      ],
  });

    // Convert each advertisement to a plain JavaScript object and select required company fields
    const response = advertisements.map(item => {
    const ad = item.toJSON();
    const { Campaign, createdAt, updatedAt, deletedAt, companyID, ...rest } = ad; // Exclude additional fields
    const company = Campaign?.Company ? { companyName: Campaign.Company.companyName, logo: Campaign.Company.logo } : null;

    return {
      ...rest,
      company  // Include only companyName and logo
    };
  });

  return res.status(200).json({
    message: 'Contents retrieved',
    data: response,
  });
      
    } catch (err) {
      return next(err);
    }
};

exports.getProfile = async (req, res, next) =>{
    try {
      const { userName } = req.params
      
      const [user, company] = await Promise.all([
        User.findOne({
          where: { userName },
          attributes: { exclude: ['password'] }, 
        }),
        Company.findOne({ 
          where: { userName }, 
          attributes: {
            exclude: [
              'bankName',
              'bankAccName',
              'bankAccNo',
              'bankRoutingNo',
              'paypalAcc',
              'bankIban',
              'bankPaymentStatus',
              'createdAt',
              'updatedAt',
              'deletedAt',
            ],
          },
        }),
      ]);

      

      if(company){
      const campaigns = await Campaign.findAll({
        where: { companyID: company.dataValues.id },
        attributes: {
          exclude: [
            'potentialReach',
            'potentialEngagement',
            'actualEngagement',
            'createdAt',
            'updatedAt',
            'deletedAt',
            'numOfConversions',
          ],
        },
      });
  
      return res.status(200).json({
        message: 'Company data retrieved successfully',
        data: {
          profile: company,
          campaigns,
        },
      });
     }
  
      if (!user) {
        throw new StatusError(`Username ${userName}`, 404);
      }
      
      console.log(user.id )
      const voidances = await Voidance.findAll({
        where: { userID: user.id },
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'deletedAt',
            'qualityScore',
          ],
        }
      });
      

      return res.status(200).json({
        message: 'User data retrieved successfully',
        data: {
          user,
          voidances,
        },
      });
    } catch (err) {
      console.error(err)
      return next(err);
    }
    
};

exports.getnotification = async (req, res, next) => {
  try {
    const { id, isCompany } = req.user;
    const {userName} = req.user 

    if (isCompany) {
      const contactUsObjects = await ContactUs.findAll({
        where: { userID: id },
        attributes: {
          exclude: ['updatedAt', 'deletedAt'],
        },
        include: [
          {
            model: User,
            attributes: ['userName', 'email'], 
          },
          {
            model: Advertisement,
            attributes: ['id', 'title'], 
          },
        ],
      });

      if (!contactUsObjects || contactUsObjects.length === 0) {
        throw new StatusError(`No ContactUs records found`, 404);
      }

      return res.status(200).json({
        message: 'ContactUs data retrieved successfully.',
        data: contactUsObjects,
      });
    }

    const voidanceInvites = await VoidanceInvite.findAll({
      where: { userId: id },
      attributes: {
        exclude: ['updatedAt', 'deletedAt'], 
      },
      include: [
        {
          model: Company,
          attributes: ['companyName'], 
        },
        {
          model: Advertisement,
          attributes: ['id', 'title'], 
        },
      ],
    });

    if (!voidanceInvites || voidanceInvites.length === 0) {
      throw new StatusError(`VoidanceInvites`, 404);
    }

    return res.status(200).json({
      message: 'VoidanceInvites retrieved successfully.',
      data: voidanceInvites,
    });
  } catch (err) {
    return next(err); 
  }
};

exports.retrieveFiltered = async (req, res, next) => {
  try {
    // Extract filters from the request
    const { advertisementFilters = {}, companyFilters = {}, campaignFilters = {} } = req.body;

    // Build advertisement conditions dynamically
    const advertisementConditions = {};
    if ('cpc' in advertisementFilters) {
      advertisementConditions.avgCPC = { [Op.lte]: advertisementFilters.cpc };
    }
    if ('budget' in advertisementFilters) {
      advertisementConditions.alocatedBudget = { [Op.lte]: advertisementFilters.budget };
    }
    if ('startDate' in advertisementFilters) {
      advertisementConditions.adStart = { [Op.gte]: advertisementFilters.startDate };
    }
    if ('endDate' in advertisementFilters) {
      advertisementConditions.adEnd = { [Op.lte]: advertisementFilters.endDate };
    }
    if ('Status' in advertisementFilters) {
      advertisementConditions.Status = advertisementFilters.Status;
    }

    // Build company conditions dynamically
    const companyConditions = {};
    if ('industry' in companyFilters) {
      companyConditions.industry = companyFilters.industry;
    }

    // Build campaign conditions dynamically
    const campaignConditions = {};
    if ('totalBudget' in campaignFilters) {
      campaignConditions.totalBudget = { [Op.gte]: campaignFilters.totalBudget };
    }
    if ('campaignStatus' in campaignFilters) {
      campaignConditions.campaignStatus = campaignFilters.campaignStatus;
    }
    if ('campaignStart' in campaignFilters) {
      campaignConditions.campaignStart = { [Op.gte]: campaignFilters.campaignStart };
    }
    if ('campaignEnd' in campaignFilters) {
      campaignConditions.campaignEnd = { [Op.lte]: campaignFilters.campaignEnd };
    }
    if ('avgCPC' in campaignFilters) {
      campaignConditions.avgCPC = { [Op.lte]: campaignFilters.avgCPC };
    }

    // Perform the database queries with dynamic conditions
    const advertisements = Object.keys(advertisementConditions).length
      ? await Advertisement.findAll({ where: advertisementConditions })
      : [];
    const companies = Object.keys(companyConditions).length
      ? await Company.findAll({ where: companyConditions })
      : [];
    const campaigns = Object.keys(campaignConditions).length
      ? await Campaign.findAll({ where: campaignConditions })
      : [];

    // Construct the response
    return res.status(200).json({
      message: 'Filtered entities retrieved successfully',
      data: {
        advertisements,
        companies,
        campaigns,
      },
    });
  } catch (err) {
    console.error('Error filtering entities:', err);
    return next(err);
  }
};

