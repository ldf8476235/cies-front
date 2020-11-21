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
              <router-view />
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
        // {
        //   id: '009',
        //   name: '语料管理',
        //   path: 'scene',
        //   icon: 'icon-changjing',
        //   children: [
        //     {
        //       path: '/scenemanage',
        //       name: '场景任务管理'
        //     },
        //     {
        //       path: '/newtask',
        //       name: '场景任务测试'
        //     }
        //   ]
        // },
        // {
        //   id: '008',
        //   name: '任务管理',
        //   path: 'custom',
        //   icon: 'icon-zidingyirenwu',
        //   children: [
        //     {
        //       path: 'rousetask',
        //       name: '测试任务',
        //       children: [
        //         {
        //           path: '/rousetask',
        //           name: '单设备'
        //         },
        //         {
        //           path: '/manywakeuptask',
        //           name: '双设备'
        //         }
        //       ]
        //     },
        //     {
        //       path: '/errrousetask',
        //       name: '误唤醒任务'
        //     },
        //     {
        //       path: '/discerntask',
        //       name: '识别任务'
        //     },
        //     {
        //       path: 'link',
        //       name: '链路任务',

        //       children: [
        //         {
        //           path: '/linkway',
        //           name: '语音交互'
        //         },
        //         {
        //           path: '/touchinter',
        //           name: '触控交互'
        //         }
        //       ]
        //     }
        //   ]
        // }
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
      console.log(to,from)
      switch(to.name) {
        case "Device":
          this.tabName = "设备管理"
          break;
        case "AddDevice":
          this.tabName = "添加设备"
          break;
        default:
          break;
      }
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
    // background-color: #E9EEF3;
    color: #333;
    text-align: center;
    padding: 0 0 20px 0;
  }
  
 .el-container {
    height: 100%;
    // margin-bottom: 40px;
  }

}
</style>


