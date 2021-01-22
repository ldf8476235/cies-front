<!--
 * @Description:
 * @Version: 1.0
 * @Autor: wh
 * @Date: 2020-11-30 17:12:31
 * @LastEditors: wh
 * @LastEditTime: 2021-01-19 16:33:14
-->
<template>
  <div class="page">
    <el-select v-model="pageSize2" slot="prepend" placeholder="" style="width: 80px;" @change="handleSizeChange">
      <el-option label=10 :value=10></el-option>
      <el-option label=20 :value=20></el-option>
      <el-option label=30 :value=30></el-option>
      <el-option label=50 :value=50></el-option>
    </el-select>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total2"
      :pager-count=5
      :page-size="pageSize2"
      @current-change="handleCurrChange">
    </el-pagination>
  </div>
</template>

<script >
export default {
  name: 'PageUtil',
  props: ['total', 'currPage', 'pageSize'],
  data() {
    return {
      pageSize2: this.pageSize,
      currPage2: this.currPage,
      total2: this.total
    }
  },
  methods: {
    handleSizeChange() {
      // this.$parent.pageSize = parseInt(this.pageSize2);
      // this.$parent.currPage = 1;
      this.$emit('handleSizeChange', this.pageSize2)
      // this.$parent.getList();
    },
    handleCurrChange(val) {
      // this.$parent.currPage = val;
      this.$emit('handleCurrChange', val)
      // this.$parent.getList();
    }
  },
  watch: {
    total(value) {
      this.total2 = value
    }
  }
}
</script>
<style lang='less' scoped>
.page {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.el-pagination{
  /* float: right; */
  /* margin-right: 20px;
  margin-top: 0px; */

  background-color: white!important;
  padding-top:0px !important;
}
.el-pagination.is-background .el-pager li{
  background-color: white;
  border-radius: 2px;
  border: solid 1px rgba(0, 0, 0, 0.1);
}
</style>>
