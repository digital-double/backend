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
  try{
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
  }
  catch(err){
    return next(err)
  }
};

exports.getProfile = async (req, res, next) =>{
    try {
      const { userName } = req.params
      
      const [user, company] = await Promise.all([
        Users.findOne({
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
  
      if (!user) {
        throw new StatusError(`${userName}`, 404);
      }
    
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
      return next(err);
    }
    
};

exports.getnotification = async (req, res, next) => {
  try {
    const { id, isCompany } = req.user; 
    console.log("IMINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN")
    console.log(isCompany)

    if (isCompany) {
      const contactUsObjects = await ContactUs.findAll({
        where: { userID: id },
        attributes: {
          exclude: ['updatedAt', 'deletedAt'],
        },
        include: [
          {
            model: Users,
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



