<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-02 15:32:52
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2020-12-02 16:40:23
-->
<template>
  <div>
    <el-table :data="actionList" border style="width: 100%">
      <el-table-column type="selection" align="center" width="55">
      </el-table-column>
      <el-table-column prop="name" label="类型" width="80">
      </el-table-column>
      <el-table-column prop="date" label="动作名称" width="180">
      </el-table-column>
      <el-table-column prop="name" label="引用" min-width="180">
      </el-table-column>
      <el-table-column prop="name" label="所属项目" width="180">
      </el-table-column>
      <el-table-column prop="name" label="创建人" width="180">
      </el-table-column>
      <el-table-column prop="name" label="软件版本" width="140">
      </el-table-column>
      <el-table-column prop="name" label="创建时间" width="140">
      </el-table-column>

      <el-table-column prop="name" label="操作" width="80">
        <el-popover
          placement="bottom"
          width="100"
          trigger="click">
          <p><i class="el-icon-plus"></i><span>编辑</span></p>
          <p><i class="el-icon-plus"></i><span>复制</span></p>
          <p><i class="el-icon-plus"></i><span>删除</span></p>
          <el-button slot="reference"><i  class="el-icon-more"></i></el-button>
        </el-popover>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ActionList',
  data() {
    return {
      actionList: [{}] // 任务列表
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
