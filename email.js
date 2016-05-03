const email = require(__dirname + '/lib/chron_email.js');

    var now = new Date();
    const mailConfig = {
      from: 'info@preparedfordisaster.org',
      to: 'greg.magdsick@gmail.com',
      subject: 'Your Emergency Disaster Plan as of: ' + now,
      text: '',
      html: 'msg: message sent'
    };
    email.sendMail(mailConfig, (err, info) => {
      if (err) return console.log(err);
      console.log('Message sent: ' + info.response);
});
