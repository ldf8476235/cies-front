<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-09 14:04:56
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2020-12-14 15:09:24
-->
<template>
  <div class="case-details">
    <Crumbs :crumbs='crumbs' @edit='edit' @copy='copy'></Crumbs>
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
                  <el-form-item v-if="editFlag"  label="用例名称：" prop="device_name">
                    <el-input
                      disabled
                      :suffix-icon="loading ? 'el-icon-loading' : ''"
                      v-model.trim="taskInfo.device_name"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                  <p v-else><span>任务名称：</span><span>case_name_1</span></p>
                </el-col>
                <el-col :span="12">
                  <el-form-item v-if="editFlag" label="软件版本：">
                    <el-input
                      v-model="taskInfo.device_sn"
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                  <p v-else><span>软件版本：</span><span>case_name_1</span></p>
                </el-col>
                <el-col :span="12">

                  <el-form-item v-if="editFlag" label="所属项目：" prop="device_space">
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
                  <p v-else ><span>所属项目：</span><span>case_name_1</span></p>
                </el-col>
                <el-col :span="12">
                  <p><span>指派人：</span><span>case_name_1</span></p>
                </el-col>
                <el-col :span="12">
                  <p><span>创建时间：</span><span>case_name_1</span></p>
                </el-col>
                <el-col :span="12">
                  <p><span>更新时间：</span><span>case_name_1</span></p>
                </el-col>
                <el-col :span="12">
                  <el-form-item v-if="editFlag" label="用例描述：">
                    <el-input
                      type="textarea"
                      v-model="taskInfo.device_desc"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                  <p  v-else ><span>任务描述：</span><span>case_name_1</span></p>
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
              <div v-else class="action-list-title">动作列表</div>
              <el-table
                width="100%"
                border
                :data="taskInfo.taskInfoTable"
                >
                <el-table-column
                  type="selection"
                  width="55">
                  <template slot-scope="scope">
                    <div class="func">
                      <el-checkbox @change="selectRow(scope.row)"></el-checkbox>
                      <div @click="drag(scope.row)">
                        <svg-icon data_iconName = 'icon-grab'></svg-icon>
                      </div>
                      <div @click="expand(scope.row)">
                        <svg-icon data_iconName = 'icon-start'></svg-icon>
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
                      :prop="'taskInfoTable.' + scope.$index + '.nodeName'"
                      :rules="rulesTaskInfo.taskInfoTable.name"
                      label-width="0px"
                    >
                      <span v-if="editFlag">
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
                      :prop="'taskInfoTable.' + scope.$index + '.loopTimes'"
                      :rules="rulesTaskInfo.taskInfoTable.hope_status_name"
                      label-width="0px"
                    >
                      <span v-if="editFlag">
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
                      :prop="'taskInfoTable.' + scope.$index + '.error'"
                      :rules="rulesTaskInfo.taskInfoTable.device_function"
                      label-width="0px"
                    >
                      <!-- <span> -->
                        <el-select  v-if="editFlag" v-model="selectVal" placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      <!-- </span> -->
                      <span v-else @click="tabDblClick(scope.row,scope.column)" > {{scope.row.loopTimes}} </span>
                    </el-form-item>
                  </template>
                </el-table-column>

                <el-table-column label="执行后等待">
                  <template slot-scope="scope">
                    <el-form-item

                      :prop="'taskInfoTable.' + scope.$index + '.executeWait'"
                      :rules="rulesTaskInfo.taskInfoTable.device_function"
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
                      <span v-else>{{scope.row.loopTimes}}</span>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column v-if="editFlag" label="操作" align="center" width="80">
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
              <!-- <el-row class="add-node">
                <el-col>
                  <el-button type="" @click="addCaseRow">
                    <i class="el-icon-plus"></i> 添加动作</el-button>
                </el-col>
              </el-row> -->
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CaseDetails',
  data() {
    return {
      crumbs: {
        action: true,
        details: true,
        name: 'case_name_1'
      },
      editFlag: false,
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
      taskInfo: {
        taskInfoTable: [
          {
            editNode: false,
            editLoop: false,
            nodeName: '节点名称1',
            loopTimes: 10,
            error: '123',
            overtime: 'asdasd',
            executeWait: 'aq2134'
          },
          {
            editNode: false,
            editLoop: false,
            nodeName: '节点名称2',
            loopTimes: 10,
            error: '123',
            overtime: 'asdasd',
            executeWait: 'aq2134'
          }
        ]
      },
      rulesTaskInfo: {
        taskInfoTable: {}
      }
    };
  },
  computed: {
  },
  watch: {
  },
  methods: {
    // 复制
    copy() {
      console.log('复制')
    },
    // 编辑
    edit() {
      this.editFlag = true
      console.log('编辑')
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
