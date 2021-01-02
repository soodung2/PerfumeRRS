var mysql = require('mysql');
var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'dsc110',
  database: 'test_perfume'
});
db.connect();
module.exports = db;
