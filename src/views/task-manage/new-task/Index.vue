<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-01 13:49:42
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2020-12-15 15:41:25
-->
<template>
  <div class="newTask">
    <!-- <div class="crumbs">
      <p><i class="el-icon-back"></i> <span>新建任务</span></p>
      <el-button type="primary">保存</el-button>
    </div> -->
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
              <el-row class="text-title">
                <p>
                  已选择 <span> 1 </span>个节点<span> 2 </span>用例
                  <span class="del-color">删除</span>
                </p>
              </el-row>
              <el-table
                width="100%"
                border
                ref="refTable"
                row-key="nodeName"
                :tree-props="{children: 'children'}"
                :data="taskInfo.taskInfoTable"
                >
                <el-table-column
                  width="100">
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
                <!-- <el-table-column type="expand" width="1">
                  <template>
                    <div class="demo-table-expand">
                      <el-table
                        :data='taskInfo.taskInfoTable[0].children'
                        :show-header='false'
                        border
                      >
                        <el-table-column prop="nodeName">

                        </el-table-column>
                        <el-table-column prop="loopTimes">

                        </el-table-column>
                        <el-table-column prop="error">

                        </el-table-column>
                      </el-table>
                    </div>
                  </template>
                </el-table-column> -->
                <el-table-column label="用例组">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'taskInfoTable.' + scope.$index + '.nodeName'"
                      :rules="rulesTaskInfo.taskInfoTable.name"
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
                <el-table-column label="用例">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'taskInfoTable.' + scope.$index + '.nodeName'"
                      :rules="rulesTaskInfo.taskInfoTable.name"
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
                      :prop="'taskInfoTable.' + scope.$index + '.loopTimes'"
                      :rules="rulesTaskInfo.taskInfoTable.hope_status_name"
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
                      :prop="'taskInfoTable.' + scope.$index + '.error'"
                      :rules="rulesTaskInfo.taskInfoTable.device_function"
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
                      :prop="'taskInfoTable.' + scope.$index + '.executeWait'"
                      :rules="rulesTaskInfo.taskInfoTable.device_function"
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
              <el-row class="add-node">
                <el-col>
                  <el-button type="" @click="addNodeRow">
                    <i class="el-icon-plus"></i> 添加用例组
                  </el-button>
                  <el-button type="" @click="addNodeRow">
                    <i class="el-icon-plus"></i> 添加用例
                  </el-button>
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
  name: 'NewTask',
  data() {
    return {
      crumbs: {
        action: true,
        name: '新建任务'
      },
      loading: true, // 任务名称动态验证动画
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
            loopTimes: 11,
            error: '123',
            overtime: 'asdasd',
            executeWait: 'aq2134',
            children: [{
              editNode: false,
              editLoop: false,
              nodeName: '子节点名称1',
              loopTimes: 11,
              error: '123',
              overtime: 'asdasd',
              executeWait: 'aq2134'
            }]
          },

          {
            editNode: false,
            editLoop: false,
            nodeName: '节点名称2',
            loopTimes: 12,
            error: '123',
            overtime: 'asdasd',
            executeWait: 'aq2134'
          },
          {
            editNode: false,
            editLoop: false,
            nodeName: '节点名称3',
            loopTimes: 13,
            error: '123',
            overtime: 'asdasd',
            executeWait: 'aq2134'
          },
          {
            editNode: false,
            editLoop: false,
            nodeName: '节点名称4',
            loopTimes: 14,
            error: '123',
            overtime: 'asdasd',
            executeWait: 'aq2134'
          }
        ]
      },
      rulesTaskInfo: {
        taskInfoTable: {}
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 拖动
    drag() {
      console.log('拖动')
    },
    // 显示行
    // showTr(row, index) {
    //   let show = (row._parent ? (row._parent._expanded && row._parent._show) : true)
    //   row._show = show
    //   return show ? '' : 'display:none;'
    // },
    // 展开
    expand(row) {
      console.log(row)
      this.$refs.refTable.toggleRowExpansion(row)

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
        const upDate = this.taskInfo.taskInfoTable[index];
        this.taskInfo.taskInfoTable.unshift(upDate)
        this.taskInfo.taskInfoTable.splice(index + 1, 1);
      }
    },
    // 移动至底部
    downMove(index) {

      const len = this.taskInfo.taskInfoTable.length - 1
      if (index === len) {
        this.$message({
          message: '处于最低部，不能继续下移',
          type: 'warning'
        });
      } else {
        console.log(index)
        const upDate = this.taskInfo.taskInfoTable[index];
        this.taskInfo.taskInfoTable.splice(index, 1);
        this.taskInfo.taskInfoTable.push(upDate)

      }
    },
    // 添加节点
    addNodeRow() {},
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
    save() {
      console.log(this.taskInfo)
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
      .el-table {
        .func {
          display: flex;
          align-content: center;
        }
      }
     /deep/.el-table__expand-icon{
        display: none;
      }

    }
    .add-node{
      margin-top: 20px;
    }
  }

}

</style>
