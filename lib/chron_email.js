require('dotenv').config();
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const options = {
  service: 'mailgun',
  auth: {
    user: process.env.MG_USER,
    pass: process.env.MG_PASS
  }
};

module.exports = exports = nodemailer.createTransport(smtpTransport(options));
