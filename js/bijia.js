$(function(){
  // 从地址栏传递的参数中获取categoryid 
  var productid = getSearch("productid");
  //1.根据分类id渲染产品标题
  $.ajax({
    url:'http://127.0.0.1:9090/api/getproduct',
    data:{
      productid:productid
    },
    dataType:'json',
    success:function(info){
      console.log(info);
      $('.product_title .category').html(template("cateNameTmp",info));
    }
  });
});