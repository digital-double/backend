const db = require('../models');

const { Users } = db;

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Users.findByPk(id).then((user) => {
      if (!user) return done('User not found');
      return done(null, user);
    });
  });
};