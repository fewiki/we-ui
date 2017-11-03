// ======== 配置文件 开始==================

// 云平台后端服务
window.CloudServer = "/static"


// mock数据服务
window.MockServer = 'http://192.168.1.65:7778'

//=========== 配置文件结束 ======================


// ==================    以下由研发编辑     ========================
// debug开启控制，生产环境设置成true,研发环境设设置成false
var production = false;

// 重写console,去掉注释
if(!!production) {
	window.console = {};
	window.console.log = function(){};
}
