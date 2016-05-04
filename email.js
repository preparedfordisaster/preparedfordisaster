// const email = require(__dirname + '/chron_email.js');
// const Plan = require(__dirname + '/../models/plan.js');
// const handlebars = require('handlebars');
// const readFile = require('fs-readfile-promise');
// const errorHandler = require(__dirname + '/errorHandler.js');
// const mongoose = require('mongoose');

const email = require(__dirname + '/lib/chron_email.js');
const Plan = require(__dirname + '/models/plan.js');
const handlebars = require('handlebars');
const readFile = require('fs-readfile-promise');
const errorHandler = require(__dirname + '/lib/errorHandler.js');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/plan_db', (err, done) => {
  if (err) return errorHandler(err);
  var now = new Date();
  Plan.find( { 'reminderDate': { $lt: now } }, (err, remindArray) => {
    var body;
    var template;
    if (err) return errorHandler(err);
      readFile(__dirname + '/../view/email_template.html').then((buffer) => {
        template = handlebars.compile(buffer.toString());
        remindArray.forEach((value) => {
        body = template(value);
        const mailConfig = {
          from: 'info@preparedfordisaster.org',
          to: value.email,
          subject: 'Your Emergency Disaster Plan as of: ' + now,
          html: body
        };
        email.sendMail(mailConfig, (err, info) => {
          if (err) return errorHandler(err);
          console.log('Message sent: ' + info.response);
        });
      });
    });
  });
    mongoose.disconnect(done);
  });
