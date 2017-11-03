// ie9跨域处理
var cors = {}
// 配置api
var config = {
	CloudServer: "/proxy.html",
	TestServer: "/zhl/proxy.html",
	FileServer: "/down/proxy.html"
}
cors[CloudServer] = config.CloudServer
cors[TestServer] = config.TestServer
cors[FileServer] = config.FileServer
xdomain.slaves(cors)