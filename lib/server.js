const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/plan_db');

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server is live at: ' + PORT));
