const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  findHash: { type: String, unique: true }
});

userSchema.methods.generateHash = function(password) {
  return this.password = bcrypt.hashSync(password, 9);
};

userSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateFindHash = function(cb) {
  var tries = 0;
  var timeout;
  var createFindHash = () => {
    var hash = crypto.randomBytes(32);
    this.findHash = hash.toString('hex');
    this.save((err) => {
      if (err) {
        if (tries > 5) {
          return cb(new Error('Could not generate hash'));
        }
        return timeout = setTimeout(() => {
          createFindHash();
          tries++;
        }, 1000);
      }
      if (timeout) clearTimeout(timeout);
      cb(null, hash.toString('hex'));
    });
  };
  createFindHash();
};

userSchema.methods.generateToken = function(cb) {
  this.generateFindHash(function(err, hash) {  // eslint-disable-line prefer-arrow-callback
    if (err) return cb(err);
    cb(null, jwt.sign({ idd: hash }, process.env.APP_SECRET));
  });
};

module.exports = exports = mongoose.model('User', userSchema);
