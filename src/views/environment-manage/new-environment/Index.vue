<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2021-01-13 09:43:47
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-01-19 13:42:16
-->
<template>
  <div class="new-environment">
    <Crumbs :crumbs='crumbs' @save='save'></Crumbs>
    <div class="container">
      <div class="content">
        <div class="title">环境信息</div>
        <div class="formData">
          <el-form
            ref="environmentInfo"
            :model="environmentInfo"
            :rules="rulesEnvironmentInfo"
            label-width="100px"

          >
            <div class="environmentInfo">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="环境名称：" prop="environmentName">
                    <el-input
                      v-model.trim="environmentInfo.environmentName"
                      placeholder="输入环境名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="软件版本：" prop="environmentVersion">
                    <el-input
                      v-model="environmentInfo.environmentVersion"
                      placeholder="输入软件版本"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所属项目：" prop="environmentProject">
                    <el-select v-model="environmentInfo.environmentProject" placeholder="选择所属项目">
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
                  <el-form-item label="环境描述：" prop="environmentDesc">
                    <el-input
                      type="textarea"
                      v-model="environmentInfo.environmentDesc"
                      placeholder="输入环境描述"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="taskCase">
              <el-row class="text-title">
                <p>
                  环境准备
                </p>
              </el-row>
              <el-table
                width="100%"
                :data="environmentInfo.environmentAction"
                ref="tableCase"
                row-key="id"
                >
                <el-table-column
                  width="60">
                  <template slot="header">
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
                      :prop="'environmentAction.' + scope.$index + '.actionName'"
                      :rules="rulesEnvironmentInfo.environmentAction.name"
                      label-width="0px"
                    >
                      <span > {{scope.row.actionName}} </span>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="循环次数">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'environmentAction.' + scope.$index + '.loopTimes'"
                      :rules="rulesEnvironmentInfo.environmentAction.loopCount"
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
                      :prop="'environmentAction.' + scope.$index + '.errorDispose'"
                      :rules="rulesEnvironmentInfo.environmentAction.errorDispose"
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
                    </el-form-item>
                  </template>
                </el-table-column>

                <el-table-column label="执行后等待">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'environmentAction.' + scope.$index + '.executeWait'"
                      :rules="rulesEnvironmentInfo.environmentAction.executeWait"
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
                  <el-button type="" @click="addActionRow">
                    <i class="el-icon-plus"></i> 添加动作</el-button>
                </el-col>
              </el-row>
            </div>
            <div class="taskCase">
              <el-row class="text-title">
                <p>
                  环境恢复
                </p>
              </el-row>
              <el-table
                width="100%"
                :data="environmentInfo.environmentAction"
                ref="tableCase"
                row-key="id"
                >
                <el-table-column
                  width="60">
                  <template slot="header">
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
                      :prop="'environmentAction.' + scope.$index + '.actionName'"
                      :rules="rulesEnvironmentInfo.environmentAction.name"
                      label-width="0px"
                    >
                      <span > {{scope.row.actionName}} </span>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="循环次数">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'environmentAction.' + scope.$index + '.loopTimes'"
                      :rules="rulesEnvironmentInfo.environmentAction.loopCount"
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
                      :prop="'environmentAction.' + scope.$index + '.errorDispose'"
                      :rules="rulesEnvironmentInfo.environmentAction.errorDispose"
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
                    </el-form-item>
                  </template>
                </el-table-column>

                <el-table-column label="执行后等待">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'environmentAction.' + scope.$index + '.executeWait'"
                      :rules="rulesEnvironmentInfo.environmentAction.executeWait"
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
                  <el-button type="" @click="addActionRow">
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
  name: '',
  data() {
    return {
      crumbs: {
        action: true,
        name: 'scene_1'
      },
      total: 0,
      pageSize: 10,
      currPage: 1,
      options: {

      },
      environmentInfo: {
        environmentAction: [{}]
      },
      rulesEnvironmentInfo: {
        environmentName: [
          { required: true, message: '请输入环境名称', trigger: 'blur' }
        ],
        environmentVersion: [
          { required: true, message: '请输入软件版本', trigger: 'blur' }
        ],
        environmentProject: [
          { required: true, message: '请选择所属项目', trigger: 'blur' }
        ],
        environmentDesc: [
          { required: true, message: '请输入环境描述', trigger: 'blur' }
        ],
        environmentAction: {}
      },
      isIndeterminate: false, // 半选
      checkAll: false, // 全选
      dialogTableVisible: false,
      actionList: [],
      selectVal: ''
    };
  },
  methods: {
    // 保存
    save() {
      this.$refs.environmentInfo.validate(valid => {
        if (!valid) return
      })

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
      this.environmentInfo.environmentAction.splice(this.insertIndex + 1, 0, data)
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
        const isAll = this.environmentInfo.environmentAction.every(item => {
          return item.selectFlag === true
        })
        const noAll = this.environmentInfo.environmentAction.every(item => {
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
        this.environmentInfo.environmentAction.forEach(item => {
          item.selectFlag = true
        })
        this.isIndeterminate = false
      } else {
        this.environmentInfo.environmentAction.forEach(item => {
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
            const targetRow = self.environmentInfo.environmentAction.splice(oldIndex, 1)[0]
            self.environmentInfo.environmentAction.splice(newIndex, 0, targetRow)
            console.log(self.environmentInfo.environmentAction)
          }
        })
      })
    },
    // 添加动作
    addActionRow() {}
  }
};
</script>

<style lang='less' scoped>
.new-environment{
  .title {
    height: 41px;
    line-height: 41px;
    font-size: 12px;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
  }
  .formData {
    padding: 20px 0px;
    .environmentInfo{
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
        border-top: 1px solid #EBEEF5;
        .func {
          display: flex;
          align-content: center;
        }
      }
    }
    .add-node{
      margin-top: 20px;
      margin-bottom: 10px;
    }
  }
}
</style>
