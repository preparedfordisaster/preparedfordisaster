const Router = require('express').Router;
const errorHandler = require(__dirname + '/../lib/errorHandler');
const Plan = require(__dirname + '/../models/plan');
const email = require(__dirname + '/../lib/chron_email.js');

const emailRouter = module.exports = exports = new Router();


emailRouter.post('/email', () => {
  Plan.findOne({ memberID: '5728e4b1443b8efd555629ea' }, (err, planData) => {
    if (err) return errorHandler(err);
    var now = new Date();
    const mailConfig = {
      from: 'info.preparedfordisaster@gmail.com',
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
