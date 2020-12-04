<!--
 * @Author: wh
 * @Date: 2020-11-18 09:50:18
 * @LastEditTime: 2020-12-03 13:35:38
 * @LastEditors: wh
 * @Description: In User Settings Edit
 * @FilePath: \ec_project\src\views\Layout.vue
-->
<template>
  <div class="layout">
    <el-container>
      <el-aside width="188px">
        <div @click="goHome" class="logo">
          <img :src="logo" alt="" />
          <span>SYSTEM</span>
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
            <div><i class="iconfont icon-changjing"></i></div>
            <div class="userInfo">
              <img :src="logo" alt="" />
              <span>Vincent</span>
            </div>
          </div>
        </el-header>
        <el-main>
          <!-- <transition :name="transitionName"> -->
            　<router-view></router-view>
          <!-- </transition> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavMenu from "@/components/menu/NavMenu.vue";
import logoImg from "@/assets/images/logo.png";
export default {
  name: "Layout",
  components: {
    NavMenu,
  },
  data() {
    return {
      transitionName: "slide-right",
      collapse: false,
      activePath: "/",
      tabName: "设备管理",
      logo: logoImg,
      // 左侧导航栏菜单
      navData: [
        {
          id: "001",
          name: "任务管理",
          path: "/task",
          icon: "icon-changjing",
          children: [],
        },
        {
          id: "002",
          name: "用例管理",
          path: "/case",
          icon: "icon-changjing",
          children: [],
        },
        {
          id: "003",
          name: "动作管理",
          path: "/action",
          icon: "icon-changjing",
          children: [],
        },
        {
          id: "009",
          name: "校验点管理",
          path: "/verify",
          icon: "icon-changjing",
          children: [],
        },
        {
          id: "004",
          name: "设备管理",
          path: "/device",
          icon: "icon-changjing",
          children: [],
        },
        {
          id: "005",
          name: "脚本管理",
          path: "/script",
          icon: "icon-changjing",
          children: [],
        },
        {
          id: "006",
          name: "角色管理",
          path: "/role",
          icon: "icon-changjing",
          children: [],
        },
        {
          id: "007",
          name: "用户管理",
          path: "/user",
          icon: "icon-changjing",
          children: [],
        },
        {
          id: "008",
          name: "接口调试",
          icon: "icon-changjing",
          path: "/api",
          url: "http://192.168.220.139/cies/swagger-ui.html",
          children: [],
        },
      ],
    };
  },
  mounted() {
    const path = window.location.href.split("/").pop().split("?")[0];
    this.activePath = "/" + path;
  },
  methods: {
    // 回到首页
    goHome() {},
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  watch: {
    // $route(to, from) {
    //   const toDepth = to.path.split('/').length
    //   const fromDepth = from.path.split('/').length
    //   console.log(toDepth)
    //   console.log(fromDepth)
    //   this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    // }
  },
};
</script>

<style lang='less'>
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
    }
  }
  .el-menu-item {
    &:hover {
      background: rgba(0, 108, 235, 0.05) !important;
    }
    &:focus {
      background: rgba(0, 108, 235, 0.05) !important;
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


