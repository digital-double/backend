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
        usernameField: 'userCredential',
      },
      async (userCredential, password, done) => {
        const user = await Users.findOne({
          where: {
            [Op.or]: [{ email: userCredential }, { userName: userCredential }],
          },
        });

        if (!user) return done(null, false);

        const passwordMatch = await user.comparePassword(password);

        if (!passwordMatch) return done(null, false);

        return done(null, user);
      }
    )
  );
};