
// module.exports = router;
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'111111',
  database:'opentutorials'
});
db.connect();

// index.ejs로 연결해주는거
// router.get('/', function(req, res, next) {
//   res.render('index', {
//     title: "Express"
//   });
// });

// 여기서 데이터를 처리해주고 ejs에서는 넘겨준 변수만 받을 수 있도록 
router.get('/', function(req, res, next) {

  db.query(`SELECT * FROM topic`, function(error,topics){
        
     if(error) { throw err;}
     
     res.render('index', {
       title: topics[0].title,
       id: topics[0].id
      //  title2: topics[1].title,
      //  id2: topics[1].id
      
    });

  });
});



module.exports = router;