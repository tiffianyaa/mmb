//封装接收地址栏的方法
function getSearch(k){
  var str = location.search.slice(1);
  var arr = str.split('&');
  var obj = {};
  arr.forEach(function(v,i){
    var key = v.split('=')[0];
    var value = v.split('=')[1];
    obj[key]=value;
  });
  return obj[k];
}