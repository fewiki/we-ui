"use strict";

import Vue from 'vue'

// import './config'
// import './service/common/globalFunction'
import VueRouter from 'vue-router'
// Vuex
import Vuex from 'vuex'
// import store from './vuex/store'

// 引入md5

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


// 注入指令
// import './components/directive/directive'
// 注入 过滤器
// import './components/filter/filter'

// 注入路由
import routes from './routes'
// 主模块
import Main from './pages/Main.vue'

//通过
// import './components/axios/axios.js'
//数组
// import './components/utils/array.js'


Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Element)

let router = new VueRouter({
//	mode: 'history',
	routes
})

// 事件共享
window.eventHub = new Vue()

window.App = new Vue({
  el: '#app',
  router,
  Vuex,
  // store,
  render: h => h(Main)
})
