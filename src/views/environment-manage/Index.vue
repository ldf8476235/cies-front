<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2021-01-13 09:34:00
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-01-25 10:20:07
-->
<template>
  <div class="environment">
    <Crumbs :crumbs='crumbs'></Crumbs>
    <div class="container">
      <div class="content">
        <Func :options='options' ref='func' @goNew='goNewEnvironment' :txt='text' @deleteBatch='deleteBatch'>
          <el-form slot='environment' :inline='true' label-position="top" :model="seachInfo" class="demo-form-inline">
            <el-form-item style='width:150px;' label="环境名称">
              <el-input  v-model="seachInfo.name" placeholder="输入任务名称"></el-input>
            </el-form-item>
            <el-form-item style='width:150px;' label="创建人">
              <el-input v-model="seachInfo.createUser" placeholder="输入创建人"></el-input>
            </el-form-item>
            <el-form-item style='width:150px;' label="指派人">
              <el-input v-model="seachInfo.assignUser" placeholder="输入指派人"></el-input>
            </el-form-item>
            <el-form-item style='width:150px;' label="所属项目">
              <el-select v-model="seachInfo.project" placeholder="选择所属项目">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style='width:150px;' label="软件版本">
              <el-select v-model="seachInfo.version" placeholder="选择软件版本">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style='width:150px;' label="任务状态">
              <el-select v-model="seachInfo.status" placeholder="选择任务状态">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style='display:block; width:150px;border-top:1px solid #e4e4e4' label="创建时间">
              <el-select v-model="seachInfo.createTime" placeholder="选择创建时间">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="display:block;text-align:right; margin: 0">
              <div>
                <el-popconfirm
                  title="确认清空搜索列表？"
                  style='padding-right:10px;'
                  @confirm='clearSeach'
                  icon="el-icon-info"

                  >
                  <el-button slot="reference" size="mini" type="text">清空列表</el-button>
                </el-popconfirm>
                <el-popconfirm
                  title="取消搜索列表？"
                  style='padding-right:10px;'
                  icon="el-icon-info"
                  @confirm='cancel'
                  >
                  <el-button slot="reference" size="mini" style='border: 1px solid #DCDFE6;'>取消</el-button>
                </el-popconfirm>
                <el-button type="primary" size="mini" @click="confirm">确定</el-button>
              </div>
            </el-form-item>
          </el-form>
        </Func>
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
      environmentList: [{}],
      seachInfo: { // 高级检索信息

      }
    };
  },
  methods: {
    // 清空条件
    clearSeach() {
      this.seachInfo = {}
    },
    // 取消搜索
    cancel() {
      this.$refs.func.visible = false
    },
    // 确认搜索
    confirm() {
      console.log(this.seachInfo)
      const arr = []
      for (const key in this.seachInfo) {
        const obj = {
          field: key,
          field_str: this.seachInfo[key]
        }
        arr.push(obj)
      }
      console.log(arr)
    },
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

      margin-top:10px;
    }
    .borderTop{
      border-top: 1px solid #EBEEF5;
    }
  }
}
</style>
