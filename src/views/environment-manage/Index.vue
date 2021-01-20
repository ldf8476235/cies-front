<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2021-01-13 09:34:00
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-01-13 17:24:04
-->
<template>
  <div class="environment">
    <Crumbs :crumbs='crumbs'></Crumbs>
    <div class="container">
      <div class="content">
        <Func :options='options' @goNew='goNewEnvironment' :txt='text' @deleteBatch='deleteBatch'></Func>
        <div class="tableContent">
          <el-table
            :data="environmentList"
            class='borderTop'
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center" width="55">
            </el-table-column>
            <el-table-column prop="caseName" label="设备名称" width="180">
            </el-table-column>
            <el-table-column prop="caseCreator" label="创建人" width="180">
            </el-table-column>
            <el-table-column prop="caseProject" label="所属项目" min-width="180">
            </el-table-column>
            <el-table-column prop="caseVersion" label="软件版本" width="140">
            </el-table-column>
            <el-table-column prop="" label="操作" width="60">
              <template slot-scope="scope">
                <el-popover
                  placement="bottom"
                  width="100"
                  trigger="click">
                  <p @click="edit(scope.row)">
                    <svg-icon data_iconName="icon-edit" className="icon-gesture"/>
                    <span>编辑</span>
                  </p>
                  <p @click="copy"><svg-icon data_iconName="icon-copy" className="icon-gesture"/><span>复制</span></p>
                  <p @click="del(scope.row)"><svg-icon data_iconName="icon-delete" className="icon-gesture"/><span>删除</span></p>
                  <!-- <el-button slot="reference"><i  class="el-icon-more"></i></el-button> -->
                  <div slot="reference">
                    <svg-icon data_iconName='icon-more'></svg-icon>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <PageUtil
          ref="pageutil"
          :total="total"
          :pageSize="pageSize"
          :currPage="currPage"
        ></PageUtil>

      </div>
    </div>
  </div>
</template>

<script>
import Func from '@/components/seach-func-header/Func.vue'
export default {
  name: 'Environment',
  components: {
    Func
  },
  data() {
    return {
      crumbs: { // 面包屑内容
        action: false,
        name: '环境管理'
      },
      text: '新建环境',
      total: 0,
      pageSize: 10,
      currPage: 1,
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        }
      ],
      environmentList: [{}]
    };
  },
  methods: {
    // 批量删除
    deleteBatch() {},
    // 新增环境
    goNewEnvironment() {
      this.$router.push('/environment/newenvironment')
    },
    // 选择列表
    handleSelectionChange() {},
    // 编辑
    edit() {},
    copy() {},
    del() {}
  }
};
</script>

<style lang='less' scoped>
.environment{
  .content {
    padding: 20px;
    box-sizing: border-box;
    .tableContent{
      margin-bottom: 10px;
    }
    .borderTop{
      border-top: 1px solid #EBEEF5;
    }
  }
}
</style>
