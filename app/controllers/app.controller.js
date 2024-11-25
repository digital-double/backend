const db = require('../models');

const { Advertisement, Company, Campaign, Users, Voidances, VoidanceInvite, ContactUs, CompanyAdmin} = db;

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
      attributes: {
          exclude: ['CampaignID']  // Optionally exclude foreign key 
      }
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

exports.retrieveFiltered = (req, res, next) => {
    const {
      body: { title, offset = 0 },
    } = req;
  
    if (title) {
      return Advertisement.findAll({
        where: { title },
        offset,
        limit: 20,
      })
        .then((content) => {
          res.status(200).json({
            message: 'Contents retrieved',
            data: content,
          });
        })
        .catch((err) => next(err));
    }
  
    return res.status(200).json({
      message: 'No content',
      data: [],
    });
};

exports.getProfile = async (req, res, next) =>{
    try {
      const { userName } = req.params;

      // Check if the userName belongs to a Company
      const company = await Company.findOne({ 
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
      });
    
      if (company) {
        // If a Company is found, fetch all associated campaigns excluding specific fields
        const campaigns = await Campaign.findAll({
          where: { companyID: company.id },
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
    
      // Check if the userName belongs to a User
      const user = await Users.findOne({
        where: { userName },
        attributes: { exclude: ['password'] }, 
      });
    
      if (!user) {
        throw new StatusError(`No record found for userName "${userName}".`, 404);
      }
    
      // If the user is found, fetch all associated voidances
      const voidances = await Voidances.findAll({
        where: { userId: user.id },
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
      console.error('Error retrieving data:', err);
      return next(err);
    }
    
};

exports.getVoidanceInvites = async (req, res, next) => {
  try {
    const { userID } = req.params; 

    const isCompanyAdmin = await CompanyAdmin.findOne({
      where: { userID },
    });

    if (isCompanyAdmin) {
      const contactUsObjects = await ContactUs.findAll({
        where: { userID: userID },
        attributes: {
          exclude: ['updatedAt', 'deletedAt'],
        },
        include: [
          {
            model: Users,
            attributes: ['id', 'userName', 'email'], 
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
      where: { userId: userID },
      attributes: {
        exclude: ['updatedAt', 'deletedAt'], 
      },
      include: [
        {
          model: Company,
          attributes: ['id', 'companyName'], 
        },
        {
          model: Advertisement,
          attributes: ['id', 'title'], 
        },
      ],
    });

    if (!voidanceInvites || voidanceInvites.length === 0) {
      throw new StatusError(`No VoidanceInvites found for the specified user`, 404);
    }

    return res.status(200).json({
      message: 'VoidanceInvites retrieved successfully.',
      data: voidanceInvites,
    });
  } catch (err) {
    console.error('Error retrieving data:', err);
    return next(err); 
  }
};



