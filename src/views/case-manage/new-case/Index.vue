<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-02 13:19:20
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-03-04 10:01:30
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
                  <el-form-item label="用例名称：" prop="name">
                    <el-input
                      :suffix-icon="loading ? 'el-icon-loading' : ''"
                      v-model.trim="caseInfo.name"
                      placeholder="输入用例名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="软件版本：" prop="">
                    <el-input
                      v-model="caseInfo.version"
                      placeholder="输入软件版本"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所属项目：" prop="">
                    <el-input
                      v-model="caseInfo.project"
                      placeholder="请输入所属项目"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="用例描述：" prop="">
                    <el-input
                      type="textarea"
                      v-model="caseInfo.desc"
                      placeholder="输入用例描述"
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
                class='borderTop'
                :data="caseInfo.action"
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
                  <template slot-scope = 'scope'>
                    <svg-icon v-if="scope.row.type ==='U3'" data_iconName="icon-gesture" />
                    <svg-icon v-if="scope.row.type ==='Voice'" data_iconName="icon-voice" />
                    <svg-icon v-if="scope.row.type ==='Shell'" data_iconName="icon-script-off" />
                  </template>
                </el-table-column>
                <el-table-column label="名称">
                  <template slot-scope="scope">
                    <!-- <el-form-item
                      :prop="'action.' + scope.$index + '.name'"
                      :rules="rulesCaseInfo.action.name"
                      label-width="0px"
                      >

                    </el-form-item> -->
                    <span v-if="scope.row.function === 'verify'">检验点： {{scope.row.name}} </span>
                    <span v-if="scope.row.function === 'action'">动作： {{scope.row.name}} </span>
                  </template>
                </el-table-column>
                <!-- <el-table-column label="校验点名称">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'action.' + scope.$index + '.name'"
                      :rules="rulesCaseInfo.action.name"
                      label-width="0px"
                      >
                      <span > {{scope.row.name}} </span>
                    </el-form-item>
                  </template>
                </el-table-column> -->
                <el-table-column label="循环次数">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'action.' + scope.$index + '.loop_count'"
                      :rules="rulesCaseInfo.action.loop_count"
                      label-width="0px"
                    >
                      <span v-if="scope.row.editLoop">
                        <el-input
                          ref="inputBlur"
                          v-model.number="scope.row.loop_count"
                          placeholder=""
                          @blur="inputBlur(scope.row,scope.column)"
                        ></el-input>
                      </span>
                      <span v-else @click='()=> scope.row.editLoop = true' > {{scope.row.loop_count}}</span>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="出错处理">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'action.' + scope.$index + '.error_handle'"
                      :rules="rulesCaseInfo.action.error_handle"
                      label-width="0px"
                    >
                      <span v-if="true">
                        <el-select v-model="scope.row.error_handle" placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </span>
                    </el-form-item>
                  </template>
                </el-table-column>

                <el-table-column label="执行后等待">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'action.' + scope.$index + '.wait_time'"
                      :rules="rulesCaseInfo.action.wait_time"
                      label-width="0px"
                    >
                      <el-input
                          v-if='scope.row.editWait'
                          style="width:30%;"
                          ref="inputBlur"
                          v-model.number="scope.row.wait_time"
                          placeholder=""
                          @blur="inputBlur(scope.row,scope.column)"
                        ></el-input>
                        <span v-else @click='()=> scope.row.editWait = true'> {{scope.row.wait_time}}</span>
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
                      <p @click='replaceAction(scope.$index,scope.row)'><svg-icon data_iconName="icon-replace" className="icon-gesture"/><span>替换动作</span></p>
                      <p @click='moveTop(scope.$index,scope.row)'><svg-icon data_iconName="icon-top" className="icon-gesture" /><span>移动到顶部</span></p>
                      <p @click='moveBottom(scope.$index)'><svg-icon data_iconName="icon-bottom" className="icon-gesture" /><span>移动到底部</span></p>
                      <p @click='del(scope.$index)'><svg-icon data_iconName="icon-delete" className="icon-gesture"/><span>删除</span></p>
                      <div slot="reference">
                        <svg-icon data_iconName='icon-more'></svg-icon>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
              </el-table>
              <el-row class="add-node">
                <el-col>
                  <el-button type="" @click="addAction">
                    <i class="el-icon-plus"></i> 添加动作</el-button>
                  <el-button type="" @click="addVerify">
                    <i class="el-icon-plus"></i> 添加检验点</el-button>
                </el-col>
              </el-row>
            </div>
          </el-form>
          <Dialog
            ref='dialog'
            :title='title'
            @confirm='confirm'
            :total2='total'
            :currPage2='currPage'
            :pageSize2='pageSize'
            @handleSizeChange='handleSizeChange'
            @handleCurrChange='handleCurrChange'>
            <el-table v-if="slotType === 'caseAction'" slot='caseAction' :data="actionList">
              <el-table-column label="" align="center" width="40">
                <template slot-scope="scope">
                  <el-radio @change="radioItem(scope.row)" v-model="radio" :label="scope.row.uid"></el-radio>
                </template>
              </el-table-column>
              <el-table-column label="序号" width="50" type="index"></el-table-column>
              <el-table-column property="type" label="类型" width="50">
                <template slot-scope='scope'>
                  <svg-icon v-if="scope.row.type ==='Voice'" data_iconName="icon-voice" />
                  <svg-icon v-else-if="scope.row.type ==='Shell'" data_iconName="icon-script-off" />
                  <svg-icon v-else data_iconName="icon-gesture" />
                </template>
              </el-table-column>
              <el-table-column property="name" label="动作名称"></el-table-column>
              <el-table-column property="builder" label="创建人" width="100"></el-table-column>
              <el-table-column property="time_create" label="创建时间" width="140"></el-table-column>
            </el-table>
            <el-table  v-if="slotType === 'caseVerify'"  slot='caseVerify' :data="verifyList">
              <el-table-column label="" align="center" width="40">
                <template slot-scope="scope">
                  <el-radio @change="radioItem(scope.row)" v-model="radio" :label="scope.row.uid"></el-radio>
                </template>
              </el-table-column>
              <el-table-column label="序号" width="50" type="index"></el-table-column>
              <el-table-column property="type" label="类型" width="50">
                <template slot-scope='scope'>
                  <svg-icon v-if="scope.row.type ==='Voice'" data_iconName="icon-voice" />
                  <svg-icon v-else-if="scope.row.type ==='Shell'" data_iconName="icon-script-off" />
                  <svg-icon v-else data_iconName="icon-gesture" />
                </template>
              </el-table-column>
              <el-table-column property="name" label="校验点名称"></el-table-column>
              <el-table-column property="builder" label="创建人" width="100"></el-table-column>
              <el-table-column property="time_create" label="创建时间" width="140"></el-table-column>
            </el-table>
          </Dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs';
