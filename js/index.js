$(function(){
  // 渲染菜单栏
  $.ajax({
    type:'get',
    url:'http://127.0.0.1:9090/api/getindexmenu',
    dataType:'json',
    success:function(info){
      console.log(info);
      $('.mmb_nav ul').html(template('navTmp',info));
      // 更多按钮的点击事件
      $('.mmb_nav a.more').on('click',function(){
        $('.mmb_nav a.over').toggleClass('hide');
      })
    }
  });

  // 渲染折扣内容
  $.ajax({
    type:'get',
    url:'http://127.0.0.1:9090/api/getmoneyctrl',
    dataType:'json',
    success:function(info){
      console.log(info);
      $('.discount_content ul').html(template("discountTmp",info));
    }
  });
});