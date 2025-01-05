// checks if user is logged in
const { CompanyAdmin } = require('../models');

exports.isLoggedIn = (req, _res, next) => {
    const { user } = req;
  
    if (!user) {
      return next(new StatusError('User not logged in', 403));
    }
    return next();
};

exports.isAccountOwner = async (req, res, next) => {
  const { userName } = req.params

  if(userName !== req.user.userName){
    return res.status(403).json({ message: 'Access forbidden' });
  }
  next()
}

exports.isCompany = async (req, res, next) => {
  const {companyID} = req.user

  if(!companyID) {
    return res.status(403).json({ message: 'Access forbidden' });
  }
  next()
}

