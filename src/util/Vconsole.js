/**
 * 保持代码整洁优雅，享受编程
 * @author lgzhang08@gmail.com *
 * 移动端 调试工具
 */

window.addVconsole = function(){
  $(function() {

    // 是否加载 vconsole，用于移动端 调试
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "./static/lib/vconsole/vconsole.min.js";
    document.getElementsByTagName("head")[0].appendChild(script);

    // 长按左上角，显示vconsole
      var tpl = '<div id="debugVconsole" style="position: fixed; top:2px; left:2px; width: 20px; height: 20px;"></div>'
      $('body').append(tpl)
      var timeOutEvent = 0
      setTimeout(function() {
        $('#__vconsole').hide()
      }, 1000);
      $("#debugVconsole").on({
        touchstart: function(e) {
          timeOutEvent = setTimeout(function() {
            $('#__vconsole').toggle()
          }, 1000);
          e.preventDefault();
        },
        click: function(e) {
          timeOutEvent = setTimeout(function() {
            $('#__vconsole').toggle()
          }, 1000);
          e.preventDefault();
        },
        touchmove: function() {
          clearTimeout(timeOutEvent);
          timeOutEvent = 0;
        },
        touchend: function() {
          clearTimeout(timeOutEvent);
          return false;
        }
      })
    });
}

if(/debug/.test(location.href)){
} else{
  window.addVconsole()
}


