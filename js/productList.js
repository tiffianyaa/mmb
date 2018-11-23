$(function(){
  // 从地址栏传递的参数中获取categoryid 
  var categoryid = getSearch("categoryid");
  //1.根据分类id渲染产品标题
  $.ajax({
    url:'http://127.0.0.1:9090/api/getcategorybyid',
    data:{
      categoryid:categoryid
    },
    dataType:'json',
    success:function(info){
      console.log(info);
      $('.product_title .category').html(template("cateNameTmp",info));
    }
  });


  render();
  var total;
  var currentPage=1;
  //2.根据分类id和页码渲染商品列表
  function render(currentPage){
    currentPage = currentPage || 1;
    $.ajax({
      url:'http://127.0.0.1:9090/api/getproductlist',
      data:{
        categoryid:categoryid,
        pageid:currentPage
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        $('.product_content ul').html(template("productTmp",info));
        //计算总页数
        total = Math.ceil(info.totalCount/info.pagesize);
        // 根据总页数渲染分页列表
        var htmlStr = template("pageTmp",{total:total});
        $('.pageBox ul').html(htmlStr);
        $('.pageBox button').text(currentPage+"/"+total);
      }
    });
  }

  //3.控制分页列表的显示隐藏
  $('.mui-navigate-right').click(function(){
    $('.pageBox .page').toggleClass('hide');
  });

  //4.给分页列表的每个li创建点击事件
  // var currentPage = 1;
  $('.pageBox .page').on('click','li',function(){
    var str = $(this).text();
    $('.pageBox button').text(str);
    currentPage = $(this).data("page");
    render(currentPage);    
  })

  // 下一页
  $('.next').click(function(){
    currentPage ++;
    if(currentPage >= total){
      currentPage = total;
    }
    $('.pageBox button').text(currentPage+"/"+total);
    render(currentPage);
  });

  // 上一页
  $('.prev').click(function(){
    currentPage --;
    if(currentPage <= 1){
      currentPage = 1;
    }   
    $('.pageBox button').text(currentPage+"/"+total);
    render(currentPage);
  });
});