<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-01 13:49:42
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-01-25 16:10:26
-->
<template>
  <div class="newTask">
    <Crumbs :crumbs='crumbs' @save='save'></Crumbs>
    <div class="container">
      <div class="content">
        <div class="title">任务信息</div>
        <div class="formData">
          <el-form
            ref="taskInfo"
            :model="taskInfo"
            :rules="rulesTaskInfo"
            label-width="100px"
            >
            <div class="taskInfo">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="任务名称：" prop="taskName">
                    <el-input
                      :suffix-icon="loading ? 'el-icon-loading' : ''"
                      v-model.trim="taskInfo.taskName"
                      placeholder="输入任务名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="软件版本：" prop="taskVersion">
                    <el-input
                      v-model="taskInfo.taskVersion"
                      placeholder="输入软件版本"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所属项目：" prop="taskProject">
                    <el-select v-model="taskInfo.taskProject" placeholder="选择所属项目">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="指派人：" prop="taskAssign">
                    <el-select v-model="taskInfo.taskAssign" placeholder="选择指派人">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="任务描述：">
                    <el-input
                      type="textarea"
                      v-model="taskInfo.taskDesc"
                      placeholder="输入任务描述"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="taskCase">
              <el-row class="text-title">
                <p>
                  已选择 <span> 1 </span>个节点<span> 2 </span>用例
                  <span class="del-color">删除</span>
                </p>
              </el-row>
              <el-table
                width="100%"
                class="borderStyle"
                ref="refTable"
                :data="taskInfo.taskCase"
                row-key="id"
                >
                <el-table-column
                  width="100">
                  <template slot-scope="scope">
                    <div class="func">
                      <el-checkbox @change="selectRow(scope.row)"></el-checkbox>
                      <div  class="drag">
                        <svg-icon data_iconName = 'icon-grab'></svg-icon>
                      </div>
                      <div v-if='scope.row.id' @click="expand(scope.row,scope.$index)">
                        <svg-icon v-if="iconFlag || iconIndex !== scope.$index" data_iconName = 'icon-start'></svg-icon>
                        <svg-icon v-else data_iconName = 'icon-arrow-down'></svg-icon>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column type="expand" width="1">
                  <template slot-scope="scope">
                    <div class="demo-table-expand">
                      <el-table
                        :data='scope.row.childrens'
                        :show-header='false'
                        row-key="id"
                        >
                        <el-table-column
                          width="100">
                          <template slot-scope="scope">
                            <div class="func">
                              <el-checkbox @change="selectRow(scope.row)"></el-checkbox>
                              <div draggable="true" @dragstart="dragClick(scope.row)" class="childDrag">
                                <svg-icon data_iconName = 'icon-grab'></svg-icon>
                              </div>
                              <div>
                                <svg-icon data_iconName = 'icon-subset'></svg-icon>
                              </div>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column label="用例组" prop="caseGroup">
                        </el-table-column>
                        <el-table-column label="用例组" prop="loopTimes">

                        </el-table-column>
                        <el-table-column label="用例组" prop="error">

                        </el-table-column>
                        <el-table-column label="用例组" prop="caseGroup">

                        </el-table-column>
                        <el-table-column label="用例组" prop="loopTimes">

                        </el-table-column>
                        <el-table-column label="操作" align="center" width="80">
                          <template slot-scope="scope">
                            <el-popover
                              placement="bottom"
                              width="100"
                              trigger="click">
                              <p>
                                <svg-icon data_iconName="icon-plus" className="icon-gesture"/>
                                <span>插入用例</span>
                              </p>
                              <p><svg-icon data_iconName="icon-replace" className="icon-gesture"/><span>替换用例</span></p>
                              <!-- <p><svg-icon data_iconName="icon-configure" className="icon-gesture"/><span>配置环境</span></p> -->
                              <p @click="upMove(scope.$index,scope.row)"><svg-icon data_iconName="icon-top" className="icon-gesture"/><span>移动到顶部</span></p>
                              <p @click="downMove(scope.$index,scope.row)"><svg-icon data_iconName="icon-bottom" className="icon-gesture"/><span>移动到底部</span></p>
                              <p><svg-icon data_iconName="icon-delete" className="icon-gesture"/><span>删除</span></p>
                              <el-button slot="reference"><i  class="el-icon-more"></i></el-button>
                            </el-popover>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="用例组">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'taskCase.' + scope.$index + '.caseGroup'"
                      :rules="rulesTaskInfo.taskCase.caseGroup"
                      label-width="0px"
                      >
                      <span v-if="scope.row.editCaseGroup">
                        <el-input
                          ref="inputBlur"
                          v-model="scope.row.caseGroup"
                          placeholder=""
                          @blur="inputBlur(scope.row,scope.column)"
                        ></el-input>
                      </span>
                      <span v-else @click="tabDblClick(scope.row,scope.column)" > {{scope.row.caseGroup}} </span>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="用例">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'taskCase.' + scope.$index + '.case'"
                      :rules="rulesTaskInfo.taskCase.case"
                      label-width="0px"
                    >
                      <span v-if="scope.row.editCase">
                        <el-input
                          ref="inputBlur"
                          v-model="scope.row.case"
                          placeholder=""
                          @blur="inputBlur(scope.row,scope.column)"
                        ></el-input>
                      </span>
                      <span v-else @click="tabDblClick(scope.row,scope.column)" > {{scope.row.case}} </span>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="循环次数">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'taskCase.' + scope.$index + '.loopTimes'"
                      :rules="rulesTaskInfo.taskCase.loopTimes"
                      label-width="0px"
                    >
                      <span v-if="scope.row.editLoop">
                        <el-input
                          ref="inputBlur"
                          v-model="scope.row.loopTimes"
                          placeholder=""
                          @blur="inputBlur(scope.row,scope.column)"
                        ></el-input>
                      </span>
                      <span v-else @click="tabDblClick(scope.row,scope.column)" > {{scope.row.loopTimes}} </span>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="出错处理">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'taskCase.' + scope.$index + '.error'"
                      :rules="rulesTaskInfo.taskCase.error"
                      label-width="0px"
                    >
                      <span v-if="true">
                        <el-select v-model="selectVal" placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                          </el-option>
                        </el-select>
                      </span>
                      <!-- <span v-else> {{scope.row.error}} </span> -->
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="执行后等待">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'taskCase.' + scope.$index + '.executeWait'"
                      :rules="rulesTaskInfo.taskCase.executeWait"
                      label-width="0px"
                    >
                      <el-select v-model="selectVal" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          >
                        </el-option>
                      </el-select>
                      <!-- <span> {{scope.row.executeWait}} </span> -->
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="80">
                  <template slot-scope="scope">
                    <el-popover
                      placement="bottom"
                      width="100"
                      trigger="click">
                      <p @click="addCaseGroup(scope.$index)">
                        <svg-icon data_iconName="icon-plus" className="icon-gesture"/>
                        <span>添加用例组</span>
                      </p>
                      <p @click="addCase(scope.$index)">
                        <svg-icon data_iconName="icon-plus" className="icon-gesture"/>
                        <span>添加用例</span>
                      </p>
                      <p><svg-icon data_iconName="icon-replace" className="icon-gesture"/><span>添加子用例</span></p>
                      <p @click="config(scope.row)"><svg-icon data_iconName="icon-configure" className="icon-gesture"/><span>配置环境</span></p>
                      <p @click="upMove(scope.$index,scope.row)"><svg-icon data_iconName="icon-top" className="icon-gesture"/><span>移动到顶部</span></p>
                      <p @click="downMove(scope.$index,scope.row)"><svg-icon data_iconName="icon-bottom" className="icon-gesture"/><span>移动到底部</span></p>
                      <p @click="delCaseGroup(scope.$index)"><svg-icon data_iconName="icon-delete" className="icon-gesture"/><span>删除</span></p>
                      <el-button slot="reference"><i class="el-icon-more"></i></el-button>
                    </el-popover>
                  </template>
                </el-table-column>
              </el-table>
              <el-row class="add-node">
                <el-col>
                  <el-button type="" @click="addCaseGroup">
                    <i class="el-icon-plus"></i> 添加用例组
                  </el-button>
                  <el-button type="" @click="addCase">
                    <i class="el-icon-plus"></i> 添加用例
                  </el-button>
                </el-col>
              </el-row>
            </div>
          </el-form>
          <el-dialog title="配置环境" :visible.sync="dialogTableVisible">
            <el-input v-model="keyword" placeholder='输入关键字'>
              <el-button slot="append" @click="seach" icon="el-icon-search"></el-button>
            </el-input>
            <el-table :data="environmentList">
              <el-table-column  width="30">
                <template slot-scope="scope">
                  <el-radio v-model="radio" :label="scope.$index">{{''}}</el-radio>
                </template>
              </el-table-column>
              <el-table-column property="date" label="序号" type="index" width="50"></el-table-column>
              <el-table-column property="date" label="动作名称" width="200"></el-table-column>
              <el-table-column property="name" label="创建人" width="100"></el-table-column>
              <el-table-column property="address" label="创建时间"></el-table-column>
              <el-table-column property="address" label="软件版本"></el-table-column>
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
          </el-dialog>
          <Dialog :title='title'>
            <el-table slot='environment' :data="environmentList">
              <el-table-column  width="30">
                <template slot-scope="scope">
                  <el-radio v-model="radio" :label="scope.$index">{{''}}</el-radio>
                </template>
              </el-table-column>
              <el-table-column property="date" label="序号" type="index" width="50"></el-table-column>
              <el-table-column property="date" label="动作名称" width="200"></el-table-column>
              <el-table-column property="name" label="创建人" width="100"></el-table-column>
              <el-table-column property="address" label="创建时间"></el-table-column>
              <el-table-column property="address" label="软件版本"></el-table-column>
            </el-table>
          </Dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dialog from '@/components/config-dialog/Dialog.vue';
