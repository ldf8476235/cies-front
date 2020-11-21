<template>
  <fragment>
      <!--叶子级菜单-->
      <template v-if="item.children && item.children.length === 0">
        <el-menu-item :key="item.id" :index="item.path">
          <i class="iconfont" :class="item.icon" :style="item.style ? item.style : ''"></i>
          <span>{{item.name}}</span>
        </el-menu-item>
      </template>
      <!--父级菜单-->
      <el-submenu v-else :index="item.path" style="">
        <template slot="title" style="">
          <i class="iconfont" :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <template v-for="child in item.children">
          <nav-menu v-if="child.children && child.children.length>0" :key="child.id" :item="child" />
          <el-menu-item v-else :key="child.id" :index="child.path">
            <i class="iconfont" :class="child.icon"></i>
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
i{
  // margin-left: 0px;
  margin-right: 5px;
}
.el-menu-item:focus, .el-menu-item:hover{
  background: rgb(26, 61, 73) !important;
}
.el-submenu{
 /deep/ .el-submenu__title{
    &:hover{
      background: rgb(26, 61, 73) !important;
    }

}
}

</style>
