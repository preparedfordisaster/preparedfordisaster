const email = require(__dirname + '/lib/chron_email.js');
const Plan = require(__dirname + '/models/plan.js');
const handlebars = require('handlebars');
const readFile = require('fs-readfile-promise');
const errorHandler = require(__dirname + '/lib/errorHandler.js');
const mongoose = require('mongoose');
const EventEmitter = require('events');
var newEmitter = new EventEmitter();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/plan_db', (err, done) => {
  if (err) return errorHandler(err);
  var now = new Date();
  Plan.find( { 'reminderDate': { $lt: now } }, (err, remindArray) => {
    if (err) return console.log(err);
    var body;
    var template;
      readFile(__dirname + '/view/mail_template.html').then((buffer) => {
        template = handlebars.compile(buffer.toString());
        remindArray.forEach((value) => {
        body = template(value);
        var mailConfig = {
          from: 'info@preparedfordisaster.org',
          to: value.email,
          subject: 'Your Emergency Disaster Plan as of: ' + now,
          html: body
        };
        email.sendMail(mailConfig, (err, info) => {
          if (err) return console.log(err);
          console.log('Message sent: ' + info.response);
        });
        debugger;
        value.reminderDate.setDate(value.reminderDate.getDate() + value.reminderFrequency);
        debugger;
        Plan.save({ _id: value._id }, value, (err) => {
          debugger;
          if (err) return console.log(err);
          console.log('updated successfully');
        });
      });
      newEmitter.emit('cleanup', done);
      debugger;
      mongoose.disconnect(done);
    });
  });
  });

newEmitter.on('cleanup', (done) => {
  mongoose.disconnect(done);
});
