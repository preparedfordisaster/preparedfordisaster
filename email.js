const email = require(__dirname + '/lib/chron_email.js');
const Plan = require(__dirname + '/models/plan.js');
const errorHandler = require(__dirname + '/lib/errorHandler.js');

var now = new Date().getTime();
Plan.find( { reminderDate: { $lt: now } }, (err, planData) => {
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
    });
});
