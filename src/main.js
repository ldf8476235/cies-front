/*
 * @Author: wh
 * @Date: 2020-11-18 09:50:18
 * @LastEditTime: 2020-12-02 18:15:34
 * @LastEditors: wh
 * @Description: In User Settings Edit
 * @FilePath: \ec_project\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局基础样式
import './assets/css/global.css'
// 引入elemrntUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI,{ size: 'mini' });

import httpRequest from '@/utils/request'
// 分页组件
import PageUtil from './components/utils/PageUtil'
Vue.component('PageUtil', PageUtil)

// 引入菜单栏变化问题
import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)
Vue.prototype.$http = httpRequest
// 引入阿里矢量图标
import './assets/iconfont/iconfont.css'

// 引入自定义面包屑组件
import crumbs from './components/crumbs/index'
Vue.use(crumbs)

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
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
