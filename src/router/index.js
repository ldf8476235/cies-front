/*
 * @Author: wh
 * @Date: 2020-11-30 17:12:31
 * @LastEditTime: 2020-12-03 12:43:35
 * @LastEditors: wh
 * @Description: In User Settings Edit
 * @FilePath: \cies-front\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/device',
    children:[
      {
        path: '/task',
        name: 'Task',
        component: () => import('../views/task-manage/Index.vue')
      },
      {
        path: '/task/newtask',
        name: 'NewTask',
        component: () => import('../views/task-manage/new-task/Index.vue')
      },
      {
        path: '/case',
        name: 'Case',
        component: () => import('../views/case-manage/Index.vue')
      },
      {
        path: '/case/newcase',
        name: 'NewCase',
        component: () => import('../views/case-manage/new-case/Index.vue')
      },
      {
        path: '/action',
        name: 'Action',
        component: () => import('../views/action-manage/Index.vue')
      },
      {
        path: '/action/newaction',
        name: 'NewAction',
        component: () => import('../views/action-manage/new-action/Index.vue')
      },
      {
        path: '/verify',
        name: 'verify',
        component: () => import('../views/verify-manage/Index.vue')
      },
      {
        //设备管理
        path: '/device',
        name: 'Device',
        component: () => import('../views/device-manage/Index.vue')
      },
      {
        //添加设备
        path: '/device/add',
        name:'AddDevice',
        component: () => import('../views/device-manage/Add.vue')
      },
      {
        path: '/script',
        name: 'Script',
        component: () => import('../views/script-manage/Index.vue')
      },
      {
        path: '/role',
        name: 'Role',
        component: () => import('../views/role-manage/Index.vue')
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('../views/user-manage/Index.vue')
      },
      {
        //接口文档与调试
        path: '/api',
        name:'Api',
        component: () => import('../views/other/Api.vue')
      },
      {
        //更新设备
        path: '/device/update',
        name:'AddDevice',
        component: () => import('../views/device-manage/Add.vue')
      },

    ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
export default router
