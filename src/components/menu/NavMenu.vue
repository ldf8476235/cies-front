<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-11-30 17:12:31
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2020-12-11 17:44:39
-->
<template>
  <fragment>
      <!--叶子级菜单-->
      <template v-if="!item.children">
        <el-menu-item :key="item.id" :index="item.path">
          <!-- <i class="iconfont" :class="item.icon" :style="item.style ? item.style : ''"></i> -->
          <svg-icon :data_iconName="item.icon" className="svg-class"/>
          <span>{{item.name}}</span>
        </el-menu-item>
      </template>
      <!--父级菜单-->
      <el-submenu v-else :index="item.path" style="">
        <template slot="title" style="">
          <svg-icon :data_iconName="item.icon" className="svg-class"/>
          <span>{{item.name}}</span>
        </template>
        <template v-for="child in item.children">
          <nav-menu v-if="child.children && child.children.length>0" :key="child.id" :item="child" />
          <el-menu-item v-else :key="child.id" :index="child.path">
            <svg-icon :data_iconName="item.icon" className="svg-class"/>
            <span>{{child.name}}</span>
          </el-menu-item>
        </template>
      </el-submenu>
  </fragment>
</template>

<script>
export default {
  name: 'NavMenu',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  mounted() {
    // console.log(this.item.children)
  }
}
</script>
<style lang="less" scoped>
span{
  font-size: 14px;
}
i{
  // margin-left: 0px;
  // margin-right: 5px;
}
.el-submenu{
 /deep/ .el-submenu__title{
    &:hover{
      background:rgba(0, 108, 235, 0.05) !important;
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

</style>
