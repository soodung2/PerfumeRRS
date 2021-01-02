var http = require('http');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var db = require('./lib/db');
var topic = require('./lib/topic');
//var author = require('./lib/author');
var recommend = require('./lib/recommend');

var app = http.createServer(function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  if(pathname === '/'){
    if(queryData.id === undefined){
      topic.home(request, response);
    } else {//상세 보기 페이지.
      topic.page(request, response);
    }
  } else if(pathname === '/recommend'){
    recommend.home(request, response);
  } else if(pathname === '/report_process'){
    recommend.result(request, response);
  } else if(pathname ==='/report_result'){
    recommend.print_result(request, response);
  } else if(pathname ==='/middle_process'){
    recommend.middle_process(request, response);
  } else if(pathname ==='/show_result'){
    recommend.show_result(request, response);
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(3000);
