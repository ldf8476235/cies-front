<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-02 13:19:20
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2020-12-22 17:31:00
-->
<template>
  <div class="new-case">
    <Crumbs :crumbs='crumbs' @save='save'></Crumbs>
    <div class="container">
      <div class="content">
        <div class="title">用例信息</div>
        <div class="formData">
          <el-form
            ref="caseInfo"
            :model="caseInfo"
            :rules="rulesCaseInfo"
            label-width="100px"

          >
            <div class="caseInfo">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="用例名称：" prop="caseName">
                    <el-input
                      :suffix-icon="loading ? 'el-icon-loading' : ''"
                      v-model.trim="caseInfo.caseName"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="软件版本：">
                    <el-input
                      v-model="caseInfo.caseVersion"
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所属项目：" prop="device_space">
                    <el-select v-model="caseInfo.caseProject" placeholder="请选择">
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
                  <el-form-item label="用例描述：">
                    <el-input
                      type="textarea"
                      v-model="caseInfo.caseDesc"
                      placeholder="请输入"
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
                border
                :data="caseInfo.caseAction"
                ref="tableCase"
                row-key="id"
                >
                <el-table-column
                  width="60">
                  <template slot="header" slot-scope='scope'>
                     <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
                  </template>
                  <template slot-scope="scope">
                    <div class="func">
                      <el-checkbox v-model="scope.row.selectFlag" @change="selectRow(scope.row)"></el-checkbox>
                      <div id="drag" class="drag">
                        <svg-icon data_iconName = 'icon-grab'></svg-icon>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  type="index"
                  label="序号"
                  width="55">
                </el-table-column>
                <el-table-column
                  label="动作类型"
                  width="100">
                  <template>
                    <svg-icon data_iconName="icon-gesture" className="icon-gesture"/>
                  </template>
                </el-table-column>
                <el-table-column label="动作名称">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'caseAction.' + scope.$index + '.actionName'"
                      :rules="rulesCaseInfo.caseAction.name"
                      label-width="0px"
                    >
                      <!-- <span v-if="scope.row.editNode">
                        <el-input
                          ref="inputBlur"
                          v-model="scope.row.actionName"
                          placeholder=""
                          @blur="inputBlur(scope.row,scope.column)"
                        ></el-input>
                      </span> -->
                      <span > {{scope.row.actionName}} </span>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="循环次数">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'caseAction.' + scope.$index + '.loopTimes'"
                      :rules="rulesCaseInfo.caseAction.loopCount"
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
                      :prop="'caseAction.' + scope.$index + '.errorDispose'"
                      :rules="rulesCaseInfo.caseAction.errorDispose"
                      label-width="0px"
                    >
                      <span v-if="true">
                        <el-select v-model="scope.row.errorDispose" placeholder="请选择">
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
                      :prop="'caseAction.' + scope.$index + '.executeWait'"
                      :rules="rulesCaseInfo.caseAction.executeWait"
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
                      <p @click="insertAction(scope.$index)">
                        <svg-icon data_iconName="icon-plus" className="icon-gesture"/>
                        <span>插入动作</span>
                      </p>
                      <p><svg-icon data_iconName="icon-replace" className="icon-gesture"/><span>替换动作</span></p>
                      <p><svg-icon data_iconName="icon-top" className="icon-gesture"/><span>移动到顶部</span></p>
                      <p><svg-icon data_iconName="icon-bottom" className="icon-gesture"/><span>移动到底部</span></p>
                      <p><svg-icon data_iconName="icon-delete" className="icon-gesture"/><span>删除</span></p>
                      <!-- <el-button slot="reference"><i  class="el-icon-more"></i></el-button> -->
                      <div slot="reference">
                        <svg-icon data_iconName='icon-more'></svg-icon>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
              </el-table>
              <el-row class="add-node">
                <el-col>
                  <el-button type="" @click="addCaseRow">
                    <i class="el-icon-plus"></i> 添加动作</el-button>
                </el-col>
              </el-row>
            </div>
          </el-form>
          <el-dialog title="动作列表" :visible.sync="dialogTableVisible">
            <el-table :data="actionList" border>
              <el-table-column label="" align="center" width="40">
                <template slot-scope="scope">
                  <el-radio @change="radioItem(scope.row)" v-model="radio" :label="scope.row.actionId"></el-radio>
                </template>
              </el-table-column>
              <el-table-column property="" label="序号" width="50" type="index"></el-table-column>
              <el-table-column property="actionType" label="类型" width="90"></el-table-column>
              <el-table-column property="actionName" label="动作名称"></el-table-column>
              <el-table-column property="createUser" label="创建人" width="150"></el-table-column>
              <el-table-column property="date" label="创建时间" width="100"></el-table-column>
            </el-table>
            <PageUtil
              ref="pageutil"
              :total="total"
              :pageSize="pageSize"
              :currPage="currPage"
            ></PageUtil>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancelAddAction">取 消</el-button>
              <el-button type="primary" @click="addAction">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs';
