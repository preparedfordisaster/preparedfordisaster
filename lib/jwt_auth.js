const User = require(__dirname + '/../models/user');
const jwt = require('jsonwebtoken');

module.exports = exports = function(req, res, next) {
  jwt.verify(req.headers.token, process.env.APP_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: 'Could not be authenticated' });

    User.findOne({ findHash: decoded.idd }, (err, data) => {
      if (err) return res.status(403).json({ msg: 'Could not be authenticated' });
      if (!data) return res.status(403).json({ msg: 'Could not be authenticated' });
      req.user = data;
      next();
    });
  });
};
