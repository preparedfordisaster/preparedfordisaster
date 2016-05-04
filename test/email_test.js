const chaiHTTP = require('chai-http');
const chai = require('chai');
const expect = chai.expect;
chai.use(chaiHTTP);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 1234;
const server = require(__dirname + '/../lib/_server');
const User = require(__dirname + '/../models/user');
const Plan = require(__dirname + '/../models/plan');
process.env.APP_SECRET = 'secret';

describe('email plan test', () => {
  before((done) => {
    server.listen(port, 'mongodb://localhost/email_plan_test_db');
    done();
  });

  before((done) => {
    var user = new User({ username: 'Rachel', password: 246 });
    user.save((err, data) => {
      if (err) throw err;
      this.user = data;
      this.user.generateToken((err, token) => {
        if (err) throw err;
        this.token = token;
        done();
      });
    });
  });

  before((done) => {
    var newPlan = new Plan({
      firstName: 'test', lastName: 'test', email: 'phillip.d.nguyen23@gmail.com',
      'emergencykit.water': true, 'emergencykit.food': true,
      'emergencykit.noaaWeatherRadio': true,
      'emergencykit.flashlight': true, 'emergencykit.extraBatteries': true,
      'emergencykit.firstAidKit': true,
      'emergencykit.whistle': true, 'emergencykit.dustMask': true,
      'emergencykit.sheetingAndDuctTape': true,
      'emergencykit.moistTowelettes': true,
      'emergencykit.garbageBagsAndPlasticTies': true, 'emergencykit.wrenchOrPliers': true,
      'emergencykit.canOpener': true, 'emergencykit.localMaps': true }
    );
    newPlan.save((err, data) => {
      if (err) throw err;
      this.plan = data;
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(() => {
        server.close(done);
      });
    });
  });

  it('should create a plan to email', (done) => {
    request('localhost:' + port)
    .post('/api/plan')
    .set('token', this.token)
    .send({ firstName: 'test', lastName: 'test', email: 'phillip.d.nguyen23@gmail.com',
    'emergencykit.water': true, 'emergencykit.food': true, 'emergencykit.noaaWeatherRadio': true,
    'emergencykit.flashlight': true, 'emergencykit.extraBatteries': true,
    'emergencykit.firstAidKit': true,
    'emergencykit.whistle': true, 'emergencykit.dustMask': true,
    'emergencykit.sheetingAndDuctTape': true,
    'emergencykit.moistTowelettes': true,
    'emergencykit.garbageBagsAndPlasticTies': true, 'emergencykit.wrenchOrPliers': true,
    'emergencykit.canOpener': true, 'emergencykit.localMaps': true })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.firstName).to.eql('test');
      done();
    });
  });

it('should send an email with the user plan', (done) => {
  request('localhost:' + port)
  .post('/api/email')
  .set('token', this.token)
  .end((err, res) => {
    expect(err).to.eql(null);
    console.log(res);
    expect(res.body.msg).to.eql('Email Sent!');
    expect(res.status).to.eql(200);
    done();
  });
});

});
