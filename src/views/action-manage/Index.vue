<!--
 * @Author: wh
 * @Date: 2020-11-30 17:35:49
 * @LastEditTime: 2021-01-08 15:15:50
 * @LastEditors: wh
 * @Description: In User Settings Edit
 * @FilePath: \cies-front\src\views\action-mangage\Index.vue
-->
<template>
  <div class="action">
    <Crumbs :crumbs='crumbs'></Crumbs>
    <div class="container">
      <div class="content">
        <div class="funcTop">
          <div class="search">
            <el-select v-model="selectVal" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>

            <el-input v-model="inputKey" placeholder="请输入内容">
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button class="btnFilter">
              <svg-icon data_iconName='icon-filter'></svg-icon>
            </el-button>
          </div>
          <div class="newBtn">
            <el-button @click="delBatch" class="del-btn" icon="el-icon-delete">删除</el-button>
            <el-dropdown @command="goNewTask">
              <el-button type="primary">
                <i class="el-icon-plus"></i>
                <span>新建动作</span>
                <!-- <svg-icon data_iconName='icon-arrow-down'></svg-icon> -->
                <i class="el-icon-caret-bottom"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="0">屏幕操作</el-dropdown-item>
                <el-dropdown-item :command="1">语音输入</el-dropdown-item>
                <el-dropdown-item :command="2">命令脚本</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="tableContent">
          <el-table
            :data="actionList"
            class='borderTop'
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column type="selection" align="center" width="55">
            </el-table-column>
            <el-table-column label="类型" width="50">
              <template slot-scope="scope">
                <div >
                  <svg-icon v-if="scope.row.actionType === 0" data_iconName="icon-gesture" className="icon"/>
                  <svg-icon v-if="scope.row.actionType === 1" data_iconName="icon-voice" className="icon"/>
                  <svg-icon v-if="scope.row.actionType === 2" data_iconName="icon-code" className="icon"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="actionName" label="动作名称" width="180">
            </el-table-column>
            <el-table-column prop="name" label="引用" min-width="80">
              <template slot-scope="scope">
                <div >
                  {{scope.row.actionCite.length}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="actionProject" label="所属项目" width="180">
            </el-table-column>
            <el-table-column prop="actionCreator" label="创建人" width="180">
            </el-table-column>
            <el-table-column prop="actionVersion" label="软件版本" width="140">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="140">
            </el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="140">
            </el-table-column>

            <el-table-column prop="name" label="操作" width="60">
              <template slot-scope="scope">
                <el-popover
                  placement="bottom"
                  width="100"
                  trigger="click">
                  <p @click="edit(scope.row)"><svg-icon data_iconName="icon-edit" className="icon"/><span>编辑</span></p>
                  <p><svg-icon data_iconName="icon-copy" className="icon"/><span>复制</span></p>
                  <p @click="del(scope.row)"><svg-icon data_iconName="icon-delete" className="icon"/><span>删除</span></p>
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
          @handleSizeChange = "handleSizeChange"
          @handleCurrChange ='handleCurrChange'
        ></PageUtil>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Action',
  components: {
  },
  data() {
    return {
      crumbs: { // 面包屑内容
        action: false,
        name: '动作管理'
      },
      total: 0,
      pageSize: 10,
      currPage: 1,
      // 选择项内容
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
      selectVal: '', // 选中项
      inputKey: '', // 搜索输入项
      tabIndex: 1,
      actionList: [], // 动作列表
      selectData: [] // 选中的数据

    };
  },
  mounted() {
    this.getActionList(this.currPage, this.pageSize)
  },
  methods: {
    // 选择数据
    handleSelectionChange(val) {
      this.selectData = val;
    },
    // 编辑
    edit(row) {
      console.log(row)
      if (row.actionType === 0) {
        this.$router.push({
          name: 'NewScreen',
          query: {
            actionId: row.actionId
          },
          params: {
            data: row
          }
        })
      }
    },
    // 批量删除数据
    delBatch() {
      const url = 'action/batchDelete'
      if (this.selectData.length === 0) {
        this.$message({
          type: 'warning',
          message: '请先选择任何数据！'
        })
        return
      }
      const idList = this.selectData.map(item => {
        return item.actionId
      })
      this.$http.post(url, idList).then(res => {
        console.log(res)
        if (res.code === 1) {
          this.$message({
            type: 'success',
            message: '批量删除成功!'
          })
          this.getActionList(this.currPage, this.pageSize)
        }
      })
    },
    // 删除单个数据
    async del(row) {
      const url = 'action/delete/' + row.actionId
      const res = await this.$http.delete(url)
      if (res.code === 1) {
        this.$message({
          type: 'success',
          message: '删除成功！'
        })
        this.getActionList(this.currPage, this.pageSize)
      }
    },
    // 获取动作列表
    getActionList(page, size) {
      const url = `action/list?page=${page}&limit=${size}`
      this.$http.get(url).then(res => {
        console.log(res)
        if (res.code === 1) {
          this.actionList = res.data.list
          this.total = res.data.totalCount
        }
      })
    },
    // 新建任务
    goNewTask(i) {
      console.log(i)
      switch (i) {
        case 0:
          this.$router.push('/action/newscreen');
          break;
        case 1:
          this.$router.push('/action/newvoice');
          break;
        case 2:
          this.$router.push('/action/newscript');
          break;
        default:
          break;
      }

    },
    // tab切换
    tabCut(index) {
      console.log(index)
      this.tabIndex = index
    },
    // 当前页条数
    handleSizeChange(size) {
      console.log(typeof size)
      this.pageSize = size
      this.getActionList(this.currPage, size)
    },
    // 当前页数
    handleCurrChange(page) {
      this.currPage = page
      console.log(this.currPage)
      this.getActionList(page, this.pageSize)
    }
  }
};
</script>

<style lang='less' scoped>
// @import "../../assets/css/pub.less";
.action {
  .content {
    padding: 20px;
    box-sizing: border-box;
  }
  .funcTop {
    display: flex;
    justify-content: space-between;
    .search {
      display: flex;
      align-items: center;
      .el-select {
        width: 90px;
        height: 30px;
        .el-input {
          width: 100%;
          margin-left: 0px;
        }
      }
      .el-input {
        width: 180px;
        height: 30px;
        margin-left: 10px;
        i {
          cursor: pointer;
        }
      }
      .btnFilter{
        padding: 0;
        margin-left: 5px;
      }
    }
    .newBtn {
      .del-btn{
        margin-right: 10px;
      }
      .el-button {
        padding: 7px 8px;
        span{
          padding:0 3px;
        }
        i {
          font-weight: 600;
        }
      }
    }
  }
  .tableContent {
    margin-top: 10px;
    .borderTop{
      border-top: 1px solid #EBEEF5;
    }
  }
}
</style>
