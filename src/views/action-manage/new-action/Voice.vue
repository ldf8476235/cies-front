<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-09 17:53:14
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2020-12-10 10:00:49
-->
<template>
  <div class="new-voice">
    <Crumbs :crumbs='crumbs' @save='save'></Crumbs>
    <div class="container">
      <div class="content">
        <div class="title">动作信息</div>
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
                  <el-form-item label="动作名称：" prop="device_name">
                    <el-input
                      :suffix-icon="loading ? 'el-icon-loading' : ''"
                      v-model.trim="caseInfo.device_name"
                      placeholder="请输入"
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
                  <el-form-item label="语料库：" prop="device_space">
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
                  <el-form-item label="软件版本：">
                    <el-input
                      v-model="caseInfo.device_sn"
                      placeholder=""
                    ></el-input>
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
                >
                <el-table-column
                  type="selection"
                  align="center"
                  width="55">
                </el-table-column>
                <el-table-column
                  type="index"
                  label="#"
                  align="center"
                  width="40">
                </el-table-column>
                <el-table-column label="语音名称">
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
                        <span>插入语音</span>
                      </p>
                      <p><svg-icon data_iconName="icon-delete" className="icon-gesture"/><span>删除</span></p>
                      <el-button slot="reference"><i  class="el-icon-more"></i></el-button>
                    </el-popover>
                  </template>
                </el-table-column>
              </el-table>
              <el-row class="add-node">
                <el-col>
                  <el-button type="" @click="addCaseRow">
                    <i class="el-icon-plus"></i> 添加语音</el-button>
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
  name: 'NewVoice',
  data() {
    return {
      crumbs: {
        action: true,
        name: '新建动作'
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
      caseInfo: {
        caseInfoTable: [
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
      rulesCaseInfo: {
        caseInfoTable: {}
      }
    };
  },
  computed: {
  },
  watch: {
  },
  methods: {
    addCaseRow() {},
    save() {
      console.log('保存')
    }
  }
};
</script>

<style lang='less' scoped>
.new-voice {
  .caseInfo {

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
        margin-bottom: 5px;
        .del-color{
          color: #006CEB;
        }
      }
    }
    .add-node{
      margin-top: 20px;
    }
  }

}
</style>