import Dialog from '@/components/config-dialog/Dialog.vue';
import { GET, POST } from '@/utils/api.js';
import { selfIsNaN } from '@/utils/utils.js';
export default {
  name: 'NewCase',
  components: {
    Dialog
  },
  data() {
    const validNum = (rule, value, callback) => {
      selfIsNaN(value) ? callback() : callback(new Error('请输入数字'))
    }
    return {
      crumbs: {
        action: true,
        name: '新建用例'
      },
      title: '',
      slotType: '',
      total: 0,
      pageSize: 10,
      currPage: 1,
      loading: false, // 任务名称动态验证动画
      options: [
        {
          value: 'PASS',
          label: 'PASS'
        },
        {
          value: 'FAIL',
          label: 'FAIL'
        }
      ],
      selectVal: '', // 选中项
      tabClickIndex: '',
      caseInfo: {
        version: '',
        project: '',
        desc: '',
        'action': [
        ]
      },
      rulesCaseInfo: {
        name: [
          { required: true, message: '请输入用例名称', trigger: 'blur' }
        ],
        version: [
          { required: true, message: '请输入软件版本', trigger: 'blur' }
        ],
        project: [
          { required: true, message: '请选择所属项目', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入用例描述', trigger: 'blur' }
        ],
        action: {
          wait_time: [
            { required: true, message: '请输入执行后等待', trigger: 'blur' },
            { validator: validNum, trigger: 'blur' }
          ],
          loop_count: [
            { required: true, message: '请输入循环次数', trigger: 'blur' },
            { validator: validNum, trigger: 'blur' }
          ]
        }
      },

      isIndeterminate: false, // 半选
      checkAll: false, // 全选
      actionList: [
      ],
      verifyList: [

      ],
      radio: '', // 单选
      radioData: {}, // 添加动作radio
      executeWaitList: [
        {
          lable: '--',
          value: '--'
        }
      ]
    };
  },
  mounted() {
    this.drag()
    const uid = this.$route.query.uid
    if (uid) {
      this.editInto(uid)
    }
    this.getActionList(this.currPage, this.pageSize)
    this.getVerifyList(this.currPage, this.pageSize)
  },
  methods: {
    // 替换动作
    replaceAction(index) {
      this.replaceActionFlag = true
      this.insertIndex = index
      this.$refs.dialog.dialogTableVisible = true
    },
    // 移动到顶部
    moveTop(index, row) {
      console.log(index, row)
      if (index == 0) {
        this.$hintMsg('warning', '处于最顶端，不能继续上移')
      } else {
        const upDate = this.caseInfo.action[index];
        this.caseInfo.action.unshift(upDate)
        this.caseInfo.action.splice(index + 1, 1);
      }
    },
    // 移动到最底部
    moveBottom(index) {
      const len = this.caseInfo.action.length - 1
      if (index === len) {
        this.$hintMsg('warning', '处于最低部，不能继续下移')
      } else {
        console.log(index)
        const upDate = this.caseInfo.action[index];
        this.caseInfo.action.splice(index, 1);
        this.caseInfo.action.push(upDate)
      }
    },
    // 删除
    del(index) {
      console.log('s', index)
      this.caseInfo.action.splice(index, 1)
    },
    // 获取动作列表
    getActionList(page, count) {
      const url = `action/list/?page=${page}&count=${count}`
      this.$http.get(url).then(res => {
        console.log(res)
        if (res.status_code === 200) {
          this.actionList = res.data.result
          this.total = res.data.count
        }
      })
    },
    // 获取动作列表
    getVerifyList(page, count) {
      const url = `verify/list/?page=${page}&count=${count}`
      this.$http.get(url).then(res => {
        console.log(res)
        if (res.status_code === 200) {
          this.verifyList = res.data.result
          this.total = res.data.count
        }
      })
    },

    // 编辑进入
    editInto(uid) {
      const copy = this.$route.query.copy
      const url = `case/detail/?uid=${uid}`
      GET(url).then(res => {
        this.caseInfo = res.result[0]
        console.log(this.caseInfo.action)
        this.caseInfo.action.forEach(item => {
          this.$set(item, 'editLoop', true)
          this.$set(item, 'editWait', true)
        })
        if (copy) {
          this.caseInfo.name = ''
        }
      })
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
        editLoop: true,
        editWait: true,
        uid: this.radioData.uid,
        name: this.radioData.name,
        function: this.radioData.function,
        type: this.radioData.type,
        error_handle: 'PASS',
        wait_time: 0,
        loop_count: 1,
        exec_locate: '123',
        selectFlag: false
      }
      console.log(data)
      this.replaceActionFlag ? this.caseInfo.action.splice(this.insertIndex, 1, data)
        : this.caseInfo.action.splice(this.insertIndex + 1, 0, data)
      this.replaceActionFlag = false
      this.radio = ''
      this.radioData = {}
    },
    // 选择动作
    radioItem(row) {
      console.log(row)
      this.radioData = row
    },
    // 插入动作
    insertAction(index) {
      this.insertIndex = index
      this.$refs.dialog.dialogTableVisible = true
    },
    // 每项选择
    selectRow(row) {
      this.$nextTick(() => {
        const isAll = this.caseInfo.action.every(item => {
          return item.selectFlag === true
        })
        const noAll = this.caseInfo.action.every(item => {
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
        this.caseInfo.action.forEach(item => {
          item.selectFlag = true
        })
        this.isIndeterminate = false
      } else {
        this.caseInfo.action.forEach(item => {
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
            const targetRow = self.caseInfo.action.splice(oldIndex, 1)[0]
            self.caseInfo.action.splice(newIndex, 0, targetRow)
            console.log(self.caseInfo.action)
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

      switch (column.label) {
        case '循环次数':
          if (row.wait_time === 0) {
            row.editLoop = false;
          } else if (!row.wait_time) {
            return
          } else {
            row.editLoop = false;
          }
          break
        case '执行后等待':
          if (row.wait_time === 0) {
            row.editWait = false;
          } else if (!row.wait_time) {
            return
          } else {
            row.editWait = false;
          }
          break
        default:
          return
      }
    },
    // 添加动作
    addAction() {
      this.slotType = 'caseAction'
      this.title = '动作列表'
      this.$refs.dialog.dialogTableVisible = true
      this.insertIndex = this.caseInfo.action.length
    },
    // 添加检验点
    addVerify() {
      this.slotType = 'caseVerify'
      this.title = '校验点列表'
      this.$refs.dialog.dialogTableVisible = true
      this.insertIndex = this.caseInfo.action.length
    },
    save() {
      this.$refs.caseInfo.validate(valid => {
        if (valid) {
          let url = '/case/add'
          let method = 'POST'
          const copy = this.$route.query.copy
          if (this.caseInfo.uid && !copy) {
            url = '/case/edit/'
            method = 'PUT'
          }
          this.caseInfo.builder = 'admin'
          // 临时action:['assd123123']
          const arr = []
          this.caseInfo.action.forEach(item => {
            const obj = {
              function: item.function,
              uid: item.uid,
              wait_time: item.wait_time,
              loop_count: item.loop_count,
              error_handle: item.error_handle,
              exec_locate: item.exec_locate
            }
            arr.push(obj)
          })
          this.caseInfo.action = arr
          console.log('保存', this.caseInfo)
          POST(url, method, this.caseInfo).then(res => {
            this.$hintMsg('success', res)
            this.$router.push('/case')
          }).catch(err => {
            this.$hintMsg('error', err)
          })
        }
      })
    },
    // 当前页条数
    handleSizeChange(size) {
      this.pageSize = size
      console.log(size)
      if (this.slotType === 'caseAction') {
        this.getActionList(this.currPage, this.pageSize)
      } else {
        this.getVerifyList(this.currPage, this.pageSize)
      }
    },
    // 当前页面
    handleCurrChange(page) {
      this.currPage = page
      console.log(this.currPage)
      if (this.slotType === 'caseAction') {
        this.getActionList(this.currPage, this.pageSize)
      } else {
        this.getVerifyList(this.currPage, this.pageSize)
      }
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
