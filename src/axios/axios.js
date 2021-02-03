/*
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-04 13:30:20
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-02-01 15:52:50
 */
import axios from 'axios'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
// 创建axios实例
// console.log('地址查询：', process.env)
let BASE_URL
if (process.env.NODE_ENV == 'development') {
  BASE_URL = ''
} else if (process.env.NODE_ENV == 'production') {
  BASE_URL = ''
}
const service = axios.create({
  baseURL: BASE_URL, // api的base_url,
  timeout: 10000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
  return config
})

// respone拦截器
service.interceptors.response.use(response => {
  return response.data
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
}, err => {
  console.log('错误信息：', err)
  return Promise.reject(err)
})

export default service
