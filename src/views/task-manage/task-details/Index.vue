<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-09 14:04:56
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-02-01 18:14:53
-->
<template>
  <div class="case-details">
    <Crumbs :crumbs='crumbs' @edit='edit' @copy='copy' @cancel='cancel' @save='save'></Crumbs>
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
              <el-row class="">
                <el-col :span="12">
                  <p ><span>任务名称：</span><span class="width-span">{{taskInfo.name}}</span></p>
                </el-col>
                <el-col :span="12">
                  <p><span>软件版本：</span><span class="width-span">{{taskInfo.version}}</span></p>
                </el-col>
                <el-col :span="12">
                  <p><span>所属项目：</span><span  class="width-span">{{taskInfo.project}}</span></p>
                </el-col>
                <el-col :span="12">
                  <p><span>指派人：</span><span class="width-span">{{taskInfo.builder}}</span></p>
                </el-col>
                <el-col :span="12">
                  <p><span>创建时间：</span><span class="width-span">{{taskInfo.time_create}}</span></p>
                </el-col>
                <el-col :span="12">
                  <p><span>更新时间：</span><span class="width-span">{{taskInfo.time_modify}}</span></p>
                </el-col>
                <el-col :span="12">
                  <p><span>任务描述：</span><span class="width-span">{{taskInfo.desc}}</span></p>
                </el-col>
              </el-row>
            </div>
            <div class="taskCase">
              <el-row v-if="editFlag" class="text-title">
                <p>
                  已选择 <span> 1 </span>个节点<span> 2 </span>用例
                  <span class="del-color">删除</span>
                </p>
              </el-row>
              <div v-else class="action-list-title">用例列表</div>
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
                      <el-checkbox v-if="editFlag" @change="selectRow(scope.row)"></el-checkbox>
                      <div class="drag" v-if="editFlag">
                        <svg-icon data_iconName = 'icon-grab'></svg-icon>
                      </div>
                      <div @click="expand(scope.row,scope.$index)">
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
                              <el-checkbox v-if="editFlag" @change="selectRow(scope.row)"></el-checkbox>
                              <div v-if="editFlag" draggable="true" @dragstart="dragClick(scope.row)" class="childDrag">
                                <svg-icon data_iconName = 'icon-grab'></svg-icon>
                              </div>
                              <div>
                                <svg-icon data_iconName = 'icon-subset'></svg-icon>
                              </div>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column prop="caseGroup">
                        </el-table-column>
                        <el-table-column prop="loopTimes">

                        </el-table-column>
                        <el-table-column prop="error">

                        </el-table-column>
                        <el-table-column prop="caseGroup">

                        </el-table-column>
                        <el-table-column prop="loopTimes">

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
                              <p><svg-icon data_iconName="icon-configure" className="icon-gesture"/><span>配置环境</span></p>
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
                    <!-- <el-form-item
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

                    </el-form-item> -->
                    <span @click="tabDblClick(scope.row,scope.column)" > {{scope.row.caseGroup}} </span>
                  </template>
                </el-table-column>
                <el-table-column label="用例">
                  <template slot-scope="scope">
                    <!-- <el-form-item
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

                    </el-form-item> -->
                    <span @click="tabDblClick(scope.row,scope.column)" > {{scope.row.name}} </span>
                  </template>
                </el-table-column>
                <el-table-column label="循环次数">
                  <template slot-scope="scope">
                    <!-- <el-form-item
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

                    </el-form-item> -->
                    <span @click="tabDblClick(scope.row,scope.column)" > {{scope.row.loopTimes}}10 </span>
                  </template>
                </el-table-column>
                <el-table-column label="出错处理">
                  <template slot-scope="scope">
                    <!-- <el-form-item
                      :prop="'taskCase.' + scope.$index + '.error'"
                      :rules="rulesTaskInfo.taskCase.error"
                      label-width="0px"
                    >
                        <el-select v-if="editFlag" v-model="selectVal" placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                          </el-option>
                        </el-select>

                    </el-form-item> -->
                    <span >跳出</span>
                  </template>
                </el-table-column>
                <el-table-column label="执行后等待">
                  <template slot-scope="scope">
                    <!-- <el-form-item
                      :prop="'taskCase.' + scope.$index + '.executeWait'"
                      :rules="rulesTaskInfo.taskCase.executeWait"
                      label-width="0px"
                      >
                      <el-select v-if="editFlag" v-model="selectVal" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          >
                        </el-option>
                      </el-select>

                    </el-form-item> -->
                    <span>无处理</span>
                  </template>
                </el-table-column>
                <el-table-column label="执行位置">
                  <template slot-scope="scope">
                    <!-- <el-form-item

                      :prop="'taskCase.' + scope.$index + '.executeWait'"
                      :rules="rulesTaskInfo.taskCase.executeWait"
                      label-width="0px"
                      >
                      <el-select v-if="editFlag" v-model="selectVal" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          >
                        </el-option>
                      </el-select>
                    </el-form-item> -->
                    <span>被测设备</span>
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
                        <span>日志</span>
                      </p>
                      <p @click="addCase(scope.$index)">
                        <svg-icon data_iconName="icon-plus" className="icon-gesture"/>
                        <span>报告</span>
                      </p>

                      <el-button slot="reference"><i  class="el-icon-more"></i></el-button>
                    </el-popover>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs';
