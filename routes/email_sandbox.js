const Router = require('express').Router;
const errorHandler = require(__dirname + '/../lib/errorHandler');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const Plan = require(__dirname + '/../models/plan');
const email = require(__dirname + '/../lib/chron_email.js');

const emailRouter = module.exports = exports = new Router();


emailRouter.post('/email', jwtAuth, (req) => {
  Plan.findOne({ memberID: req.user._id }, (err, planData) => {
    if (err) return errorHandler(err);
    var now = new Date();
    const mailConfig = {
      from: 'info@preparedfordisaster.org',
      to: 'greg.magdsick@gmail.com',
      subject: 'Your Emergency Disaster Plan as of: ' + now,
      text: '',
      html: JSON.stringify(planData)
    };
    email.sendMail(mailConfig, (err, info) => {
      if (err) return console.log(err);
      console.log('Message sent: ' + info.response);
    });
  });
});
