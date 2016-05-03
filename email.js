#!/usr/bin/env node
const errorHandler = require(__dirname + '/lib/errorHandler');
const Plan = require(__dirname + '/models/plan');
const email = require(__dirname + '/lib/chron_email.js');

function sayHello() {
  console.log('Hello');
}
sayHello();

// Plan.findOne({ memberID: req.user._id }, (err, planData) => {
//   if (err) return errorHandler(err);
  var now = new Date();
  const mailConfig = {
    from: 'info.preparedfordisaster@gmail.com',
    to: 'greg.magdsick@gmail.com',
    subject: 'Your Emergency Disaster Plan as of: ' + now,
    text: '',
    html: 'scheduled stuff'
  };
  email.sendMail(mailConfig, (err, info) => {
    if (err) return console.log(err);
    console.log('Message sent: ' + info.response);
  });
// });
