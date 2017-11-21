// htmlToText
import Vue from 'vue'
// html转 文字
Vue.filter('htmlToText', function(html) {
	if(!!html) {
		return html.replace(/<(?:.|\n)*?>/gm, '')
//      return $("<div>" + html.toString() + "</div>").text()
    }else{
        return
    }
})

// html 字数统计
Vue.filter('htmlWordCount', function(html) {
	if(!!html) {
        return $("<div>" + html.toString() + "</div>").text().length
    }else{
        return 0
    }
})

// 将表情 置空
Vue.filter('replaceEmoji', function(str) {
	if(!str) return
	let regEmoji = /[/emoji[0-9]+]/gi
	str = str.replace(regEmoji, '')
	return str
})

// 字数限制
Vue.filter('limitTo', function(str, length) {
	if(!!str) {
        return str.substr(0, length)
    }else{
        return str
    }
})

//截取学科名
Vue.filter('cutOutSubjectName', function(str) {
	if(!!str) {
        return str.substr(0, 1)
    }else{
        return str
    }
})

// 印章id转name
Vue.filter('sealIdTOName', function(str) {
  if(!!str) {
    return str.substr(0, 1)
  }else{
    return str
  }
})
