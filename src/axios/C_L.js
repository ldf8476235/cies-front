/*
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2021-02-03 18:00:06
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-02-05 10:57:35
 */
// WebSockt URL
let WS_URL_WE, WS_URL_PY
if (process.env.NODE_ENV == 'development') {
  WS_URL_WE = '192.168.210.130:5000'
  WS_URL_PY = '192.168.210.232:8000'
} else if (process.env.NODE_ENV == 'production') {
  WS_URL_WE = '192.168.210.233:5000'
  WS_URL_PY = '192.168.210.233:8000'
}
export default { WS_URL_WE, WS_URL_PY }
