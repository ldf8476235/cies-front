/*
 * @Author: wh
 * @Date: 2020-11-18 09:50:18
 * @LastEditTime: 2020-11-18 10:07:06
 * @LastEditors: Please set LastEditors
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
import httpRequest from '@/utils/request'
import PageUtil from '@/components/utils/PageUtil'


Vue.component('PageUtil', PageUtil)
Vue.use(ElementUI);
// 引入菜单栏变化问题
import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)
Vue.prototype.$http = httpRequest
// 引入阿里矢量图标
import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
