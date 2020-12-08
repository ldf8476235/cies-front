/*
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-08 17:58:52
 * @LastEditors: wh
 * @Description: 
 * @LastEditTime: 2020-12-08 18:29:43
 */
import Vue from "vue"
import svgIcon from "./Index.vue"
 
Vue.component('svg-icon',svgIcon)  //挂载全局组件
 
//下面这个是导入svgIcon/svg下的所有svg文件
const requireAll = requireContext => requireContext.keys().map(requireContext)
  const req = require.context('./iconsvg', false, /\.svg$/) 
  /*
   第一个参数是:'./svg' => 需要检索的目录，
   第二个参数是：false => 是否检索子目录,
   第三个参数是: /\.svg$/ => 匹配文件的正则
  */
  requireAll(req);