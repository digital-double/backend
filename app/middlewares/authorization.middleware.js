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
    const admin = await CompanyAdmin.findOne({
      where: { email: req.user.email },
    });

    if (admin.accessRights !== "admin") {
      return res.status(403).json({ message: 'Access forbidden. You are not an admin of this company.' });
    }

    return next();
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.isAccountOwner = async (req, res, next) => {
  const { userName } = req.params

  if(userName !== req.user.userName){
    return res.status(403).json({ message: 'Access forbidden' });
  }

  next()
}

