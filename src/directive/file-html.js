//  ajax html
import Vue from 'vue'
import EditorFile from '../util/EditorFile'
console.log('inin')
Vue.directive('file-html', {
  bind: function(el,value,node) {
    if(!value.value) {
      el.innerHTML = ''
    } else {
      el.innerHTML = EditorFile.addServerToPath(value.value)
    }

  },
  update: function(el, value) {
    if(!value.value) {
      el.innerHTML = ''
    } else {
      el.innerHTML = EditorFile.addServerToPath(value.value)
    }
  },
  unbind: function() {
    // 清理工作
    // 例如，删除 bind() 添加的事件监听器
  }
})

// 带有表情的描述处理
Vue.directive('content-html',
  function(el,binding) {
    if (!binding.value) {
      el.innerHTML = ''
    } else {
      let text = binding.value.replace(/<(?:.|\n)*?>/gm, '')  //过滤所有html标签
      el.innerHTML = EditorFile.addServerToPath(text)
    }
  }
)

let doImgHtml = function(value) {
  let imgArray = []
  value.value.replace(EditorFile.regImg, function(str) {
    str.replace(/src[=\"\'\s]+([^\"\']+)[\"\']/gim, function(str1) {
      //提取src
      imgArray.push(str1.match(/(src|SRC)=(\"|\')(.*?)(\"|\')/)[3])
    })
  })
  let tpl = ''
  for(let i=0; i<imgArray.length; ) { // 拼接 字符串
    let url = window.FileServerUrl + imgArray[i]
    if (i > 0 && imgArray.length === 2 || i > 1) {
      tpl += `<div class="img-list-item">
			<img src='${ url + "?" + window.SmallImgThumb}' onclick="zoomImg('${url}')" type="uploadImg">
			<span class="img-num ${'img-num-' + i}"><i class="fa fa-image"></i> 共${imgArray.length}张</span>
		  </div>`
    }else{
      tpl += `<div class="img-list-item">
			<img src='${ url + "?" + window.SmallImgThumb}' onclick="zoomImg('${url}')" type="uploadImg">
		  </div>`
    }

    // 最多取3张
    if(i == 2) {
      break
    } else {
      i++
    }
  }

  return tpl

}
let doAllImgHtml = function(value) {
  let imgArray = []
  value.value.replace(EditorFile.regImg, function(str) {
    str.replace(/src[=\"\'\s]+([^\"\']+)[\"\']/gim, function(str1) {
      //提取src
      imgArray.push(str1.match(/(src|SRC)=(\"|\')(.*?)(\"|\')/)[3])
    })
  })
  let tpl = ''
  for(let i=0; i<imgArray.length; ) { // 拼接 字符串
    let url = window.FileServerUrl + imgArray[i]
    tpl += `<div class="img-list-item">
			<img src='${window.FileServerUrl + imgArray[i]  + "?" + window.SmallImgThumb}'
			 onclick="zoomImg('${url}')" type="uploadImg">
		</div>`
    i++
  }

  return tpl

}

// 从消息富文本中提取消息标题
let getNewsTitle = function(value){
  return value.split('\n')[1]
}
// 从消息富文本中提取消息内容
let getNewsContent = function(value) {
  return value.split('\n')[2]
}
Vue.directive('html-img-list', {
  bind: function(el,value,node) {
    if(!!value.value) {
      el.innerHTML =  doImgHtml(value)
    }
  },
  update: function(el, value) {
    if(!!value.value) {
      el.innerHTML =  doImgHtml(value)
    }

  },
  unbind: function() {
    // 清理工作
    // 例如，删除 bind() 添加的事件监听器
  }
})
// 从富文本中提取 全部图片  ——>投票页
Vue.directive('html-img-allList', {
  bind: function(el,value,node) {
    if(!!value.value) {
      el.innerHTML =  doAllImgHtml(value)
    }
  },
  update: function(el, value) {
    if(!!value.value) {
      el.innerHTML =  doAllImgHtml(value)
    }

  },
  unbind: function() {
    // 清理工作
    // 例如，删除 bind() 添加的事件监听器
  }
})

// 搜索列表中 带 图片处理、文字处理的特殊化高亮处理
Vue.directive('high-light', 		//简写方式，只关心bind 和 update
  function(el,binding) {
    if(!!binding.value.words) {
      var reg = new RegExp(binding.value.query, "gim")
      //转化为HTML
      let words = binding.value.words.replace(/<(?:.|\n)*?>/gm, '')
//			替换表情并限制为50
      let regEmoji = /[/emoji[0-9]+]/gi
      words = words.replace(regEmoji, '')
      el.innerHTML =  words.replace(reg, '<span class=\'highlight\'>' + binding.value.query + '</span>')
    }
  }
)

//处理高亮的全局函数
Vue.prototype.highLight = function(words,query){
  if(!!words && !!query) {
    var reg = new RegExp(query, "gim")
    return words.toString().replace(reg, '<span class=\'highlight\'>' + query + '</span>')
  }else{
    return words
  }
}


//文本超出数量拼接省略号
Vue.directive('multiple-line',      //使用： v-multiple-line:3="text"   3为需要限制的字数
  function (el,binding)  {        //注意： 需要为绑定的元素设置自动换行，最大宽度
    let words = binding.value.replace(/<(?:.|\n)*?>/gm, '')
    let regEmoji = /[/emoji[0-9]+]/gi
    words = words.replace(regEmoji, '')
    if (words.length > Number(binding.arg)){
      el.innerHTML = words.slice(0,Number(binding.arg)) + '...'
      el.title = words    //添加title属性
    }else{
      el.innerHTML = words
    }
  }
)
// 获取消息标题
Vue.directive('news-title', {
  bind: function(el,data) {
    if(!!data.value) {
      el.innerHTML =  getNewsTitle(data.value)
    }
  },
  update: function(el, data) {
    if(!!data.value) {
      el.innerHTML =  getNewsTitle(data.value)
    }

  },
  unbind: function() {
    // 清理工作
    // 例如，删除 bind() 添加的事件监听器
  }
})
// 获取消息内容
Vue.directive('news-content', {
  bind: function(el,data) {
    if(!!data.value) {
      el.innerHTML =  getNewsContent(data.value)
    }
  },
  update: function(el, data) {
    if(!!data.value) {
      el.innerHTML =  getNewsContent(data.value)
    }
  },
  unbind: function() {
    // 清理工作
    // 例如，删除 bind() 添加的事件监听器
  }
})