import Sortable from 'sortablejs';
export default {
  name: 'NewTask',
  components: {
    Dialog
  },
  data() {
    return {
      crumbs: {
        action: true,
        name: '新建任务'
      },
      title: '新建任务',
      total: 0,
      pageSize: 10,
      currPage: 1,
      loading: false, // 任务名称动态验证动画
      options: [
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        }
      ],
      selectVal: '', // 选中项
      tabClickIndex: '',
      taskInfo: {
        'taskAssign': '',
        'taskDesc': '',
        'taskId': 0,
        'taskName': '',
        'taskProject': '',
        'taskVersion': '',
        taskCase: [
          {
            id: '1',
            editCaseGroup: false,
            editLoop: false,
            caseGroup: '节点名称1',
            loopTimes: 11,
            error: '123',
            overtime: 'asdasd',
            executeWait: 'aq2134',
            childrens: [
              {
                id: '101',
                editCaseGroup: false,
                editLoop: false,
                caseGroup: '',
                loopTimes: 11,
                error: '123',
                overtime: 'asdasd',
                executeWait: 'aq2134'
              },
              {
                id: '102',
                editCaseGroup: false,
                editLoop: false,
                caseGroup: '',
                loopTimes: 12,
                error: '1qwe',
                overtime: 'asdasd',
                executeWait: 'aq2134'
              }
            ]
          }
        ]
      },
      rulesTaskInfo: {
        taskName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
        taskAssign: [
          { required: true, message: '请选择指派人', trigger: 'blur' }
        ],
        taskProject: [
          { required: true, message: '请选择所属项目', trigger: 'blur' }
        ],
        taskVersion: [
          { required: true, message: '请输入软件版本', trigger: 'blur' }
        ],
        taskDesc: [
          { required: true, message: '请输入任务描述', trigger: 'blur' }
        ],
        taskCase: {}
      },
      iconFlag: true, // 折叠图标标识
      iconIndex: null,
      dialogTableVisible: false,
      environmentList: [{}, {}],
      radio: '1',
      keyword: '' // 环境配置搜索关键字

    }
  },
  mounted() {
    this.drag()
    const queryId = this.$route.query.editId
    if (queryId) {
      this.edit()
    }
  },
  methods: {
    // 获取环境列表
    getEnvironmentList() {},
    seach() {
      console.log(this.keyword)
    },
    // 配置环境
    config(row) {
      console.log(row)
      this.getEnvironmentList()
      this.dialogTableVisible = true
    },
    // 编辑
    edit() {
      const data = this.$route.params.data
      if (data) {
        localStorage.setItem('editData', JSON.stringify(data))
      }
      this.taskInfo = data || JSON.parse(localStorage.getItem('editData'))
    },
    // 删除用例组
    delCaseGroup(index) {
      this.taskInfo.taskCase.splice(index, 1)
    },
    // 添加用例
    addCase(index) {
      console.log(index)
      if (typeof index === 'number') {
        this.taskInfo.taskCase[index].childrens.push(
          {
            case: '子用例',
            loopTimes: '用例'
          }
        )
      } else {
        this.taskInfo.taskCase.push({
          case: '用例',
          loopTimes: '用例'
        })
      }

    },
    // 添加用例组
    addCaseGroup(index) {
      console.log(index)
      const data = {
        editCaseGroup: true,
        editCase: true,
        editLoop: true,
        id: Math.random() + new Date().getTime()
      }
      if (typeof index === 'number') {
        this.taskInfo.taskCase.splice(index + 1, 0, data)
      } else {
        this.taskInfo.taskCase.push(data)
      }
    },
    // 拖动事件
    dragClick(row) {
      console.log('aaaa', row)
    },
    // 子元素拖动
    childDrag() {
      this.$nextTick(() => {
        // 表格拖拽事件的添加
        const el = document.querySelectorAll('.demo-table-expand .el-table__body-wrapper tbody')[0]
        if (!el) return
        // const self = this;
        Sortable.create(el, {
          handle: '.childDrag',
          fallbackOnBody: true,
          // 开始拖拽的时候
          onStart: function(evt) {
            console.log(evt)
          },
          // 拖拽结束后的操作
          onEnd({ newIndex, oldIndex }) {
            console.log(newIndex, oldIndex)
            if (newIndex === oldIndex) return
          }
        })
      })
    },
    // 父元素拖动
    drag() {
      this.$nextTick(() => {
        // 表格拖拽事件的添加
        const el = document.querySelectorAll('.el-table__body-wrapper tbody')[0]
        const self = this;
        Sortable.create(el, {
          handle: '.drag',
          fallbackOnBody: true,
          // 开始拖拽的时候
          onStart: function(evt) {
            console.log('evt:')
            self.taskInfo.taskCase.forEach((item) => {
              self.$refs.refTable.toggleRowExpansion(item, false)
            })
            self.iconFlag = true
          },
          // 拖拽结束后的操作
          onEnd({ newIndex, oldIndex }) {
            if (newIndex === oldIndex) return
            console.log(newIndex, oldIndex)
            // 修改data中的数组，
            const targetRow = self.taskInfo.taskCase.splice(oldIndex, 1)[0]
            self.taskInfo.taskCase.splice(newIndex, 0, targetRow)
            console.log(self.taskInfo.taskCase)
          }
        })
      })
    },
    // 展开
    expand(row, index) {
      console.log(row, index)
      this.iconFlag = !this.iconFlag
      this.iconIndex = index
      this.$refs.refTable.toggleRowExpansion(row)
      this.childDrag()
    },
    selectRow(row) {
      console.log(row)
    },
    // 移动到顶部
    upMove(index, row) {
      console.log(index, row)
      if (index == 0) {
        this.$message({
          message: '处于最顶端，不能继续上移',
          type: 'warning'
        });
      } else {
        const upDate = this.taskInfo.taskCase[index];
        this.taskInfo.taskCase.unshift(upDate)
        this.taskInfo.taskCase.splice(index + 1, 1);
      }
    },
    // 移动至底部
    downMove(index) {
      const len = this.taskInfo.taskCase.length - 1
      if (index === len) {
        this.$message({
          message: '处于最低部，不能继续下移',
          type: 'warning'
        });
      } else {
        console.log(index)
        const upDate = this.taskInfo.taskCase[index];
        this.taskInfo.taskCase.splice(index, 1);
        this.taskInfo.taskCase.push(upDate)
      }
    },
    // 添加节点
    addNodeRow() {},
    // 单击
    tabClick(row, column) {
      switch (column.label) {
        case '用例组':
          console.log('单击节点')
          row.editCaseGroup = false;
          break
        case '用例':
          console.log('单击节点')
          row.editCase = false;
          break
        case '循环次数':
          console.log('单击循环')
          row.editLoop = false;
          break
        default:
          return
      }
    },

    /**
     * 双击文字变成输入框
     */
    tabDblClick(row, column) {
      console.log(row, column)
      switch (column.label) {
        case '用例组':
          row.editCaseGroup = true;
          this.$nextTick(() => {
            this.$refs.inputBlur.focus()
          })
          break
        case '用例':
          row.editCase = true;
          this.$nextTick(() => {
            this.$refs.inputBlur.focus()
          })
          break
        case '循环次数':
          row.editLoop = true;
          this.$nextTick(() => {
            this.$refs.inputBlur.focus()
          })
          break
        default:
          return
      }

    },
    /**
     * 失去焦点初始化
     */
    inputBlur(row, column) {
      console.log('失去焦点')
      switch (column.label) {
        case '用例组':
          if (row.caseGroup) { row.editCaseGroup = false; }
          break
        case '用例':
          if (row.case) { row.editCase = false; }
          break
        case '循环次数':
          row.editLoop = false;
          break
        default:
          return
      }
    },
    save() {
      const data = {
        // 'taskAssign': 'string',
        // 'taskCase': [
        //   {}
        // ],
        // 'taskDesc': 'string',
        // 'taskId': 0,
        // 'taskName': 'string',
        // 'taskProject': 'string',
        // 'taskVersion': 'string'
      }
      this.$refs.taskInfo.validate((valid) => {
        console.log(this.taskInfo)
        if (valid) {
          let url = ''
          const queryId = this.$route.query.editId
          if (queryId) {
            url = 'task/update'
          } else {
            url = 'task/add'
          }
          this.$http.post(url, this.taskInfo).then(res => {
            console.log(res)
            if (res.code === 1) {
              this.$message({
                type: 'success',
                message: '添加任务成功！'
              })
              this.$router.push('/task')
            }
          })
        }

      })

    },
    // 当前页条数
    handleSizeChange(size) {
      this.pageSize = size
      this.getEnvironmentList(this.currPage, size)
    },
    // 当前页面
    handleCurrChange(page) {
      this.currPage = page
      this.getEnvironmentList(page, this.pageSize)
    }
  }
};
</script>

<style lang='less' scoped>
// @import '../../../assets/css/pub.less';
.newTask {
  .crumbs {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    box-shadow: 0 1px 0px rgba(0, 0, 0, 0.2);
    .el-button {
      width: 100px;
      height: 30px;
      font-size: 12px;
    }
  }
  .title {
    height: 41px;
    line-height: 41px;
    font-size: 12px;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
  }
  .formData {
    padding: 20px 0px;
    .taskInfo {
      .el-input {
        width: 50%;
      }
      .el-select {
        width: 50%;
      }
      .el-textarea {
        width: 50%;
      }
    }
    .taskCase {
      padding: 0 20px;
      .text-title {
        .del-color{
          color: #006CEB;
        }
      }
      .borderStyle{
        border-top: 1px solid #EBEEF5;
      }
      .el-table {
        .func {
          display: flex;
          align-content: center;
        }
        .drag{
          cursor: pointer;
        }
        .childDrag {
          cursor: pointer;
        }

      }

      /deep/ .el-table__expand-icon{
        display: none;
      }
      /deep/ .el-table__expanded-cell{
        padding: 0;
      }

    }
    .add-node{
      margin-top: 20px;
    }
  }

}

</style>
