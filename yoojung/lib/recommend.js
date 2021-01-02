var template = require('./template.js');
var db = require('./db');
var qs = require('querystring');
var url = require('url');
const fastcsv = require("fast-csv");
const fs = require("fs");

exports.home = function(request, response){
  db.query(`SELECT * FROM perfumes_train`,function(error, perfumes){
    var title = 'perfume';
    var list = template.perfumeList(perfumes);
    var html = template.HTML(title, ``,
          `
        <style>
          table{
            border-collapse: collapse;
          }
          td{
            border: 1px solid black;
          }

        </style>
       `,
       `<form name="reportForm" action="/report_process" method="post">
          <div class="container" style=" text-align: center;">
            <h2 class="mb" style="font-size: 50px; letter-spacing: 3px;font-family: 'Titillium Web', sans-serif;width: 1000px; margin-left: -173px;font-weight: lighter;margin-bottom: 70px;">Rate the perfume you've used</h2>
            ${template.perfumeReport(perfumes)}
            <p>
            <input class="ma" type="button" onclick="report()" value="SUBMIT" style=" border: 2px solid black;
              background-color: #2e245a;
              color: black;
              padding: 14px 28px;
              font-size: 16px;
              cursor: pointer;
              border-color: #99a250;
              color: #729b64;
              margin-top: 10px;
              ">
              </p>
          </div>
        </form>
          <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
          <script>
            jQuery.fn.extend({
              rating: function(options){
                if(typeof(options)=='undefined') options={};
                var ratings=[];
                objs=this;
                if(objs.length){
                  for(var i=0;i<objs.length;i++){
                    ratings.push(new simpleRating(options,objs[i]));
                  }
                }
              },
            });

            class simpleRating{
              constructor(options,obj) {
                this.obj=obj;
                this.options=options;
                this.rating=0;
                this.init();
              }

              init(){
                var html='<div class="simple-rating star-rating">';
                for(var i=0;i<5;i++){html+='<i class="fa fa-star-o" data-rating="'+(i+1)+'"></i>';}
                html+='</div>';

                $(this.obj)
                  .attr('type','hidden')
                  .after(html);

                $(this.obj).next().children().click({classObj:this},function(e){
                  e.data.classObj.rate(this);
                });

                $(this.obj).next().children().mouseenter({classObj:this},function(e){
                  e.data.classObj.setstars($(this).data('rating'));
                });

                $(this.obj).next().children().mouseleave({classObj:this},function(e){
                  e.data.classObj.setstars(e.data.classObj.rating);
                });
              }

              rate(obj){
                var rating=$(obj).data('rating');
                $(obj).parent().prev().val(rating);
                this.rating=rating;
                this.refresh();
              }

              refresh(){
                this.setstars(this.rating);
              }

              setstars(rating){
                var stars=$(this.obj).next().children();
                for(var i=0;i<5;i++){
                  var starObj=$(this.obj).next().children()[i];
                  if(i<rating){
                    $(starObj).removeClass('fa-star-o');
                    $(starObj).addClass('fa-star');
                  }else{
                    $(starObj).addClass('fa-star-o');
                    $(starObj).removeClass('fa-star');
                  }
                }
              }
            }
            function report(){
                var temp = document.getElementsByClassName('rating')[0].value;
                temp *=1;
                var reportForm = document.reportForm;

                reportForm.submit();
             };


          </script>

          <script type="text/javascript">
            $(document).ready(function(){
              $('.rating').rating();
            });
          </script>
  `
    );
    response.writeHead(200);
    response.end(html);
  });
};

exports.result = function(request, response){
  var body = '';
  request.on('data',function(data){
    body += data;
  });
  request.on('end',function(){
    var post = qs.parse(body);
    for(let row in post){
      let perfume_id = parseInt(row); //key = perfume_id임.
      let report_value = parseInt(post[row]);
      if(!isNaN(report_value)){
        db.query(`INSERT INTO rating(perfumeId, score, userId) VALUE(?,?,?)`,[perfume_id,report_value, 1], function(error, result){
          if(error){
            throw error;
          }
          response.writeHead(302, {Location: `/middle_process`});
          response.end();
        });//db
      }//if
    }//for complete!
  });
};


