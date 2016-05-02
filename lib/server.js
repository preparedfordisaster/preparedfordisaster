require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRouter = require(__dirname + '/../routes/auth_routes');
const planRouter = require(__dirname + '/../routes/planRoutes.js');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/plan_db');

app.use('/api', authRouter);
app.use('/api', planRouter);

var PORT = process.env.PORT || 3000;
module.exports = exports = app.listen(PORT, () => console.log('Server is live at: ' + PORT));
