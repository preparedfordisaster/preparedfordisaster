const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const email = require(__dirname + '/../lib/chron_email.js');

const emailRouter = module.exports = exports = new Router();

const mailConfig = {
    from: 'info.preparedfordisaster@gmail.com',
    to: 'greg.magdsick@gmail.com',
    subject: 'Your Emergency Disaster Plan',
    text: '',
    html: 'testing your email'
  };

emailRouter.post('/email', bodyParser, () => {
  email.sendMail(mailConfig, (err, info) => {
    if (err) return console.log(err);
    console.log('Message sent: ' + info.response);
  });
});
