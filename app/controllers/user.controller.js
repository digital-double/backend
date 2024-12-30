const db = require('../models');
const {createUser} = require('./stripe.controller')

const { Users } = db;

// Update a user
exports.updateOne = async (req, res, next) => {
  try {
    const { userName } = req.params;

    const user = await Users.findByLogin('userName', userName);

    if ('password' in req.body) {
      throw new StatusError('user', 403);
    }
    if (!user) {
      throw new StatusError('User credentials', 404);
    }
    
    const updatedUser = await user.update(req.body);

    return res.status(200).send({
      message: 'User was updated successfully',
      user: updatedUser.stripSensitive(),
    });
  } catch (err) {
    return next(err);
  }
};

// set updatePassword attributes
exports.setResetToken = (req, res, next) => {
  const {
    body: { email },
  } = req;

  Users.findByLogin('email', email)
    .then((user) => user.setResetToken())
    .then((token) => {
      res.locals.resetToken = token;
      return next();
    })
    .catch((err) => next(err));
};

// update User password
exports.replacePassword = (req, res, next) => {
  const {
    body: { password },
    params: { token },
  } = req;

  Users.findByToken(token)
    .then((user) => {
      if (user.resetTokenExp < Date.now()) {
        throw new StatusError('Token expired', 401);
      }
      return user.setPassword(password);
    })
    .then(() => {
      return res.status(200).send({
        message: 'Password successfully updated',
      });
    })
    .catch((err) => next(err));
};

// Patch User password
exports.updatePassword = (req, res, next) => {
  const {
    user,
    body: { oldPassword, newPassword },
  } = req;

  try{
    if(!oldPassword || ! newPassword){
      throw new StatusError("missing userCredentials",400)
    }

  user
    .replacePassword(oldPassword, newPassword)
    .then(() => {
      return res.status(200).send({
        message: 'Password successfully updated',
      });
    })
    .catch(() => {
      throw new StatusError('Something went wrong while updating', 500);
    });
  }
  catch (err){
    next(err)
  }
};

// Get User object from the username in the request
exports.retrieveOne = (req, res, next) => {
  const {
    params: { userName },
  } = req;

  Users.findByLogin('userName', userName)
    .then((user) => {
      return res.status(200).send({
        message: 'User data sent successfully',
        user: user.stripSensitive(),
      });
    })
    .catch((err) => next(err));
};

// set updatePassword attributes
exports.expressSignup = async (req, res, next) => {
  try{
  const {
    body: { userName, email, password },
  } = req;

    const stripeID = await createUser(req, res, next)

    Users.createNewUser(userName, email, password, stripeID.id)
    .then((user) => {
      
      res.locals.user = user;
      req.body.userCredential = userName;
      return next();
      
    })
    .catch((err) => next(err));
  }
  catch(err){
    return next(err)
  }
};