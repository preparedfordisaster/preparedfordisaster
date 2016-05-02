const express = require('express');
const app = express();
const mongoose = require('mongoose');

const planRouter = require(__dirname + 'routes/planRouter.js');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/plan_db');

app.use('/api', planRouter);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server is live at: ' + PORT));
