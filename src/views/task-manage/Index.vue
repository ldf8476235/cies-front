<!--
 * @Author: wh
 * @Date: 2020-11-30 17:12:31
 * @LastEditTime: 2021-02-02 14:50:36
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
        <Func ref='func' :options='options' @goNew='goNewTask' @deleteBatch='deleteBatch' :txt='text'>
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
          <el-table
            :data="taskList"
            class='borderTop'
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              align="center"
              width="55"
              >
            </el-table-column>
            <el-table-column prop="name" label="任务名称" width="180">
            </el-table-column>
            <el-table-column prop="project" label="所属项目" min-width="180">
            </el-table-column>
            <el-table-column prop="builder" label="创建人" width="180">
            </el-table-column>
            <el-table-column prop="version" label="软件版本" width="100">
            </el-table-column>
            <el-table-column prop="time_create" label="创建时间" width="150">
            </el-table-column>
            <el-table-column prop="time_modify" label="更新时间" width="150">
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
              <template slot-scope='scope'>
                <div v-if='true'  class='execute bg-color'>
                  <svg-icon v-if='!scope.row.executeFlag' data_iconName='icon-start' className='colorFFF' @click.native='execute(scope.row)'></svg-icon>
                  <svg-icon v-else data_iconName='icon-retry' className='colorFFF' @click.native='reExecute(scope.row)'></svg-icon>
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
                  <p @click='del(scope.row.uid)'><svg-icon data_iconName="icon-delete" /><span>删除</span></p>
                  <div slot="reference">
                    <svg-icon data_iconName='icon-more'></svg-icon>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <Dialog :title='title'>
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
import { GET, DELETE } from '@/utils/api.js';
import { delHint } from '@/utils/utils.js';
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
      title: '配置环境',
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
      taskList: [], // 任务列表
      seachInfo: { // 高级搜索条件

      },
      dialogTableVisible: true,
      executeDeviceList: [],
      radio: '', // 选择执行机
      keyword: '',
      selectData: [ // 选中数据

      ]
    };
  },
  mounted() {
    this.getTaskList(this.currPage, this.pageSize)
  },
  methods: {
    // 选择数据
    handleSelectionChange(val) {
      console.log(val)
      this.selectData = val;
    },
    // 执行
    execute(row) {
      const url = `task/run_task/?uid=${row.uid}`
      GET(url).then(res => {
        this.$set(row, 'executeFlag', true)
        this.$hintMsg('success', res)
      }).catch(err => {
        this.$hintMsg('error', err)
      })
    },
    // 重新执行
    reExecute() {

    },
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
      const url = `task/list/?page=${page}&count=${size}`
      GET(url).then(res => {
        console.log(res)
        this.taskList = res.result
        this.total = res.count
      })
    },
    // 详情
    detail(row) {
      console.log(row)
      this.$router.push(
        {
          name: 'TaskDetails',
          query: {
            uid: row.uid
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
            uid: row.uid
          },
          params: {
            data: row
          }
        }
      )
    },
    // 批量删除数据
    deleteBatch() {
      const url = 'task/del'
      if (this.selectData.length === 0) {
        this.$hintMsg('warning', '请先选择任何数据！')
        return
      }
      const idList = this.selectData.map(item => {
        return item.uid
      })
      const data = {
        uid: idList
      }
      delHint(this).then(res => {
        DELETE(url, data).then(respone => {
          console.log(respone)
          // if (respone.status_code === 200) {
          this.$hintMsg('success', '批量删除成功')
          this.getActionList(this.currPage, this.pageSize)
          // }
        })
      }).catch(err => {
        this.$hintMsg('info', err)
      })

    },
    // 单个删除任务
    del(id) {
      const url = `task/del/`
      const data = {
        uid: [id]
      }
      delHint(this).then(res => {
        DELETE(url, data).then(respone => {
          this.$hintMsg('success', respone)
          this.getTaskList(this.currPage, this.pageSize)
        }).catch(err => {
          this.$hintMsg('error', err)
        })
      }).catch(err => {
        this.$hintMsg('info', err)
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


