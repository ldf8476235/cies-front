<!--
 * @Author: wh
 * @Date: 2020-11-30 17:12:31
 * @LastEditTime: 2021-01-22 18:01:02
 * @LastEditors: wh
 * @Description: In User Settings Edit
 * @FilePath: \cies-front\src\views\task-manage\Index.vue
-->
<template>
  <div class="task">
    <div class="crumbs">
      <span>任务列表</span>
    </div>
    <div class="container">
      <div class="content">
        <Func ref='func' :options='options' @goNew='goNewTask' :txt='text'>
          <el-form slot='task' :inline='true' label-position="top" :model="seachInfo" class="demo-form-inline">
            <el-form-item style='width:150px;' label="任务名称">
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
          <el-table :data="taskList" class='borderTop'>
            <el-table-column type="selection" align="center" width="55">
            </el-table-column>
            <el-table-column prop="taskName" label="任务名称" width="180">
            </el-table-column>
            <el-table-column prop="taskProject" label="所属项目" min-width="180">
            </el-table-column>
            <el-table-column prop="taskAssign" label="创建人" width="180">
            </el-table-column>
            <el-table-column prop="taskVersion" label="软件版本" width="100">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="150">
            </el-table-column>
            <el-table-column prop="createTime" label="更新时间" width="150">
              2020-01-01 10:30:00
            </el-table-column>
            <el-table-column prop="taskStatus" label="状态" width="120">
              <template>
                <div v-if='false'>
                  <span v-if='true'>未执行</span>
                  <span v-else>已完成</span>
                </div>
                <div v-else>
                  <span v-if='false'>执行</span>
                  <span v-else>暂停</span>
                  <el-progress :text-inside="true"  :percentage="50" :format="format"></el-progress>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="taskStatus" label="" width="80">
              <template>
                <div v-if='true'  class='execute bg-color'>
                  <svg-icon v-if='true' data_iconName='icon-start' className='colorFFF'></svg-icon>
                  <svg-icon v-else data_iconName='icon-retry'></svg-icon>
                </div>
                <div v-else class='execute'>
                  <svg-icon v-if='true' data_iconName='icon-start'></svg-icon>
                  <svg-icon v-else data_iconName='icon-pause'></svg-icon>
                  <svg-icon data_iconName='icon-stop'></svg-icon>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="60">
              <template slot-scope="scope">
                <el-popover
                  placement="bottom"
                  width="100"
                  trigger="click">
                  <p @click="detail(scope.row)">
                    <svg-icon data_iconName="icon-configure" />
                    <span>详情</span>
                  </p>
                  <p @click="edit(scope.row)">
                    <svg-icon data_iconName="icon-edit" />
                    <span>编辑</span>
                  </p>
                  <p><svg-icon data_iconName="icon-copy" /><span>复制</span></p>
                  <p><svg-icon data_iconName="icon-log" /><span>日志</span></p>
                  <p><svg-icon data_iconName="icon-report" /><span>报告</span></p>
                  <p @click='del(scope.row.taskId)'><svg-icon data_iconName="icon-delete" /><span>删除</span></p>
                  <div slot="reference">
                    <svg-icon data_iconName='icon-more'></svg-icon>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- <el-dialog title="配置环境" :visible.sync="dialogTableVisible">
          <el-input v-model="keyword" placeholder='输入关键字'>
            <el-button slot="append" @click="seach" icon="el-icon-search"></el-button>
          </el-input>
          <el-table :data="executeDeviceList">
            <el-table-column  width="30">
              <template slot-scope="scope">
                <el-radio v-model="radio" :label="scope.$index">{{''}}</el-radio>
              </template>
            </el-table-column>
            <el-table-column property="date" label="序号" type="index" width="50"></el-table-column>
            <el-table-column property="date" label="执行机"></el-table-column>
          </el-table>
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
        </el-dialog> -->
        <Dialog>
          <el-table slot='executeDevice' :data="executeDeviceList">
            <el-table-column  width="30">
              <template slot-scope="scope">
                <el-radio v-model="radio" :label="scope.$index">{{''}}</el-radio>
              </template>
            </el-table-column>
            <el-table-column property="date" label="序号" type="index" width="50"></el-table-column>
            <el-table-column property="date" label="执行机"></el-table-column>
          </el-table>
        </Dialog>
        <PageUtil
          ref="pageutil"
          :total="total"
          :pageSize="pageSize"
          :currPage="currPage"
          @handleSizeChange='handleSizeChange'
          @handleCurrChange='handleCurrChange'
        ></PageUtil>
      </div>
    </div>
  </div>
</template>

<script>
import Dialog from '@/components/config-dialog/Dialog.vue';
import Func from '@/components/seach-func-header/Func.vue'
export default {
  name: 'Task',
  components: {
    Func,
    Dialog
  },
  data() {
    return {
      text: '新建任务',
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
      taskList: [{}], // 任务列表
      seachInfo: { // 高级搜索条件

      },
      dialogTableVisible: true,
      executeDeviceList: [{}, {}],
      radio: '', // 选择执行机
      keyword: ''
    };
  },
  mounted() {
    this.getTaskList(this.currPage, this.pageSize)
  },
  methods: {
    // 执行机搜索关键字
    seach() {


    },
    format(percentage) {
      return percentage === 100 ? '' : '';
    },
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
    // 获取所有任务
    getTaskList(page, size) {
      const url = `task/list/?page=${page}&limit=${size}`
      this.$http.get(url).then(res => {
        console.log(res)
        if (res.code === 1) {
          this.taskList = res.data.list
          this.total = res.data.totalCount
        }
      })
    },
    // 详情
    detail(row) {
      console.log(row)
      this.$router.push(
        {
          name: 'TaskDetails',
          query: {
            editId: row.taskId
          },
          params: {
            data: row
          }
        }
      )
    },
    // 编辑
    edit(row) {
      this.$router.push(
        {
          name: 'NewTask',
          query: {
            editId: row.taskId
          },
          params: {
            data: row
          }
        }
      )
    },
    // 单个删除任务
    del(id) {
      const url = `task/delete/${id}`
      this.$http.delete(url).then(res => {
        if (res.code === 1) {
          this.getTaskList(this.currPage, this.pageSize)
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        }
      })
    },
    // 新建任务
    goNewTask() {
      this.$router.push('/task/newtask');
    },
    // 当前页条数
    handleSizeChange(size) {
      this.pageSize = size
      this.getTaskList(this.currPage, size)
    },
    // 当前页面
    handleCurrChange(page) {
      this.currPage = page
      console.log(this.currPage)
      this.getTaskList(page, this.pageSize)
    }
  }
};
</script>

<style lang='less' scoped>
@import "../../assets/css/pub.less";
.task {
  .content {
    padding: 20px;
    box-sizing: border-box;
  }
  .funcTop {
    display: flex;
    justify-content: space-between;
    .search {
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
    }
    .newBtn {
      .el-button {
        // width: 100px;
        // height: 30px;
        // padding: 0;
        // font-size: 12px;
      }
    }
  }
  .tableContent {
    margin-top: 10px;
    .execute{
      width: 60px;
      height: 25px;
      border: 1px solid #E8E8E8;
      text-align: center;
      border-radius: 3px;
    }
    .bg-color{
      background: #409EFF;
    }
    .borderTop{
      border-top: 1px solid #EBEEF5;
    }
  }
}
</style>


