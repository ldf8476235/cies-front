/*
 * @Author: wh
 * @Date: 2020-11-30 17:12:31
 * @LastEditTime: 2020-12-10 16:24:17
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
      // 任务
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
        path: '/task/taskdetails',
        name: 'TaskDetails',
        component: () => import('../views/task-manage/task-details/Index.vue')
      },
      // 用例
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
        path: '/case/casedetails',
        name: 'CaseDetails',
        component: () => import('../views/case-manage/case-details/Index.vue')
      },
      // 动作
      {
        path: '/action',
        name: 'Action',
        component: () => import('../views/action-manage/Index.vue')
      },
      {
        path: '/action/carscreen',
        name: 'CarScreen',
        component: () => import('../views/action-manage/new-action/CarScreen.vue')
      },
      {
        path: '/action/newscreen',
        name: 'NewScreen',
        component: () => import('../views/action-manage/new-action/Screen.vue')
      },
      {
        path: '/action/newvoice',
        name: 'NewVoice',
        component: () => import('../views/action-manage/new-action/Voice.vue')
      },
      {
        path: '/action/newscript',
        name: 'NewScript',
        component: () => import('../views/action-manage/new-action/Script.vue')
      },
      // 检验点
      {
        path: '/verify',
        name: 'verify',
        component: () => import('../views/verify-manage/Index.vue')
      },
      {
        path: '/verify/newimage',
        name: 'NewImage',
        component: () => import('../views/verify-manage/new-verify/Image.vue')
      },
      {
        path: '/verify/newaudio',
        name: 'NewAudio',
        component: () => import('../views/verify-manage/new-verify/Audio.vue')
      },
      {
        path: '/verify/newtext',
        name: 'NewText',
        component: () => import('../views/verify-manage/new-verify/Text.vue')
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
      // 脚本
      {
        path: '/script',
        name: 'Script',
        component: () => import('../views/script-manage/Index.vue')
      },
      // 角色
      {
        path: '/role',
        name: 'Role',
        component: () => import('../views/role-manage/Index.vue')
      },
      // 用户
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
        name:'UpdateDevice',
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