import { GET } from '@/utils/api.js';
export default {
  name: 'CaseDetails',
  data() {
    return {
      crumbs: {
        action: true,
        details: true,
        name: ''
      },
      editFlag: false,
      loading: false, // 任务名称动态验证动画
      options: [
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
      taskInfo: {
        // 'taskAssign': '',
        // 'taskDesc': '',
        // 'taskId': 0,
        // 'taskName': '',
        // 'taskProject': '',
        // 'taskVersion': '',
        // taskCase: [
        //   {
        //     id: '1',
        //     editCaseGroup: false,
        //     editLoop: false,
        //     caseGroup: '节点名称1',
        //     loopTimes: 11,
        //     error: '123',
        //     overtime: 'asdasd',
        //     executeWait: 'aq2134',
        //     childrens: [
        //       {
        //         id: '101',
        //         editCaseGroup: false,
        //         editLoop: false,
        //         caseGroup: '',
        //         loopTimes: 11,
        //         error: '123',
        //         overtime: 'asdasd',
        //         executeWait: 'aq2134'
        //       },
        //       {
        //         id: '102',
        //         editCaseGroup: false,
        //         editLoop: false,
        //         caseGroup: '',
        //         loopTimes: 12,
        //         error: '1qwe',
        //         overtime: 'asdasd',
        //         executeWait: 'aq2134'
        //       }
        //     ]
        //   }
        // ]
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
      iconFlag: true // 折叠图标标识
    };
  },
  mounted() {
    this.getDetails()
  },
  methods: {
    getDetails() {
      const uid = this.$route.query.uid
      const url = `task/detail/?uid=${uid}`
      GET(url).then(res => {
        console.log(res)
        this.taskInfo = res.result[0]
        this.crumbs.name = this.taskInfo.name
      }).catch(err => {
        this.$hintMsg('error', err)
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
    // 复制
    copy() {
      console.log('复制')
    },
    // 编辑
    edit() {
      // this.editFlag = true
      // this.crumbs.details = false
      console.log('编辑')
    },
    // 取消
    cancel() {
      this.editFlag = false
    },
    // 保存
    save() {
      this.editFlag = false
      this.crumbs.details = true
      console.log(this.taskInfo)
    }
  }
};
</script>

<style lang='less' scoped>
.case-details{
  .title {
    height: 41px;
    line-height: 41px;
    font-size: 12px;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
  }
  .formData {
    padding: 20px 0px;
    .taskInfo{
      padding:10px 20px;

      p{
        font-size: 12px;
        line-height: 18px;
         margin-bottom: 18px;
        span{
          display: inline-block;
          width: 60px;
          text-align: right;
        }
      }
      .width-span{
        width: 80%;
        text-align: left;
      }
    }
    .taskCase {
      padding: 0 20px;
      .borderStyle{
        border-top: 1px solid #EBEEF5;
      }
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
        /deep/ .el-table__expand-icon{
          display: none;
        }
        /deep/ .el-table__expanded-cell{
          padding: 0;
        }
      }
      .action-list-title{
        height: 41px;
        line-height: 41px;
        font-size: 12px;
        // padding: 0 20px;
        // border-bottom: 1px solid #ddd;
      }
    }
  }
  .info{
    // padding:10px 20px;
  }

}
</style>
