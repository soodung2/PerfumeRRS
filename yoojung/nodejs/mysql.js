var mysql      = require('mysql'); //mysql이라는 모듈 이용하겟다.
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'dsc110',
  database : 'test_perfume'
});// 접속하기 위한 정보.

connection.connect();

connection.query('SELECT * FROM topic', function (error, results, fields) {
  if (error){
    console.log(error);
  }
  console.log(results);
});

connection.end();