exports.middle_process = function(request, response){
  db.query(`INSERT IGNORE INTO user_profile(userId, Citron, Floral, Grapefruit, Jasmine, Musk, Peony, Rose, Spices, Teakwood, Warm, Woods)
      select 1, CASE WHEN sum(types_train.Citron) = 0 THEN NULL ELSE sum(rating.score* types_train.Citron)/sum(types_train.Citron) END,
      CASE WHEN sum(types_train.Floral) = 0 THEN NULL ELSE sum(rating.score* types_train.Floral)/sum(types_train.Floral) END,
      CASE WHEN sum(types_train.Grapefruit) = 0 THEN NULL ELSE sum(rating.score* types_train.Grapefruit)/sum(types_train.Grapefruit) END,
      CASE WHEN sum(types_train.Jasmine) = 0 THEN NULL ELSE sum(rating.score* types_train.Jasmine)/sum(types_train.Jasmine) END,
      CASE WHEN sum(types_train.Musk) = 0 THEN NULL ELSE sum(rating.score* types_train.Musk)/sum(types_train.Musk) END,
      CASE WHEN sum(types_train.Peony) = 0 THEN NULL ELSE sum(rating.score* types_train.Peony)/sum(types_train.Peony) END,
      CASE WHEN sum(types_train.Rose) = 0 THEN NULL ELSE sum(rating.score* types_train.Rose)/sum(types_train.Rose) END,
      CASE WHEN sum(types_train.Spices) = 0 THEN NULL ELSE sum(rating.score* types_train.Spices)/sum(types_train.Spices) END,
      CASE WHEN sum(types_train.Teakwood) = 0 THEN NULL ELSE sum(rating.score* types_train.Teakwood)/sum(types_train.Teakwood) END,
      CASE WHEN sum(types_train.Warm) = 0 THEN NULL ELSE sum(rating.score* types_train.Warm)/sum(types_train.Warm) END,
      CASE WHEN sum(types_train.Woods) = 0 THEN NULL ELSE sum(rating.score* types_train.Woods)/sum(types_train.Woods) END
      from rating LEFT JOIN types_train ON rating.perfumeId = types_train.perfumeId ;
      `,function(error, result){
        if(error){
          throw error;
        }
        db.query(`DROP TABLE IF EXISTS bar`,function(error2, result2){
          if(error2){
            throw error2;
          }
          db.query(`CREATE TABLE bar
                      SELECT userId AS ID, CASE WHEN x= 1 THEN 'Citron' WHEN x= 2 THEN 'Floral' WHEN x= 3 THEN 'Grapefruit' WHEN x= 4 THEN 'Jasmine'
                      WHEN x= 5 THEN 'Musk'
                      WHEN x= 6 THEN 'Peony'
                      WHEN x= 7 THEN 'Rose'
                      WHEN x= 8 THEN 'Spices'
                      WHEN x= 9 THEN 'Teakwood'
                      WHEN x= 10 THEN 'Warm' WHEN x= 11 THEN 'Woods' END PARAMETER, CASE WHEN x =1 THEN Citron WHEN x =2 THEN Floral
                      WHEN x =3 THEN Grapefruit
                      WHEN x =4 THEN Jasmine
                      WHEN x =5 THEN Musk
                      WHEN x =6 THEN Peony
                      WHEN x =7 THEN Rose
                      WHEN x =8 THEN Spices
                      WHEN x =9 THEN Teakwood
                      WHEN x =10 THEN Warm
                      WHEN x =11 THEN Woods
                      END VALUE
                      FROM(SELECT * FROM user_profile a,(SELECT 1 AS x
                      UNION ALL SELECT 2 AS x
                      UNION ALL SELECT 3 AS x
                      UNION ALL SELECT 4 AS x
                      UNION ALL SELECT 5 AS x
                      UNION ALL SELECT 6 AS x
                      UNION ALL SELECT 7 AS x
                      UNION ALL SELECT 8 AS x
                      UNION ALL SELECT 9 AS x
                      UNION ALL SELECT 10 AS x
                      UNION ALL SELECT 11 AS x
                      ) b
                      ) a
                      ORDER BY ID, PARAMETER;
                        `, function(error3, result3){
                          if(error3){
                            throw error3;
                          }
                          db.query(`CALL test_procedure()`,function(error4, result4){
                            if(error4){
                              throw error4;
                            }
                            db.query(`SELECT A.perfumeId, A.score, B.name, B.brand, B.type FROM perfumes_result AS B RIGHT JOIN
                              (SELECT * FROM perfumes_score ORDER BY score DESC LIMIT 10) AS A ON A.perfumeId = B.perfumeId ;`, function(error5, perfumes){
                                if(error5){
                                  throw error5;
                                }
                              var title = 'perfume';
                              var html = template.HTML(title,``, `<div class="container" style=" text-align: center; margin-top: 100px;">
                                        <h2 class="mb" style="font-size: 50px; letter-spacing: 3px; font-family: 'Titillium Web', sans-serif;
                                         width: 1000px; margin-left: -173px; font-weight: lighter; margin-bottom: 70px;">Recommended PERFUMES</h2>
                                        ${template.perfumeResult(perfumes)}
                                      </div>` , ``);
                                response.writeHead(200);
                                response.end(html);
                            });//5 query;
                          });//4 query
                        });//3 query;
                });// 2query;
              });//1query
};


//
//처리 결과 출력하는 페이지
// exports.print_result = function(request, response){
//   db.query(`SELECT * FROM perfume`,function(error, perfumes){
//     var title = 'Recommended Perfumes';
//     var list = template.perfumeResult(perfumes);
//     var html = template.HTML(title, list,``,``);
//     response.writeHead(200);
//     response.end(html);
//   });
// }

// exports.show_result =  function(request, response){
// }
