<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-02 15:33:42
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2020-12-02 16:03:24
-->
<template>
  <div>
    <el-table :data="verifyList" border style="width: 100%">
      <el-table-column type="selection" align="center" width="55">
      </el-table-column>
      <el-table-column prop="date" label="任务名称" width="180">
      </el-table-column>
      <el-table-column prop="name" label="所属项目" min-width="180">
      </el-table-column>
      <el-table-column prop="name" label="创建人" width="180">
      </el-table-column>
      <el-table-column prop="name" label="软件版本" width="140">
      </el-table-column>
      <el-table-column prop="name" label="创建时间" width="140">
      </el-table-column>
      <el-table-column prop="name" label="状态" width="180">
      </el-table-column>
      <el-table-column prop="name" label="操作" width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'VerifyList',
  data() {
    return {
      verifyList: [{}] // 任务列表
    };
  },
  computed: {
  },
  watch: {
  },
  methods: {}
};
</script>

<style lang='less' scoped>

</style>
