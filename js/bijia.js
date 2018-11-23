$(function(){
  // 从地址栏传递的参数中获取productid 
  var productid = getSearch("productid");
  console.log(productid);
  
  //1.根据商品id获取分类id 
  $.ajax({
    url:'http://127.0.0.1:9090/api/getproduct',
    data:{
      productid:productid
    },
    dataType:'json',
    success:function(info){
      console.log(info);
      // 保存商品分类id
      var categoryid = info.result[0].categoryId;
      console.log(categoryid);
      // 截取商品名
      var productName = info.result[0].productName.split(' ')[0];
      console.log(productName);
      $('.product_desc').html(template('descTmp',info));
      $('.buy_top').html(template('buyTmp',info));

      // 2.根据categoryId获取分类名,渲染三级标题
      $.ajax({
        url:'http://127.0.0.1:9090/api/getcategorybyid',
        data:{
          categoryid:categoryid
        },
        dataType:'json',
        success:function(info){
          console.log(info);
          var obj = {
            category:info.result[0].category,
            categoryid:categoryid,
            productName:productName
          }
          $('.product_title').html(template('cateNameTmp',obj));
        }
      });
    }
  });

  //3.渲染商品评论
  $.ajax({
    url:'http://127.0.0.1:9090/api/getproductcom',
    data:{
      productid:productid
    },
    dataType:'json',
    success:function(info){
      console.log(info);
      $('.comment_content ul').html(template("productTmp",info));
    }
  });
});