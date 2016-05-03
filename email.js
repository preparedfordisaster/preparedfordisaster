const email = require(__dirname + '/lib/chron_email.js');
const Plan = require(__dirname + '/models/plan.js');
const errorHandler = require(__dirname + '/lib/errorHandler.js');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/plan_db', function (err, done) => {
  var now = new Date();
  console.log('now ' + now);
  Plan.find( { reminderFrequency: { $lt: 99 } }, (err, planData) => {
    console.log('plandata ' + planData);
    if (err) return errorHandler(err);
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
      mongoose.disconnect(done);
    });
  });
});
