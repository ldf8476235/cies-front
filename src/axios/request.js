/*
 * @Author: your name
 * @Date: 2020-11-18 10:22:01
 * @LastEditTime: 2021-02-05 15:44:26
 * @LastEditors: wh
 * @Description: In User Settings Edit
 * @FilePath: \ec_project\src\utils\request.js
 */
import axios from 'axios';
// import {
//   Message
// } from 'element-ui'
let BASE_URL = ''
if (process.env.NODE_ENV == 'development') {
  BASE_URL = '192.168.210.232:8000'
} else if (process.env.NODE_ENV == 'production') {
  BASE_URL = '192.168.210.233:8000'
}
const http = axios.create({
  timeout: 10000,
  baseURL: 'http://' + BASE_URL
});
// request拦截器
http.interceptors.request.use(config => {
  return config
})
/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  // 后台返回请求失败处理
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
  return response.data
}, error => {
  return Promise.reject(error)
})

export default http
