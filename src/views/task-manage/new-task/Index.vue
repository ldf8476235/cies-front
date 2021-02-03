<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-01 13:49:42
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-02-03 14:47:58
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
                  <el-form-item label="任务名称：" prop="name">
                    <el-input
                      :suffix-icon="loading ? 'el-icon-loading' : ''"
                      v-model.trim="taskInfo.name"
                      placeholder="输入任务名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="软件版本：" prop="version">
                    <el-input
                      v-model="taskInfo.version"
                      placeholder="输入软件版本"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所属项目：" prop="project">
                    <!-- <el-select v-model="taskInfo.project" placeholder="选择所属项目">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select> -->
                    <el-input
                      v-model="taskInfo.project"
                      placeholder="输入所属项目"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="指派人：" prop="builder">
                    <!-- <el-select v-model="taskInfo.taskAssign" placeholder="选择指派人">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select> -->
                    <el-input
                      v-model="taskInfo.builder"
                      placeholder="输入指派人"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="任务描述：" prop='desc'>
                    <el-input
                      type="textarea"
                      v-model="taskInfo.desc"
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
                :data="taskInfo.case_list"
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
                        <el-table-column label="用例组" prop="loop_count">

                        </el-table-column>
                        <el-table-column label="用例组" prop="error">

                        </el-table-column>
                        <el-table-column label="用例组" prop="caseGroup">

                        </el-table-column>
                        <el-table-column label="用例组" prop="loop_count">

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
                      :prop="'case_list.' + scope.$index + '.caseGroup'"
                      :rules="rulesTaskInfo.case_list.caseGroup"
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
                      :prop="'case_list.' + scope.$index + '.name'"
                      :rules="rulesTaskInfo.case_list.name"
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
                      <span v-else @click="tabDblClick(scope.row,scope.column)" > {{scope.row.name}} </span>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="循环次数">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'case_list.' + scope.$index + '.loop_count'"
                      :rules="rulesTaskInfo.case_list.loop_count"
                      label-width="0px"
                    >
                      <span v-if="scope.row.editLoop">
                        <el-input
                          ref="inputBlur"
                          v-model="scope.row.loop_count"
                          placeholder=""
                          @blur="inputBlur(scope.row,scope.column)"
                        ></el-input>
                      </span>
                      <span v-else @click="tabDblClick(scope.row,scope.column)" > {{scope.row.loop_count}}10 </span>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="出错处理">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'case_list.' + scope.$index + '.error'"
                      :rules="rulesTaskInfo.case_list.error"
                      label-width="0px"
                    >
                      <span v-if="true">
                        <el-select v-model="scope.row.error" placeholder="请选择">
                          <el-option
                            v-for="item in errorList"
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
                      :prop="'case_list.' + scope.$index + '.executeWait'"
                      :rules="rulesTaskInfo.case_list.executeWait"
                      label-width="0px"
                    >
                      <el-select v-model="scope.row.executeWait" placeholder="请选择">
                        <el-option
                          v-for="item in executeWaitList"
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
                  <!-- <el-button type="" @click="addCaseGroup">
                    <i class="el-icon-plus"></i> 添加用例组
                  </el-button> -->
                  <el-button type="" @click="addCase">
                    <i class="el-icon-plus"></i> 添加用例
                  </el-button>
                </el-col>
              </el-row>
            </div>
          </el-form>
          <Dialog ref='dialog' :title='title' @confirm='confirm'>
            <el-table slot='environment' :data="caseList">
              <el-table-column label="" align="center" width="30">
                <template slot-scope="scope">
                  <el-radio @change="radioItem(scope.row)" v-model="radio" :label="scope.row.uid"></el-radio>
                </template>
              </el-table-column>
              <el-table-column property="date" label="序号" type="index" width="50"></el-table-column>
              <el-table-column property="name" label="用例名称" width="200"></el-table-column>
              <el-table-column property="builder" label="创建人" width="100"></el-table-column>
              <el-table-column property="time_create" label="创建时间"></el-table-column>
              <el-table-column property="verison" label="软件版本"></el-table-column>
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
import { GET, POST } from '@/utils/api.js';
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
      title: '用例列表',
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

        case_list: [
          // {
          //   id: '1',
          //   editCaseGroup: false,
          //   editLoop: false,
          //   caseGroup: '节点名称1',
          //   loop_count: 11,
          //   error: '123',
          //   overtime: 'asdasd',
          //   executeWait: 'aq2134',
          //   childrens: [
          //     {
          //       id: '101',
          //       editCaseGroup: false,
          //       editLoop: false,
          //       caseGroup: '',
          //       loop_count: 11,
          //       error: '123',
          //       overtime: 'asdasd',
          //       executeWait: 'aq2134'
          //     },
          //     {
          //       id: '102',
          //       editCaseGroup: false,
          //       editLoop: false,
          //       caseGroup: '',
          //       loop_count: 12,
          //       error: '1qwe',
          //       overtime: 'asdasd',
          //       executeWait: 'aq2134'
          //     }
          //   ]
          // }
        ]
      },
      rulesTaskInfo: {
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
        builder: [
          { required: true, message: '请选择指派人', trigger: 'blur' }
        ],
        project: [
          { required: true, message: '请选择所属项目', trigger: 'blur' }
        ],
        version: [
          { required: true, message: '请输入软件版本', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入任务描述', trigger: 'blur' }
        ],
        case_list: {}
      },
      iconFlag: true, // 折叠图标标识
      iconIndex: null,
      dialogTableVisible: false,
      caseList: [{}, {}],
      radio: '1',
      keyword: '', // 环境配置搜索关键字
      executeWaitList: [
        {
          lable: '--',
          value: '--'
        }
      ],
      errorList: [
        {
          label: '无处理',
          value: '无处理'
        }
      ]

    }
  },
  mounted() {
    this.drag()
    const uid = this.$route.query.uid
    if (uid) {
      this.edit()
    }
    this.getCaseList(this.currPage, this.pageSize)
  },
  methods: {
    // 获取用例列表
    getCaseList(page, size) {
      const url = `case/list/?page=${page}&count=${size}`
      GET(url).then(res => {
        this.caseList = res.result
        this.total = res.count
      })
    },
    // 选择动作
    radioItem(row) {
      console.log(row)
      this.radioData = row
    },
    // 取消插入动作
    cancelAddAction() {
      this.radio = ''
    },
    // 确认添加数据
    confirm() {
      console.log('确认添加数据')
      console.log(this.insertIndex, this.radioData)
      if (!this.radioData.name) {
        this.$hintMsg('warning', '未选择动作')
        return
      }
      const data = {
        editLoop: false,
        uid: this.radioData.uid,
        name: this.radioData.name,
        // type: this.radioData.type,
        loop_count: 1,
        timeout: 0,
        error: '无处理',
        executeWait: '--',
        selectFlag: false
      }
      this.taskInfo.case_list.splice(this.insertIndex + 1, 0, data)
      this.radio = ''
    },
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
      // const data = this.$route.params.data
      // if (data) {
      //   localStorage.setItem('editData', JSON.stringify(data))
      // }
      // this.taskInfo = data || JSON.parse(localStorage.getItem('editData'))
      const uid = this.$route.query.uid
      const url = `task/detail/?uid=${uid}`
      GET(url).then(res => {
        console.log(res)
        this.taskInfo = res.result[0]
      }).catch(err => {
        this.$hintMsg('error', err)
      })
    },
    // 删除用例组
    delCaseGroup(index) {
      this.taskInfo.case_list.splice(index, 1)
    },
    // 添加用例
    addCase(index) {
      // console.log(index)
      // if (typeof index === 'number') {
      //   this.taskInfo.case_list[index].childrens.push(
      //     {
      //       case: '子用例',
      //       loop_count: '用例'
      //     }
      //   )
      // } else {
      //   this.taskInfo.case_list.push({
      //     case: '用例',
      //     loop_count: '用例'
      //   })
      // }
      this.$refs.dialog.dialogTableVisible = true
      this.insertIndex = this.taskInfo.case_list.length

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
        this.taskInfo.case_list.splice(index + 1, 0, data)
      } else {
        this.taskInfo.case_list.push(data)
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
            self.taskInfo.case_list.forEach((item) => {
              self.$refs.refTable.toggleRowExpansion(item, false)
            })
            self.iconFlag = true
          },
          // 拖拽结束后的操作
          onEnd({ newIndex, oldIndex }) {
            if (newIndex === oldIndex) return
            console.log(newIndex, oldIndex)
            // 修改data中的数组，
            const targetRow = self.taskInfo.case_list.splice(oldIndex, 1)[0]
            self.taskInfo.case_list.splice(newIndex, 0, targetRow)
            console.log(self.taskInfo.case_list)
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
        const upDate = this.taskInfo.case_list[index];
        this.taskInfo.case_list.unshift(upDate)
        this.taskInfo.case_list.splice(index + 1, 1);
      }
    },
    // 移动至底部
    downMove(index) {
      const len = this.taskInfo.case_list.length - 1
      if (index === len) {
        this.$message({
          message: '处于最低部，不能继续下移',
          type: 'warning'
        });
      } else {
        console.log(index)
        const upDate = this.taskInfo.case_list[index];
        this.taskInfo.case_list.splice(index, 1);
        this.taskInfo.case_list.push(upDate)
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
      const data = { }
      this.$refs.taskInfo.validate((valid) => {
        console.log(this.taskInfo)
        const arr = []
        this.taskInfo.case_list.forEach(item => {
          const obj = {
            case: item.uid,
            env: []
          }
          arr.push(obj)
        })
        this.taskInfo.case_list = arr
        if (valid) {
          let url = 'task/add'
          let method = 'POST'
          const uid = this.$route.query.uid
          if (uid) {
            url = 'task/edit'
            method = 'PUT'
          }
          POST(url, method, this.taskInfo).then(res => {
            console.log(res)
            this.$hintMsg('success', res)
            this.$router.push('/task')
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
