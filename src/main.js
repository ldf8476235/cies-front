/*
 * @Author: wh
 * @Date: 2020-11-18 09:50:18
 * @LastEditTime: 2021-01-29 14:16:10
 * @LastEditors: wh
 * @Description: In User Settings Edit
 * @FilePath: \ec_project\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入axios请求
import axios from './axios/axios.js'
Vue.prototype.$axios = axios
// 引入全局基础样式
import './assets/css/global.css'
// 引入elemrntUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, { size: 'mini' });

// 分页组件
import PageUtil from './components/page/PageUtil'
Vue.component('PageUtil', PageUtil)

// 引入菜单栏变化问题
import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)
// 登峰请求引入
import httpRequest from '@/axios/request'
Vue.prototype.$http = httpRequest
// 引入阿里矢量图标
// import './assets/iconfont/iconfont.css'

import vClickOutside from 'v-click-outside'
Vue.use(vClickOutside)
// 引入自定义面包屑组件
import crumbs from './components/crumbs/index'
Vue.use(crumbs)

// 引入代码编辑器
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
Vue.use(codemirror);

// 引入jshint用于实现js自动补全提示
import jshint from 'jshint';
window.JSHINT = jshint.JSHINT;

// 引入流程图插件
import jsPlumb from 'jsplumb'
Vue.prototype.$jsPlumb = jsPlumb.jsPlumb
// 引入常用的函数
import { hintMsg } from '@/utils/utils.js'
Vue.prototype.$hintMsg = hintMsg
// 引入svg图标
import './icon-svg/index.js'
// import { from } from 'core-js/fn/array'
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el) {
    console.log(el.children)
    // 聚焦元素
    el.children[0].focus()
  }
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
