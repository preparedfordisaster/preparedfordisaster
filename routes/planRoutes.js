const Router = require('express').Router;
const Plan = require(__dirname + '/../models/plan.js');
const bodyParser = require('body-parser').json();

var planRouter = module.exports = new Router();


planRouter.get('/plan', (req, res) => {
  Plan.find({}, (err, data) => {
    if (err) console.log(err);
    res.status(200).json(data);
  });
});

planRouter.post('/plan', bodyParser, (req, res) => {
  var newPlan = new Plan(req.body);
  newPlan.save((err, data) => {
    if (err) console.log(err);
    res.status(200).json(data);
  });
});
