<!--
 * @Author: wh
 * @Date: 2020-11-18 09:50:18
 * @LastEditTime: 2020-11-18 10:16:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ec_project\src\views\Layout.vue
-->
<template>
  <div class="layout">
        <el-container>
          <el-aside width="160px">
            <el-menu
              background-color="#FFFFFF"
              text-color="#4A4A4A"
              active-text-color="#006CEB"
              :collapse="collapse"
              :collapse-transition="false"
              :router='true'
              :default-active='activePath'
              class="menuHeight"
              >
              <div @click="goHome" class="logo">
                <!-- <img :src="collapse ? imgLogo : imgLogo5"> -->
              </div>
              <nav-menu v-for="(item) in navData" :key="item.id" :item='item'></nav-menu>
            </el-menu>
          </el-aside>
          <el-container>
          <el-header>
            Hearder
          </el-header>
          <el-container>
            <el-main>
              <transition :name="transitionName">
              　<router-view class="Router"></router-view>
              </transition>
            </el-main>
          </el-container>
        </el-container>
      </el-container>
  </div>
</template>

<script>
import NavMenu from '@/components/menu/NavMenu.vue'
export default {
  name:'Layout',
  components:{
    NavMenu
  },
  data(){
    return {
      transitionName: 'slide-right',
      collapse: false,
      activePath:'/device',
      tabName:'设备管理',
      // 左侧导航栏菜单
      navData: [
        {
          id: '001',
          name: '任务管理',
          path: '/task',
          icon: 'icon-changjing',
          children: []
        },
        {
          id: '002',
          name: '用例管理',
          path: '/task',
          icon: 'icon-changjing',
          children: []
        },
        {
          id: '003',
          name: '动作管理',
          path: '/task',
          icon: 'icon-changjing',
          children: []
        },
        {
          id: '004',
          name: '设备管理',
          path: '/device',
          icon: 'icon-changjing',
          children: []
        },
        {
          id: '005',
          name: '脚本管理',
          path: '/task',
          icon: 'icon-changjing',
          children: []
        },
        {
          id: '006',
          name: '角色管理',
          path: '/task',
          icon: 'icon-changjing',
          children: []
        },
        {
          id: '007',
          name: '用户管理',
          path: '/task',
          icon: 'icon-changjing',
          children: []
        },
        {
          id:'008',
          name:'接口调试',
          icon: 'icon-changjing',
          path: '/api',
          url: 'http://192.168.220.139/cies/swagger-ui.html',
          children: []
        }
      ],
    }
  },
  methods: {
    // 回到首页
    goHome(){
      
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      console.log(toDepth)
      console.log(fromDepth)
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style lang='less'>
.layout{
  height: 100%;
  .el-header, .el-footer {
    background-color: #FFF;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-header{
    height: 60px!important;
    padding: 0 0px!important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  .el-menu-item {
    &:hover{
      background: rgba(0, 108, 235, 0.05)!important;
    }
    &:focus{
      background: rgba(0, 108, 235, 0.05)!important;
    }
  }
  .logo{
    height: 60px;
  }
  .el-aside {
    height: 100%;
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    z-index: 1;
    .el-menu{
      height: 100%;
      border-right-width: 0;
    }
  }
  
  .el-main {
    height: 100%;
    width: 100%;
    // background-color: #E9EEF3;
    color: #333;
    text-align: center;
    padding: 0 0 20px 0;
    // .Router {
    //   position: absolute;
    //   width: 100%;
    //   transition: all .3s ease;
    //   // top: 40px;
    // }
  }
  
 .el-container {
    height: 100%;
    // margin-bottom: 40px;
  }
  .slide-left-enter,
  .slide-right-leave-active {
      opacity: 0;
      -webkit-transform: translate(100%, 0);
      transform: translate(100%, 0);
  }
  .slide-left-leave-active,
  .slide-right-enter {
      opacity: 0;
      -webkit-transform: translate(-100%, 0);
      transform: translate(-100% 0);
  }
}
</style>


