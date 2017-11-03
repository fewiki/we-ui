import Vue from 'vue'
import {MessageBox} from 'element-ui'

Vue.directive('confirm', {
  bind: function (el, bindings, node,arg) {
    el.addEventListener('click',function () {
      let title=el.getAttribute('title')||'是否继续操作？';
      MessageBox.confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        bindings.value();
      }).catch(()=>{
      });
    })

  },
})
