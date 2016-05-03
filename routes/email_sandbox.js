const Router = require('express').Router;
const errorHandler = require(__dirname + '/../lib/errorHandler');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const Plan = require(__dirname + '/../models/plan');
const email = require(__dirname + '/../lib/chron_email.js');
const handlebars = require('handlebars');
const fs = require('fs');

const emailRouter = module.exports = exports = new Router();


emailRouter.post('/email', jwtAuth, (req, res) => {
   Plan.findOne({ memberID: req.user._id }, (err, planData) => {
    if (err) return errorHandler(err);
    var template;
    var body;
    fs.readFile(__dirname + '/../view/mail_template.html', (err, source) => {
      if (err) throw err;
      template = handlebars.compile(source.toString());
      console.log(source.toString());
      body = template(planData);
      console.log('body', body);

    });
    var now = new Date();
    const mailConfig = {
      from: 'info.preparedfordisaster@gmail.com',
      to: 'greg.magdsick@gmail.com',
      subject: '[TEST]Your Emergency Disaster Plan as of: ' + now,
      html: body
    };
    email.sendMail(mailConfig, (err, info) => {
      if (err) return console.log(err);
      console.log('Message sent: ' + info.response);
    });
  });
  res.status(200).json({ msg: 'Successfully sent!' });
});
