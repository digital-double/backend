const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

const {
  User,
  CompanyAdmin,
  Sequelize: { Op },
} = db;

async function checkTypeOfuser(userCredential){
  console.log('we in check')
  const user =
            (await User.findOne({
              where: {
                [Op.or]: [{ email: userCredential }, { userName: userCredential }],
              },
            })) ||
            (await CompanyAdmin.findOne({
              where: {
                [Op.or]: [{ email: userCredential }, { userName: userCredential }],
              },
            }));
            return user
}

exports.register = async (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'userCredential',  // keep this for flexibility
        passwordField: 'password', // This ensures 'password' as the field for passwords
      },
      async (userCredential, password, done) => {

        try {
          const user = await checkTypeOfuser(userCredential)

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
