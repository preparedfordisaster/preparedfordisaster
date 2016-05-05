const chai = require('chai');
const fs = require('fs');
const expect = chai.expect;
const mongoose = require('mongoose');
const email = require(__dirname + '/../email');
// const User = require(__dirname + '/../models/user');
const Plan = require(__dirname + '/../models/plan');
process.env.MONGODB_URI = 'mongodb://localhost/email_reminder_test_db';

describe('Testing reminder email:', () => {
  before((done) => {
    mongoose.createConnection(process.env.MONGODB_URI);
    done();
  });

  // before((done) => {
  //   var user = new User({ username: 'Rachel', password: 246 });
  //   user.save((err, data) => {
  //     if (err) throw err;
  //     this.user = data;
  //     this.user.generateToken((err, token) => {
  //       if (err) throw err;
  //       this.token = token;
  //       done();
  //     });
  //   });
  // });

  before((done) => {
    var counter = 0;
    var plan1 = new Plan(JSON.parse(fs.readFileSync(__dirname + '/test_post1.json').toString()));
    var plan2 = new Plan(JSON.parse(fs.readFileSync(__dirname + '/test_post2.json').toString()));
    var plan3 = new Plan(JSON.parse(fs.readFileSync(__dirname + '/test_post3.json').toString()));
    plan1.save((err) => {
      if (err) throw err;
      counter++
      if (counter === 3) done();
    });
    plan2.save((err) => {
      if (err) throw err;
      counter++
      if (counter === 3) done();
    });
    plan3.save((err) => {
      if (err) throw err;
      counter++
      if (counter === 3) done();
    });

  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(done);
    });
  });
  it('should send emails', (done) => {
    email(done);
    // expect(process.stdout).to.contain('250');
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
