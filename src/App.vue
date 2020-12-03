<!--
 * @Author: wh
 * @Date: 2020-11-30 17:12:31
 * @LastEditTime: 2020-12-02 18:15:57
 * @LastEditors: wh
 * @Description: In User Settings Edit
 * @FilePath: \cies-front\src\App.vue
-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}
.el-popover{
  min-width: 120px !important;
  padding: 5px !important;
  p{
    width: 120px;
    height: 36px;
    line-height: 36px;
    cursor: pointer;
    i{
      width: 20px;
      height: 20px;
      font-size: 14px;
      text-align: center;
      line-height: 20px;
      
    }
    span {
      font-size: 12px;
      padding: 0 7px;
      font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    }
  }
  .el-button {
    border: none;
  }
}
</style>
