<!--
 * @Description:
 * @Version: 1.0
 * @Autor: wh
 * @Date: 2020-11-30 17:12:31
 * @LastEditors: wh
 * @LastEditTime: 2021-02-22 17:20:26
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
  mounted() {
    const attrs = this.$attrs
    if (JSON.stringify(attrs) !== '{}') {
      this.pageSize2 = attrs.pageSize2
      this.currPage2 = attrs.currPage2
      this.total2 = attrs.total2
    }
  },
  methods: {
    handleSizeChange() {
      this.$emit('handleSizeChange', this.pageSize2)
    },
    handleCurrChange(val) {
      this.$emit('handleCurrChange', val)
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
