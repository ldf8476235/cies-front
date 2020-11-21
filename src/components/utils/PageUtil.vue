<template>
  <div class="page">
    <el-select v-model="pageSize2" slot="prepend" size="small" placeholder="" style="width: 80px;margin-left:30px;float:left" @change="handleSizeChange()">
      <el-option label=10 value=10></el-option>
      <el-option label=20 value=20></el-option>
      <el-option label=30 value=30></el-option>
      <el-option label=50 value=50></el-option>
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
  data () {
    return {
      pageSize2:this.pageSize,
      currPage2:this.currPage,
      total2:this.total
    }
  },
  //
  props:['total','currPage','pageSize'],
  methods:{
    handleSizeChange() {
      this.$parent.pageSize = parseInt(this.pageSize2);
      this.$parent.currPage = 1;
      this.$parent.getList();
    },
    handleCurrChange(val) {
      this.$parent.currPage = val;
      this.$parent.getList();
    }
  },
  watch:{
    total(value){
      this.total2 = value
    },
  }
}
</script>
<style>
.el-pagination{
  float: right;
  margin-right: 20px;
  margin-top: 0px;
  background-color: white!important;
  padding-top:0px !important;
}
.el-pagination.is-background .el-pager li{
  background-color: white;
  border-radius: 2px;
  border: solid 1px rgba(0, 0, 0, 0.1);
}
</style>>