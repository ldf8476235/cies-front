<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2021-01-22 17:53:18
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-01-22 17:57:08
-->
<template>
  <div>
    <el-dialog title="配置环境" :visible.sync="dialogTableVisible">
      <el-input v-model="keyword" placeholder='输入关键字'>
        <el-button slot="append" @click="seach" icon="el-icon-search"></el-button>
      </el-input>
      <slot name="executeDevice"></slot>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div>
      <PageUtil
        ref="pageutil"
        :total="total"
        :pageSize="pageSize"
        :currPage="currPage"
        @handleSizeChange='handleSizeChange'
        @handleCurrChange='handleCurrChange'
      ></PageUtil>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      keyword: '',
      dialogTableVisible: true
    };
  },
  methods: {
    // 执行机搜索关键字
    seach() {
    }
  }
};
</script>

<style lang='less' scoped>

</style>

