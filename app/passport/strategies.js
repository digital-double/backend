const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

const {
  Users,
  Sequelize: { Op },
} = db;

exports.register = async (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'userCredential',  // keep this for flexibility
        passwordField: 'password', // This ensures 'password' as the field for passwords
      },
      async (userCredential, password, done) => {
        try {
          const user = await Users.findOne({
            where: {
              [Op.or]: [{ email: userCredential }, { userName: userCredential }],
            },
          });

          if (!user) {
            return done(null, false, { message: 'Incorrect credentials.' });
          }

          const passwordMatch = await user.comparePassword(password);

          if (!passwordMatch) {
            return done(null, false, { message: 'Incorrect password.' });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};