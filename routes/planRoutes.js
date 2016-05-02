const Router = require('express').Router;
const Plan = require(__dirname + '/../models/plan.js');
const bodyParser = require('body-parser').json();
const errorHandler = require(__dirname + '/../lib/errorHandler.js');

var planRouter = module.exports = new Router();


planRouter.get('/plan', (req, res) => {
  Plan.find({}, (err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

planRouter.post('/plan', bodyParser, (req, res) => {
  var newPlan = new Plan(req.body);
  newPlan.save((err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

planRouter.put('/plan/:id', bodyParser, (req, res) => {
  var planData = req.body;
  delete planData._id;
  Plan.update({ _id: req.params.id }, planData, (err) => {
    if (err) return errorHandler(err, res);
    res.status(200).json({ msg: 'Updated the plan entry with put' });
  });
});

planRouter.delete('/plan/:id', bodyParser, (req, res) => {
  Plan.findOneAndRemove({ _id: req.params.id }, (err) => {
    if (err) return errorHandler(err, res);
    res.status(200).json({ msg: 'Deleted a plan entry' });
  });
});
