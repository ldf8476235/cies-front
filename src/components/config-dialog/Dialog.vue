<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2021-01-22 17:53:18
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-02-22 18:22:22
-->
<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogTableVisible">
      <el-input v-model="keyword" placeholder='输入关键字'>
        <el-button slot="append" @click="seach" icon="el-icon-search"></el-button>
      </el-input>
      <slot name="executeDevice"></slot>
      <slot name="environment"></slot>
      <slot name='caseAction'></slot>
      <slot name='caseVerify'></slot>
      <slot name='voice'></slot>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
      <PageUtil
        ref="pageutil"
        v-bind="$attrs"
        v-on="$listeners"
      ></PageUtil>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    title: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      keyword: '',
      dialogTableVisible: false
    };
  },
  methods: {
    // 执行机搜索关键字
    seach() {
    },
    // 确认
    confirm() {
      console.log('aaa')
      this.dialogTableVisible = false
      this.$emit('confirm', this.dialogTableVisible)
    }
  }
};
</script>

<style lang='less' scoped>

</style>

