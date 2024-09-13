// checks if user is logged in
exports.isLoggedIn = (req, _res, next) => {
    const { user } = req;
  
    if (!user) {
      return next(new StatusError('User not logged in', 403));
    }
    return next();
  };