/*
 * @Author: your name
 * @Date: 2020-11-18 10:22:01
 * @LastEditTime: 2020-11-18 10:22:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ec_project\src\utils\request.js
 */
import axios from 'axios';
// import {
//   Message
// } from 'element-ui'

const http = axios.create({
    timeout: 10000,
    baseURL:"http://192.168.220.139/cies"
});

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  //后台返回请求失败处理
  // if (response.data && response.data.code == 0){
  //   Message({
  //     message: '失败',
  //     type: 'error',
  //     duration: 3 * 1000
  //   })
  //   return 
  // } else {
  //   return response
  // }
  return response
}, error => {
  return Promise.reject(error)
})

export default http