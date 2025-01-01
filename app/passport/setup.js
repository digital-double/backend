const db = require('../models');

const { User, CompanyAdmin } = db;

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    return done(null, { id: user.id, type: user instanceof User ? 'User' : 'CompanyAdmin' });
  });

  passport.deserializeUser(async ({ id, type }, done) => {
    try {
      const user = type === 'User' ? await User.findByPk(id) : await CompanyAdmin.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
