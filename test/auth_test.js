const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');

const port = process.env.PORT = 1234;

const server = require(__dirname + '/../lib/_server');
var User = require(__dirname + '/../models/user.js');
process.env.APP_SECRET = 'secret';


describe('authentication works', () => {
  before((done) => {
    server.listen(port, 'mongodb://localhost/plan_test_db', done);
  });

  before((done) => {
    var user = new User({ username: 'Test1', password: 'Test1' });
    user.generateToken((err, token) => {
      if (err) throw err;
      this.token = token;
      user.save((err, data) => {
        if (err) throw err;
        done();
      });
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(done);
      server.close();
    });
  });

  it('should sign up properly', (done) => {
    request('localhost:' + port)
    .post('/api/signup')
    .send({ username: 'Test2', password: 'Test2' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(typeof res.body.token === 'string').to.eql(true);
      done();
    });
  });

  it('should sign in properly', (done) => {
    request('localhost:' + port)
    .get('/api/signin')
    .auth('Test2', 'Test2')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(typeof res.body.token === 'string').to.eql(true);
      done();
    });
  });
});
