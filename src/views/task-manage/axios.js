/*
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-25 10:15:50
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2020-12-25 10:20:06
 */
import http from '../../utils/request.js'
/**
 * 获取任务列表
*/
export function getTask() {
  http({
    method: 'GET',
    url: 'task/list'
  }).then(res => {
    console.log(res)
  })
}
