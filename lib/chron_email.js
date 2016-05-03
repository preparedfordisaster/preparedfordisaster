require('dotenv').config();
const nodemailer = require('nodemailer');

const options = {
  service: 'Mailgun',
  auth: {
    user: process.env.MG_USER,
    pass: process.env.MG_PASS
  }
};

module.exports = exports = nodemailer.createTransport(options);
