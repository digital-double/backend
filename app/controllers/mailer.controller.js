const nodemailer = require('nodemailer');
const { resetTemplate } = require('../lib/templates');

require('dotenv').config();

const transportObject = {
  service: 'gmail', // using gmail requires added security authentication check nodemailer docs
  secure: false, // do not use process.env for this otherwise it won't work
  port: 587,
  auth: {
    user: process.env.EMAIL_USER_ACCOUNT,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const sendMail = (email, subject, template) => {
  const transporter = nodemailer.createTransport(transportObject);

  return transporter.sendMail({
    from: `"digital double" <${process.env.EMAIL_USER_ACCOUNT}>`,
    to: `${email}`,
    subject: `${subject}`,
    text: `digital double - update Password instructions`,
    html: template,
  });
};

exports.sendResetPasswordInstructions = (req, res, next) => {
  const { email } = req.body;
  const { resetToken } = res.locals;

  sendMail(email, 'Reset Password Instructions', resetTemplate(resetToken))
    .then(() => {
      return res.status(200).send({
        message: 'Reset instructions successfully sent',
      });
    })
    .catch(() => {
      next(
        new StatusError(
          'Something went wrong while sending reset instructions',
          500
        )
      );
    });
};