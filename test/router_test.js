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

describe('plan routes server', () => {
  before((done) => {
    server.listen(port, 'mongodb://localhost/plan_test_db');
    done();
  });

  before((done) => {
    var user = new User({ username: 'Phil', password: 234 });
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
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(() => {
        server.close(done);
      });
    });
  });

  it('should create a plan', (done) => {
    request('localhost:' + port)
    .post('/api/plan')
    .set('token', this.token)
    .send({ firstName: 'test', lastName: 'test', email: 'test',
      'emergencykit.water': true, 'emergencykit.food': true, 'emergencykit.noaaWeatherRadio': true,
      'emergencykit.flashlight': true, 'emergencykit.extraBatteries': true, 'emergencykit.firstAidKit': true,
      'emergencykit.whistle': true, 'emergencykit.dustMask': true, 'emergencykit.sheetingAndDuctTape': true,
      'emergencykit.moistTowelettes': true,
      'emergencykit.garbageBagsAndPlasticTies': true, 'emergencykit.wrenchOrPliers': true, 'emergencykit.canOpener': true, 'emergencykit.localMaps': true })
    .end((err, res) => {
      console.log(err);
      console.log(res.body);
      expect(err).to.eql(null);
      expect(res.body.firstName).to.eql('test');
      done();
    });
  });


});
