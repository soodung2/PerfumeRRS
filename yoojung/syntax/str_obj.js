var post = {
  '1': '4',
  '2': '3',
  '3': '4',
  '4': '5',
  '6': '1'
};
// console.log(post);
// console.log(`second value post['6'] = ${post['6']}`);
for (var one_set in post){
  var key = parseInt(one_set);
  var type_of_key = typeof(key);
  var value = parseInt(post[one_set]);
  console.log(`key, iow perfume_id is ${key}, value is ${value} and typeof(value) is ${typeof(value)}`);
}


db.query(`INSERT INTO survey (woody, green, floral, citrus, oriental, cypre, herbal, perfume_id )
        VALUE(?,?,?,?,?,?,?,?)`),[],
        function(error, result){
          if(error){
            throw error;
          }
          console.log(result);
        });
