const { body, validationResult } = require('express-validator');

exports.checkEmail = (req, _res, next) => {
  return body('email')
    .isEmail()
    .run(req)
    .then(() => {
      if (!validationResult(req).isEmpty())
        return next(new StatusError('Invalid email', 422));
      return next();
    });
};

exports.checkUsername = (req, _res, next) => {
  return body('userName')
    .matches(/^[a-z0-9-_.]{4,20}$/i)
    .run(req)
    .then(() => {
      if (!validationResult(req).isEmpty())
        return next(new StatusError('Invalid username', 422));
      return next();
    });
};
