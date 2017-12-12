# We UI 贡献指南

Hi! 首先感谢你使用或贡献 We UI。

## Issue 规范
- issue 仅用于提交 Bug 或 Feature 以及设计相关的内容，其它内容可能会被直接关闭。

- 在提交 issue 之前，请搜索相关内容是否已被提出。

## 分支 规范

- master为发行分支，受保护，不可直接提交代码
- develop分支为研发主分支，受保护，不可直接提交代码
- 研发时，需要从develop分支切出分支，然后开发，开发完后，提交合并请求到develop分支。  或folk项目后，改完之后发起pull request


## 组件开发流程

### 1 组件抽象和组建定义
```
  - 先预想好要抽取的组件
  - 定义好组件的接口 （传入的值 Attributes，事件Events等），
  - 在 https://www.showdoc.cc/1699703?page_id=15671078 写出markdown说明文档
  - 发到小组内一块讨论确定下
```

### 2 组件编写
```
   组件统一存放在src/package目录下，通过src/module.js引入
```

### 3 组件示例编写
```
  组件示例存放在examples文件夹中
  这个文件夹是vue-cli的基本结构，可以在pages其中建立相应的文件夹开发，文件名与组件文件名一致
  启动方式 npm run dev
```

### 4 组件的说明文档完善
```
  *快速开始*
  组件说明文档采用 docsify 编写，以markdown格式存储，要以集成vue模版
  // 安装方式
  npm i docsify-cli -g
  // 启动 （在we-ui目录中）
  docsify serve docs  （启动失败用：docsify serve ./docs）
  
  更多使用说明 看方说明文档： https://docsify.js.org/#/zh-cn/
 
   
  *开发*
  将1和3的内容整合到docs文件夹中，在components中建文件，建立相应的组件.md文件，在_sidebar.md中建立好目录引用
 
  如果组件的结构或内容有变化，需要重复以上4个步骤
```

## 文件规范

- 严格按照we-ui代码结构存放
- 文件名必须英文，不能用中文，全小写，要简洁 具有领域特征（拿不准的参考下领域关键词，没有的在领域关键词里补充一下）
- 组件文件名：'We'开头+组件名，如 WeEditor
- less类名 规则，'we-'+ 组件名，如 we-editor

## 代码规范

总体参照腾讯的吧，咱们也向大公司看齐 http://alloyteam.github.io/CodeGuide/

（补充以下，不断完善中...）
### html

- html基本都小写，除了id或变量名等

# css(less)

- css class命名用 - 链接， id用 驼峰命名


## js

- 严格执行js 注释规范，包括单行注释 和 多行注释 ，函数必须用多行注释，注明功能 参数和返回类型
- js 常量全大写，变量驼峰命名





