module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

      <link href="https://www.jqueryscript.net/css/jquerysctipttop.css" rel="stylesheet" type="text/css">

      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link href="https://fonts.googleapis.com/css2?family=Castoro&family=Texturina:wght@100;200&family=Titillium+Web:wght@200;300&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Courgette&family=Great+Vibes&family=Parisienne&family=Pinyon+Script&family=Playball&family=Yesteryear&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&family=Inconsolata:wght@200&family=Xanh+Mono:ital@1&display=swap" rel="stylesheet">

      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <!-- Simple Rating -->
      <link rel="stylesheet">
      <style>
        html { height: 100vh; }
        body {background: linear-gradient(to top right, #060628, #1F245A, #682359); color: #fff; font-family: 'Open Sans';}
        .container { max-width: 640px; margin: 150px auto; }
        .simple-rating{
        }
        .ma{
          font-family: 'Castoro', serif;
        }
        .mb{
          font-family: 'Titillium Web', sans-serif;
        }
        .mc{
          font-family: 'Texturina', serif;
        }
        .md{
          font-family: 'Courgette', cursive;
          font-family: 'Great Vibes', cursive;
          font-family: 'Parisienne', cursive;
          font-family: 'Pinyon Script', cursive;
          font-family: 'Playball', cursive;
          font-family: 'Yesteryear', cursive;
          font-family: 'Xanh Mono', monospace;
          font-family: 'Inconsolata', monospace;
          font-family: 'Dancing Script', cursive;
        }
        #login_wrapper{
          padding: 5px 20px;
          position: absolute;
          top: 30%;
          left: 47.5%;
          width: 400px; height: 250px;
          margin-left: -190px;
          margint-top: -170px;
          display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
        }
        h1{
          font-size: 50px;
          padding-bottom: 20px;
        }
        A:LINK {text-decoration: none;}
        A:VISITED {text-decoration: none;}
        A:ACTIVE {text-decoration: none; }
        A:HOVER {text-decoration: none; }
        .jb-default-1 { font-size: 16px; }
        .jb-default-2 { font-size: 24px; }
        .jb-smaller { font-size: smaller; }
        .jb-larger { font-size: larger; }

        .simple-rating i{
          color: #f5ba00;
          display: inline-block;
          padding: 1px 2px;
          cursor: pointer;
        }
        .navbar {
          background: ivory;
          margin: 0; padding: 0;
          list-style: none;
          // position: fixed;
          width: 100%;
        }
        .navbar>li {
          display: inline-block;
        }
        .navbar>li>a {
          display: block;
          text-decoration: none;
          padding: 10px 20px;
          color: black;
        }
        .stars-outer {
        display: inline-block;
        position: relative;
        font-family: FontAwesome;
        }
        .stars-outer::before {
          content: "\f006 \f006 \f006 \f006 \f006";
        }

        .stars-inner {
          position: absolute;
          top: 0;
          left: 0;
          white-space: nowrap;
          overflow: hidden;
          width: 0;
        }

        .stars-inner::before {
          content: "\f005 \f005 \f005 \f005 \f005";
          color: #f8ce0b;
        }

        .attribution {
          font-size: 12px;
          color: #444;
          text-decoration: none;
          text-align: center;
          position: fixed;
          right: 10px;
          bottom: 10px;
          z-index: -1;
        }
        .attribution:hover {
          color: #1fa67a;
        }
      </style>
      <ul class="navbar" style="top: 0px;right: 0px;    height: 50px;    background: #3c245a; margin: 0; padding: 0;">
        <li><a href="/" class="mb" style="font-size: 25px; margin-top: 0px; font-family: 'Titillium Web', sans-serif; font-weight: 100; padding-bottom: 10px;padding-top: 8px;color: #f6f5f7;
          letter-spacing: 2px;">PERFUME R.S.S</a></li>
      </ul>
    </head>

    <body style="margin-left: 0px;
     margin-top: 0px;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 8px;">

      ${list}
      ${body}
      ${control}
    </body>
    </html>
    `;
  },list:function(topics){
    var list = '<ul>';
    var i = 0;
    while(i < topics.length){
      list = list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  },authorSelect: function(authors, author_id){
    var tag = '';
    var i = 0;
    while(i < authors.length){
      var selected = '';
      if(authors[i].id === author_id){
        selected = ' selected';
      }
      tag = tag + `<option value = " ${authors[i].id}"${selected}>${authors[i].name}</option>`;
      i++;
    }
    return `
      <select name = "author">
        ${tag}
      </select>`;
  },authorTable: function(authors){
    var tag = '<table>';
    var i = 0;
    while(i < authors.length){
      tag += `
          <tr>
            <td>${authors[i].name}</td>
            <td>${authors[i].profile}</td>
            <td><a href="/author/update?id=${authors[i].id}">update</a></td>
            <td>
              <form action="/author/delete_process" method="post">
                <input type="hidden" name ="id"  value="${authors[i].id}">
                <input type="submit" value="delete">
              </form>
            </td>
          </tr>
          `;
      i++;
    }
    tag +=  '</table>';
    return tag;
  },perfumeTable: function(perfumes){
    var tag = '<table>';
    var i = 0;
    while(i< perfumes.length){
      tag+=`
        <tr>
          <td>${perfumes[i].name}</td>
          <td>${perfumes[i].brand}</td>
        </tr>
          `;
      i++;
    }
    tag += '</table>';

    return tag;
  },perfumeList: function(perfumes){
    var list = '<ul>';
    var i = 0;
    while(i < perfumes.length){
      list = list + `<li><a href="/?id=${perfumes[i].id}">${perfumes[i].name}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  },perfumeReport: function(perfumes){
    var list = '';
    var i = 0;
    while(i< perfumes.length){
      list = list + `
      <div class="mb" style="font-family: 'Titillium Web', sans-serif;">
      <p style="font-size: x-large;font-weight: bold;font-size: 25px;    margin-bottom: 10px;">${perfumes[i].brand}</p>
      <p style="margin-top: 0px;margin-bottom: 5px;">${perfumes[i].name}</p>
      <span>
        <input name ="${perfumes[i].perfumeId}" class="rating">
      </span></div>`;
      i++;
    }
    return list;
  },perfumeResult: function(perfumes){
    var list = '';
    var i = 0;
    while(i< perfumes.length){
      var type_list = '';
      var type_str = perfumes[i].type;
      var type_split = type_str.split('|');
      for(var j in type_split){
        type_list = type_list +type_split[j] +' ';
      }
      var score = (perfumes[i].score).toFixed(1);
      list = list + `<div class="mb" style="font-family: 'Titillium Web', sans-serif;">
        <p class ="md" style="font-size: x-large; font-weight: bold;    font-size: 40px;    margin-bottom: 10px;    font-family: 'Pinyon Script', cursive;">${i+1}.</p>
        <p style="font-size: 30px;font-weight: bold;font-size: 25px;    margin-bottom: 10px;margin-top: 10px;">${perfumes[i].brand}</p>
        <p>
          <span style="margin-top: 0px;margin-bottom: 5px;font-size: 26px;">${perfumes[i].name}</span>
          <span class="md" style="margin-top: 0px; margin-bottom: 5px; margin-left: 7px; font-size: larger; font-family: 'Inconsolata', monospace;">| ${type_list}</span>
        </p>
        <p style="font-size:28px;">${score}</p>

      </div>
      `;
      i++;
    }
    return list;
   }
}
// <div class="num${i+1}">
//   <div class="stars-outer">
//    <div class="stars-inner"></div>
//   </div>
// </div>
// ,scriptContent: function(perfumes){
//   var content = '';
//   var k  = 0;
//   while(k< 5){
//     content = content +`var v${k+1} = ${perfumes[k].score}`;
//   }
//   content = content +`const we = { num1: v1, num2: v2, num3: v3, num4:v4, num5: v5 }
//   const starTotal = 5;
//
//   for(let one in we) {
//     const starPercentage = (we[one] / starTotal) * 100;
//     const tmp = (Math.round(starPercentage /10))*10;
//
//     document.querySelector(`.${one}`).querySelector(`.stars-outer`).querySelector(`.stars-inner`).style.width = 30%;
//   }`;
//   // var v1 = ${perfumes[0].score};
//   // var v2 = ${perfumes[1].score};
//   // var v3 = ${perfumes[2].score};
//   // var v4 = ${perfumes[3].score};
//   // var v5 = ${perfumes[4].score};
//   return content;
// }
