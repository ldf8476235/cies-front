<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-01 13:49:42
 * @LastEditors: wh
 * @Description: 
 * @LastEditTime: 2020-12-02 17:20:32
-->
<template>
  <div class="newTask">
    <div class="crumbs">
      <p><i class="el-icon-back"></i> <span>新建任务</span></p>
      <el-button type="primary">保存</el-button>
    </div>
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
                  <el-form-item label="任务名称：" prop="device_name">
                    <el-input
                      :suffix-icon="loading ? 'el-icon-loading' : ''"
                      v-model.trim="taskInfo.device_name"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="软件版本：">
                    <el-input
                      v-model="taskInfo.device_sn"
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
                  <el-form-item label="指派人：">
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
                  <el-form-item label="任务描述：">
                    <el-input
                      type="textarea"
                      v-model="taskInfo.device_desc"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="taskCase">
              <el-row class="text_title">
                <p>
                  已选择 <span> 1 </span>个节点<span> 2 </span>用例
                  <span>删除</span>
                </p>
              </el-row>
              <el-table
                width="100%"
                border
                :data="taskInfo.caseInfoTable"
              >
              <!-- @cell-click="tabClick" -->
                <!-- @cell-dblclick="tabDblClick" -->
                <el-table-column label="节点名称">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'caseInfoTable.' + scope.$index + '.nodeName'"
                      :rules="rulesTaskInfo.caseInfoTable.name"
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
                      :rules="rulesTaskInfo.caseInfoTable.hope_status_name"
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
                      :rules="rulesTaskInfo.caseInfoTable.device_function"
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
                <el-table-column label="超时处理">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'caseInfoTable.' + scope.$index + '.overtime'"
                      :rules="rulesTaskInfo.caseInfoTable.device_function"
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
                      <!-- <span> {{scope.row.overtime}} </span> -->
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="执行后等待">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'caseInfoTable.' + scope.$index + '.executeWait'"
                      :rules="rulesTaskInfo.caseInfoTable.device_function"
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
                    <!-- <span @click="showFuncBtn(scope.row)">···</span> -->
                    <el-popover
                      placement="bottom"
                      width="100"
                      trigger="click">
                      <p @click="showFuncBtn(scope.row)"><i class="el-icon-plus"></i><span>插入用例</span></p>
                      <p><i class="el-icon-plus"></i><span>替换用例</span></p>
                      <p><i class="el-icon-plus"></i><span>配置环境</span></p>
                      <p><i class="el-icon-plus"></i><span>移动到顶部</span></p>
                      <p><i class="el-icon-plus"></i><span>移动到底部</span></p>
                      <p><i class="el-icon-plus"></i><span>删除</span></p>
                      <el-button slot="reference"><i  class="el-icon-more"></i></el-button>
                    </el-popover>
                  </template>
                </el-table-column>
              </el-table>
              <el-row class="add-node">
                <el-col>
                  <el-button type="" @click="addNodeRow">
                    <i class="el-icon-plus"></i> 添加节点</el-button>
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
export default {
  name: "NewTask",
  data() {
    return {
      loading: true, //任务名称动态验证动画
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      selectVal: "", // 选中项
      tabClickIndex: "",
      taskInfo: {
        caseInfoTable: [
          {
            editNode:false,
            editLoop:false,
            nodeName: "节点名称1",
            loopTimes: 10,
            error: "123",
            overtime:'asdasd',
            executeWait:'aq2134'
          },
          {
            editNode:false,
            editLoop:false,
            nodeName: "节点名称2",
            loopTimes: 10,
            error: "123",
            overtime:'asdasd',
            executeWait:'aq2134'
          },
        ],
      },
      rulesTaskInfo: {
        caseInfoTable: {},
      },
    };
  },
  // 局部自定义指令
  // directives: {
  //   focus: {
  //     // 指令的定义
  //     inserted: function (el) {
  //       el.focus()
  //     }
  //   }
  // },
  computed: {},
  watch: {},
  methods: {
    // 展示操作按钮
    showFuncBtn(row){
      console.log(row)
    },
    // 添加节点
    addNodeRow() {},
    // 单击
    tabClick(row,column){
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
      console.log(row,column)
      switch (column.label) {
        case '节点名称':
          row.editNode = true;
          this.$nextTick(()=> {
            this.$refs.inputBlur.focus()
          })
          
          break
        case '循环次数':
          row.editLoop = true;
          this.$nextTick(()=> {
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
    inputBlur(row,column) {
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
  },
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
      
    }
    .add-node{
      margin-top: 20px;
    }
  }
  
}

</style>
