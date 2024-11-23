exports.login = (req, res, _next) => {
    const { user } = req;
    return res.status(200).json({
      message: 'Successfully logged in',
      user: user.stripSensitive(),
    });
  };
  
  exports.logout = (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      return res.clearCookie('my.sid', { path: '/' }).status(200).json({
        message: 'Successfully logged out',
      });
    });
  };
  
  // validate existing session from client
  exports.validateSession = (req, res, next) => {
    const { user } = req;
  
    if (user) {
      return res.status(200).json({
        message: 'Valid session',
        user: user.stripSensitive(),
      });
    }
  
    return next(new StatusError('Invalid session', 403));
  };
  
  exports.validationResponse = (req, res, _next) => {
    const {
      user: { id: userId},
    } = req;
  
  
    return res.status(200).send({
      message: 'signup complete',
      userId
    });
  };