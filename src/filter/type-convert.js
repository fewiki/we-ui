// 资源icon根据资源类型显示
import Vue from 'vue'
Vue.filter('typeImg', function(res) {
	console.log("typeImg:", res)
	// 文件相对路径
	let relativePath = CloudServer + "/rrtWeb/icon/"
	// 资源平台资源判断
	let resFileType = function() {
		return relativePath + (res.fileExt ? res.fileExt.split('.')[1] : 'default') + '.png'
	}
	// 缩略图
	switch(res.contType) {
		case 3: // 学案
			return relativePath + 'xuean.png'
			break;
		case 4: // 练习
			return relativePath + 'work.png'
			break;
		case 6: // 讨论
			return relativePath + 'topic.png'
			break;
		case 9: // 资源中心个人资源
			return resFileType()
			break;
		case 10: // 资源中心系统
			return resFileType()
			break;
		case 13: // 连线
			return relativePath + 'default.png'
			break;
		case 14: // 填空
			return relativePath + 'default.png'
			break;
		case 77: // 游戏
			return relativePath + 'game.png'
			break;
		default: // 默认
			return relativePath + 'default.png'
			break;
	}
})

//显示类型名称
Vue.filter('showTypesName', function(type) {
	//console.log("showType:", type)

	switch(type) {
		case 1:
			return '主题讨论'
			break;
		case 2:
			return '写作'
			break;
		case 3:
			return '小组讨论'
			break;
		case 4:
			return '投票'
			break;
		case 5:				//发起的投票
			return '投票'
			break;
		case 10:
			return '学习专题'
			break;
	}
})
Vue.filter('filterMark',function(value) {
	//批阅初始化
	switch(value) {
		case false:
			return '待批阅'
			break;
		case true:
			return '已批阅'
			break;
	}
})
Vue.filter('showActiveName',function(type){
	switch(type) {
		case 1:
			return '回复'
			break;
		case 2:
			return '作品'
			break;
		case 3:
			return '讨论'
			break;
		case 4:
			return '投票'
			break;
		case 5:				//发起的投票
			return '投票'
			break;
		case 10:
			return '主题'
			break;
	}
})
