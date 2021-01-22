<!--
 * @Author: wh
 * @Date: 2020-11-18 09:50:18
 * @LastEditTime: 2021-01-21 14:17:37
 * @LastEditors: wh
 * @Description: In User Settings Edit
 * @FilePath: \ec_project\src\views\Layout.vue
-->
<template>
  <div class="layout">
    <el-container>
      <el-aside :width="collapse ? '66px' : '188px'">
        <div @click="goHome" class="logo">
          <img :src="logo" alt="" />
          <span v-if="!collapse">SYSTEM</span>
        </div>
        <el-menu
          background-color="#FFFFFF"
          text-color="#4A4A4A"
          active-text-color="#006CEB"
          :collapse="collapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
          class="menuHeight"
        >
          <nav-menu
            v-for="item in navData"
            :key="item.id"
            :item="item"
          ></nav-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header">
            <div class="fold" @click="foldBtn"><svg-icon data_iconName='icon-list' /></div>
            <div class="userInfo">
              <img :src="logo" alt="" />
              <el-dropdown @command="logout">
              <div>
                <span>Vincent</span>
                <i class="el-icon-caret-bottom"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="0">个人信息</el-dropdown-item>
                <el-dropdown-item :command="1">推出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            </div>
          </div>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavMenu from '@/components/menu/NavMenu.vue';
import logoImg from '@/assets/images/logo.png';
export default {
  name: 'Layout',
  components: {
    NavMenu
  },
  data() {
    return {
      transitionName: 'slide-right',
      collapse: false,
      activePath: '/',
      tabName: '设备管理',
      logo: logoImg,
      // 左侧导航栏菜单
      navData: [
        {
          id: '001',
          name: '任务管理',
          path: '/task',
          icon: 'icon-task-off'
          // children: [],
        },
        {
          id: '002',
          name: '用例管理',
          path: '/case',
          icon: 'icon-cese-off'
          // children: [],
        },
        {
          id: '003',
          name: '动作管理',
          path: '/action',
          icon: 'icon-action-off'
          // children: [],
        },
        {
          id: '009',
          name: '校验点管理',
          path: '/verify',
          icon: 'icon-checkoff'
          // children: [],
        },

        {
          id: '004',
          name: '设备管理',
          path: '/device',
          icon: 'icon-device-off'
          // children: [],
        },
        {
          id: '005',
          name: '脚本管理',
          path: '/script',
          icon: 'icon-script-on'
          // children: [],
        },
        {
          id: '010',
          name: '环境管理',
          path: '/environment',
          icon: 'icon-configure-off'
          // children: [],
        },
        {
          id: '006',
          name: '角色管理',
          path: '/role',
          icon: 'icon-role-off'
          // children: [],
        },
        {
          id: '007',
          name: '用户管理',
          path: '/user',
          icon: 'icon-user-off'
          // children: [],
        },
        {
          id: '008',
          name: '接口调试',
          icon: 'icon-changjing',
          path: '/api',
          url: 'http://192.168.220.120/cies/swagger-ui.html'
          // children: [],
        }
      ]
    };
  },
  mounted() {
    const path = window.location.href.split('/').pop().split('?')[0];
    this.activePath = '/' + path;
  },
  methods: {
    // 登出/个人信息
    logout() {

    },
    // 折叠菜单
    foldBtn() {
      this.collapse = !this.collapse
    },
    // 回到首页
    goHome() {},
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  watch: {
    // $route(to, from) {
    //   const toDepth = to.path.split('/').length
    //   const fromDepth = from.path.split('/').length
    //   console.log(toDepth)
    //   console.log(fromDepth)
    //   this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    // }
  }
};
</script>

<style lang='less' scoped>
.layout {
  height: 100%;
  .el-header {
    background-color: #fff;
    color: #333;
    padding: 0 0px !important;
    .header {
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;
      box-shadow: 0 1px 0px rgba(0, 0, 0, 0.2);
      .userInfo {
        display: flex;
        align-items: center;
        span {
          padding: 0 10px;
        }
      }
      .fold{
        cursor: pointer;
      }
    }
  }


  .el-aside {
    height: 100%;
    // background-color: #D3DCE6;
    color: #333;
    // text-align: center;
    // line-height: 200px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
    z-index: 1;
    .logo {
      width: 100%;
      height: 60px;
      // line-height: 60px;
      // text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        // width: 35px;
        // height: 35px;
        vertical-align: text-top;
      }
      span {
        font-size: 18px;
        font-weight: bold;
        color: #4a4a4a;
        padding-left: 5px;
        // font-family: '思源黑体 CN Bold Bold';
      }
    }
    .el-menu {
      height: 90%;
      border-right-width: 0;
    }
  }

  .el-main {
    height: 100%;
    color: #333;
    padding: 0px;
    box-sizing: border-box;
  }

  .el-container {
    height: 100%;
  }
}
</style>


