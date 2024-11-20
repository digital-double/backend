// checks if user is logged in
const { CompanyAdmin } = require('../models');

exports.isLoggedIn = (req, _res, next) => {
    const { user } = req;
  
    if (!user) {
      return next(new StatusError('User not logged in', 403));
    }
    return next();
  };

// checks if the user is an admin of a company
exports.isAdminOfCompany = async (req, res, next) => {
  try {
    const { companyID } = req.body; 

    if (!companyID) {
      return res.status(400).json({ message: 'Unauthorized' });
    }

    const admin = await CompanyAdmin.findOne({
      where: { companyID, email: req.user.email },
    });

    if (!admin) {
      return res.status(403).json({ message: 'Access forbidden. You are not an admin of this company.' });
    }

    return next();
  } catch (err) {
    console.error('Authorization error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

