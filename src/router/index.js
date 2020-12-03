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
        //接口文档与调试
        path: '/api',
        name:'Api',
        component: () => import('../views/other/Api.vue')
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
