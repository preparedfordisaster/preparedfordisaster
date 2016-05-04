const email = require(__dirname + '/lib/chron_email.js');
const Plan = require(__dirname + '/models/plan.js');
const errorHandler = require(__dirname + '/lib/errorHandler.js');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/plan_db', (err, done) => {
  if (err) return errorHandler(err);
  var now = new Date();
  console.log('now ' + now);
  Plan.find( { 'reminderDate': { $lt: now } }, (err, remindArray) => {
    remindArray.forEach((value) => {
      if (err) return errorHandler(err);
      console.log(value.email);
      const mailConfig = {
        from: 'info@preparedfordisaster.org',
        to: value.email,
        subject: 'Your Emergency Disaster Plan as of: ' + now,
        text: '',
        html: JSON.stringify(value)
      };
      email.sendMail(mailConfig, (err, info) => {
        if (err) return console.log(err);
        console.log('Message sent: ' + info.response);
      });
    });
  });
  mongoose.disconnect(done);
});
