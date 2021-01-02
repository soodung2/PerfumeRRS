let express = require("express");
var path = require('path'); // 경로 관리
var serveStatic = require('serve-static');
var logger = require('morgan'); //log를 남겨줌
var cookieParser = require('cookie-parser'); // 쿠키를 처리
var bodyParser = require('body-parser'); // http가 전송 될때 바디를 처리 


var connectRoutes = require('./src/connectRoutes');



let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev')); // 개발 모드 에러 메시지 볼수 있음, product모드
app.use(bodyParser.json()); // bodyparser가 json 관련 처리를 해줌
app.use(bodyParser.urlencoded({extended: false})); // urlencoding 해줌
app.use(cookieParser()); // 쿠키 파서

app.use(express.static("./static"));


function startApp(app) {//웹페이지 시작코딩
    var port = 3000;
    app.listen(port, function (err) {
      if (err) {
        console.log('Error createing a server at port: ' + 3000);
        process.exit(1);
      }
      console.log('서버가 ' + port + '번 포트에서 실행 중입니다.!!');
    });
  }

  connectRoutes(app);
//   connectErrorHandlers(app);
  startApp(app);


  // app.get('/', (req, res) => {
    
  //       client.query("SELECT * FROM topic", function(err, result, fields){
  //           if(err) throw err;
  //           else{
  //               var page = ejs.render('index', {
  //                   title: "Temporary Title",
  //                   data: result,
  //               });
  //               res.send(page);
  //           }
  //       });
  //   });
