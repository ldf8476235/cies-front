<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-02 13:19:20
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2020-12-15 14:05:54
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
                  <el-form-item label="用例名称：" prop="device_name">
                    <el-input
                      :suffix-icon="loading ? 'el-icon-loading' : ''"
                      v-model.trim="caseInfo.device_name"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="软件版本：">
                    <el-input
                      v-model="caseInfo.device_sn"
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所属项目：" prop="device_space">
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
                </el-col>
                <el-col :span="12">
                  <el-form-item label="用例描述：">
                    <el-input
                      type="textarea"
                      v-model="caseInfo.device_desc"
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
                :data="caseInfo.caseInfoTable"
                ref="tableCase"
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
                      :prop="'caseInfoTable.' + scope.$index + '.nodeName'"
                      :rules="rulesCaseInfo.caseInfoTable.name"
                      label-width="0px"
                    >
                      <span v-if="scope.row.editNode">
                        <el-input
                          ref="inputBlur"
                          v-model="scope.row.nodeName"
                          placeholder=""
                          @blur="inputBlur(scope.row,scope.column)"
                        ></el-input>
                      </span>
                      <span v-else @click="tabDblClick(scope.row,scope.column)" > {{scope.row.nodeName}} </span>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="循环次数">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'caseInfoTable.' + scope.$index + '.loopTimes'"
                      :rules="rulesCaseInfo.caseInfoTable.hope_status_name"
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
                      :prop="'caseInfoTable.' + scope.$index + '.error'"
                      :rules="rulesCaseInfo.caseInfoTable.device_function"
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
                      :prop="'caseInfoTable.' + scope.$index + '.executeWait'"
                      :rules="rulesCaseInfo.caseInfoTable.device_function"
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
                      <p @click="showFuncBtn(scope.row)">
                        <svg-icon data_iconName="icon-plus" className="icon-gesture"/>
                        <span>插入用例</span>
                      </p>
                      <p><svg-icon data_iconName="icon-replace" className="icon-gesture"/><span>替换动作</span></p>
                      <p><svg-icon data_iconName="icon-top" className="icon-gesture"/><span>移动到顶部</span></p>
                      <p><svg-icon data_iconName="icon-bottom" className="icon-gesture"/><span>移动到底部</span></p>
                      <p><svg-icon data_iconName="icon-delete" className="icon-gesture"/><span>删除</span></p>
                      <el-button slot="reference"><i  class="el-icon-more"></i></el-button>
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
      loading: false, // 任务名称动态验证动画
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      selectVal: '', // 选中项
      tabClickIndex: '',
      caseInfo: {
        caseInfoTable: [
          {
            editNode: false,
            editLoop: false,
            nodeName: '节点名称1',
            loopTimes: 10,
            error: '123',
            overtime: 'asdasd',
            executeWait: 'aq2134',
            selectFlag: false
          },
          {
            editNode: false,
            editLoop: false,
            nodeName: '节点名称2',
            loopTimes: 10,
            error: '123',
            overtime: 'asdasd',
            executeWait: 'aq2134',
            selectFlag: false
          }
        ]
      },
      rulesCaseInfo: {
        caseInfoTable: {}
      },

      isIndeterminate: false, // 半选
      checkAll: false // 全选
    };
  },
  mounted() {
    this.drag()
  },
  methods: {
    // 每项选择
    selectRow(row) {
      this.$nextTick(() => {
        const isAll = this.caseInfo.caseInfoTable.every(item => {
          return item.selectFlag === true
        })
        const noAll = this.caseInfo.caseInfoTable.every(item => {
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
        this.caseInfo.caseInfoTable.forEach(item => {
          item.selectFlag = true
        })
        this.isIndeterminate = false
      } else {
        this.caseInfo.caseInfoTable.forEach(item => {
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
            // 修改data中的数组，
            const targetRow = self.caseInfo.caseInfoTable.splice(oldIndex, 1)[0]
            self.caseInfo.caseInfoTable.splice(newIndex, 0, targetRow)
          }
        })
      })
    },
    // 单击
    tabClick(row, column) {
      switch (column.label) {
        case '节点名称':
          console.log('单击节点')
          row.editNode = false;
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
        case '节点名称':
          row.editNode = true;
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
        case '节点名称':
          row.editNode = false;
          break
        case '循环次数':
          row.editLoop = false;
          break
        default:
          return
      }
    },
    addCaseRow() {},
    save() {
      console.log('保存')
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

}
</style>
