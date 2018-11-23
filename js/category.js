$(function(){
  //动态渲染分类标题
  $.ajax({
    type:'get',
    url:'http://127.0.0.1:9090/api/getcategorytitle',
    dataType:'json',
    success:function(info){
      console.log(info);
      $('.mmb_category ul').html(template('categoryTmp',info));
      $('.itemBox').on('click','.item a',function(){
        // $(this).next().toggleClass('hide');
        var titleid = $(this).data('titleid');
        console.log(titleid);
        // 存储一下this,方便获取这个a
        var that = $(this);
        $.ajax({
          type:'get',
          url:'http://127.0.0.1:9090/api/getcategory',
          data:{
            titleid:titleid
          },
          dataType:'json',
          success:function(info){
            console.log(info);            
            that.next().html(template('sonTmp',info));
            // 显示隐藏功能
            that.next().slideToggle();
          }
        });
        
      });
    }
  });
});