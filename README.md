# we-ui
通用组件库


## 代码目录 说明
- |——docs 说明文档
- |——examples 示例代码
- |——src 组件代码目录
	- |——index.js  入口文件
	- |——module.js 组件引入文件 
	- |——directive 通用指令文件夹
	- |——filter    通用过滤器文件夹
	- |——packages  组件文件夹
	- |——util      通用工具类文件夹


## 开发规范
([中文](https://github.com/fewiki/we-ui/blob/develop/.github/CONTRIBUTING.zh-CN.md))


## 研发环境运行

``` bash
# 安装依赖 推荐使用 yarn，比npm好用
1. yarn install
温馨提示: 如果安装不成功，可以使用npm install -g cnpm --registry=https://registry.npm.taobao.org安装淘宝镜像，替换npm命令为cnpm命令重新安装

//配置
2. 需复制webconfig/webconfig_example.js为webconfig.js,并修改对应的内容

// 运行项目，运行在 localhost:9999（端口号可在config/index.js中更改）
3. npm run dev


=========================================================================
以下为生产环境运行
=========================================================================
# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```


可安装开发工具：https://github.com/vuejs/vue-devtools

## LICENSE
MIT
