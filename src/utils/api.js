/*
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2021-01-29 14:15:24
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-01-29 15:12:08
 */
import http from '../axios/request'
// GET
export function GET(url) {
  return new Promise((resolve, reject) => {
    http({
      method: 'GET',
      url: url
    }).then(res => {
      if (res.status_code === 200) {
        resolve(res.data)
      } else {
        reject(res.msg)
      }
    }).catch(err => {
      console.log(err)
    })
  })
}

// POST/PUT
export function POST(url, method, params) {
  console.log(url, method, params)
  return new Promise((resolve, reject) => {
    http({
      method: method,
      url: url,
      data: params
    }).then(res => {
      if (res.status_code === 200) {
        resolve(res.data)
      } else {
        reject(res.msg)
      }
    }).catch(err => {
      console.log(err)
    })
  })
}
