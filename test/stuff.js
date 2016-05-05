const chaiHTTP = require('chai-http');
const chai = require('chai');
const fs = require('fs');
const expect = chai.expect;
chai.use(chaiHTTP);
// const request = chai.request;
const mongoose = require('mongoose');
// const port = process.env.PORT = 3030;
const email = require(__dirname + '/../email');
// const server = require(__dirname + '/../lib/_server');
// const User = require(__dirname + '/../models/user');
const Plan = require(__dirname + '/../models/plan');
process.env.APP_SECRET = 'secret';
process.env.MONGODB_URI = 'mongodb://localhost/email_reminder_test_db';

describe('Testing reminder email:', () => {
  before((done) => {
    mongoose.connect(process.env.MONGODB_URI, (err, done) => {
      if (err) return console.log(err);
      var users = [];
      users.push(JSON.parse(fs.readFileSync('test_post1.json', String)));
      users.push(JSON.parse(fs.readFileSync('test_post2.json', String)));
      users.push(JSON.parse(fs.readFileSync('test_post3.json', String)));
      users.forEach((value) => {
        value.save((err) => {
          if (err) throw err;
        });
      });
      done();
    });
    done();
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(done);
    });
  });
  it('should send 3 emails', (done) => {
    email();
    expect(process.stdout).to.contain('250');
    done();
  });
  it('should update the past reminderDates to future times', (done) => {
    var now = new Date();
    Plan.find( { 'reminderDate': { $lt: now } }, (err, checkArray) => {
      if (err) throw err;
      expect(checkArray.length).to.eql(0);
      done();
    });
  });
});