export default {
  name: 'NewCase',
  data() {
    return {
      crumbs: {
        action: true,
        name: '新建用例'
      },
      total: 0,
      pageSize: 10,
      currPage: 1,
      loading: false, // 任务名称动态验证动画
      options: [
        {
          value: 'index1',
          label: '项目1'
        },
        {
          value: 'index2',
          label: '项目2'
        }
      ],
      selectVal: '', // 选中项
      tabClickIndex: '',
      caseInfo: {
        'caseCreator': 'string',
        'caseDesc': 'string',
        'caseName': '',
        'caseProject': '',
        'caseVersion': '',
        'caseAction': [
          {
            id: '01',
            editLoop: false,
            actionName: '节点名称1',
            actionType: 'screen',
            loopTimes: 11,
            errorDispose: '123',
            overtime: 'asdasd',
            executeWait: 'aq2134',
            selectFlag: false
          },
          {
            id: '02',
            editLoop: false,
            actionName: '节点名称2',
            actionType: 'screen',
            loopTimes: 10,
            errorDispose: '123',
            overtime: 'asdasd',
            executeWait: 'aq2134',
            selectFlag: false
          }
        ]
      },
      rulesCaseInfo: {
        caseAction: {}
      },

      isIndeterminate: false, // 半选
      checkAll: false, // 全选
      dialogTableVisible: false,
      actionList: [
        { actionId: '1',
          actionType: 'screen1',
          actionName: 'name1',
          createUser: 'user',
          date: '2012-01-01'
        },
        { actionId: '2',
          actionType: 'screen2',
          actionName: 'name2',
          createUser: 'user',
          date: '2012-02-01'
        }
      ],
      radio: '' // 单选
    };
  },
  mounted() {
    this.drag()
    const queryId = this.$route.query.id
    if (queryId) {
      this.editInto()
    }
  },
  methods: {
    // 编辑进入
    editInto() {
      console.log(this.$route.params.data)
      const data = this.$route.params.data
      if (data) {
        localStorage.setItem('edit', JSON.stringify(this.$route.params.data))
      }
      this.caseInfo = data || JSON.parse(localStorage.getItem('edit'))
    },
    // 取消插入动作
    cancelAddAction() {
      this.radio = ''
    },
    // 确认添加数据
    addAction() {
      console.log('确认添加数据')
      this.radioData
      console.log(this.insertIndex)
      const data = {
        editLoop: false,
        actionName: this.radioData.actionName,
        actionType: this.radioData.actionType,
        loopTimes: 0,
        errorDispose: '123',
        overtime: 'asdasd',
        executeWait: 'aq2134',
        selectFlag: false
      }
      this.caseInfo.caseAction.splice(this.insertIndex + 1, 0, data)
      this.dialogTableVisible = false
      this.radio = ''
    },
    // 选择动作
    radioItem(row) {
      console.log(row)
      this.radioData = row
    },
    // 插入动作
    insertAction(index) {
      this.insertIndex = index
      this.dialogTableVisible = true

    },
    // 每项选择
    selectRow(row) {
      this.$nextTick(() => {
        const isAll = this.caseInfo.caseAction.every(item => {
          return item.selectFlag === true
        })
        const noAll = this.caseInfo.caseAction.every(item => {
          return item.selectFlag === false
        })
        if (isAll) {
          this.isIndeterminate = false;
          this.checkAll = true;
        } else if (noAll) {
          this.isIndeterminate = false;
          this.checkAll = false;
        } else {
          this.checkAll = false;
          this.isIndeterminate = true;
        }
      })

    },
    // 全选/全不选
    handleCheckAllChange(flag) {
      if (flag) {
        this.caseInfo.caseAction.forEach(item => {
          item.selectFlag = true
        })
        this.isIndeterminate = false
      } else {
        this.caseInfo.caseAction.forEach(item => {
          item.selectFlag = false
        })
        this.isIndeterminate = false
      }
    },
    // 拖动
    drag() {
      this.$nextTick(() => {
        // 表格拖拽事件的添加
        const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
        const self = this;
        Sortable.create(el, {
          handle: '.drag',
          // 拖拽结束后的操作
          onEnd({ newIndex, oldIndex }) {
            console.log(newIndex, oldIndex)
            // 修改data中的数组，
            const targetRow = self.caseInfo.caseAction.splice(oldIndex, 1)[0]
            self.caseInfo.caseAction.splice(newIndex, 0, targetRow)
            console.log(self.caseInfo.caseAction)
          }
        })
      })
    },
    // 单击
    tabClick(row, column) {
      switch (column.label) {
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
        case '循环次数':
          row.editLoop = false;
          break
        default:
          return
      }
    },
    addCaseRow() {
      this.dialogTableVisible = true
      this.insertIndex = this.caseInfo.caseAction.length
    },
    save() {
      let url = '/case/add'
      if (this.caseInfo.caseId) {
        url = '/case/update'
      }
      console.log('保存', this.caseInfo)
      this.$http.post(url, this.caseInfo).then(res => {
        console.log(res)
        if (res.code === 1) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.$router.push('/case')
        } else if (res.code === 0) {
          this.$message({
            type: 'warning',
            message: res.msg
          })
        }
      })
    }
  }
};
</script>

<style lang='less' scoped>
.new-case {
  .title {
    height: 41px;
    line-height: 41px;
    font-size: 12px;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
  }
  .formData {
    padding: 20px 0px;
    .caseInfo{
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
      .text-title{
        font-size: 12px;
        .del-color{
          color: #006CEB;
        }
      }
      .el-table {
        .func {
          display: flex;
          align-content: center;
        }
      }
    }
    .add-node{
      margin-top: 20px;
    }
  }
  .el-dialog {
    .el-radio {
     /deep/ .el-radio__label{
        display: none;
      }
    }
  }

}
</style>
