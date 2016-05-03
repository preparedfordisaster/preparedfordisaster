require('dotenv').config();
var app = require(__dirname + '/_server.js');
var PORT = process.env.PORT || 3000;
var db = process.env.MONGODB_URI || 'mongodb://localhost/plan_db';

app.listen(PORT, db, () => {
  console.log('server running on port: ' + PORT);
});
