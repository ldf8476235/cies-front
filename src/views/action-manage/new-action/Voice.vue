<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-09 17:53:14
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-01-19 11:25:19
-->
<template>
  <div class="new-voice">
    <Crumbs :crumbs='crumbs' @save='save'></Crumbs>
    <div class="container">
      <div class="content">
        <div class="title">动作信息</div>
        <div class="formData">
          <el-form
            ref="voiceInfo"
            :model="voiceInfo"
            :rules="rulesCaseInfo"
            label-width="100px"
          >
            <div class="voiceInfo">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="动作名称：" prop="actionName">
                    <el-input
                      :suffix-icon="loading ? 'el-icon-loading' : ''"
                      v-model.trim="voiceInfo.actionName"
                      placeholder="输入动作名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所属项目：" prop="actionProject">
                    <el-select v-model="voiceInfo.actionProject" placeholder="选择所属项目">
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
                  <el-form-item label="动作类型：">
                    语音输入
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="软件版本：" prop="actionVersion">
                    <el-input
                      v-model="voiceInfo.actionVersion"
                      placeholder="输入软件版本"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="语料库：" prop="actionCorpus">
                    <el-select v-model="voiceInfo.actionCorpus" placeholder="选择语料库">
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
                  <el-form-item label="超时时间：" prop="actionTimeout">
                    <el-input
                      v-model="voiceInfo.actionTimeout"
                      placeholder="输入超时时长"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="动作描述：" prop="actionDesc">
                    <el-input
                      type="textarea"
                      v-model="voiceInfo.actionDesc"
                      placeholder="输入动作描述"
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
                :data="voiceInfo.actionData"
                >
                <el-table-column
                  type="selection"
                  align="center"
                  width="80">
                </el-table-column>
                <el-table-column
                  type="index"
                  label="#"
                  align="center"
                  width="40">
                </el-table-column>
                <el-table-column label="语音名称"  width='180'>
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'actionData.' + scope.$index + '.voiceName'"
                      :rules="rulesCaseInfo.actionData.name"
                      label-width="0px"
                    >
                      <span v-if="scope.row.editNode">
                        <el-input
                          ref="inputBlur"
                          v-model="scope.row.voiceName"
                          placeholder=""
                          @blur="inputBlur(scope.row,scope.column)"
                        ></el-input>
                      </span>
                      <span v-else @click="tabDblClick(scope.row,scope.column)" > {{scope.row.voiceName}} </span>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="执行后等待">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'actionData.' + scope.$index + '.executeWait'"
                      :rules="rulesCaseInfo.actionData.device_function"
                      label-width="0px"
                    >
                      <!-- <el-select v-model="selectVal" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select> -->
                      <el-input
                          style="width:30%;"
                          ref="inputBlur"
                          v-model="scope.row.executeWait"
                          placeholder=""
                          @blur="inputBlur(scope.row,scope.column)"
                        ></el-input>
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
                  <el-button type="" @click="addVoiceRow">
                    <i class="el-icon-plus"></i> 添加语音
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
        }
      ],
      selectVal: '', // 选中项
      tabClickIndex: '',
      voiceInfo: {
        actionType: 1,
        actionData: [
          {
            voiceName: '节点名称1',
            executeWait: 'aq2134'
          },
          {
            voiceName: '节点名称2',
            executeWait: 'aq2134'
          }
        ]
      },
      rulesCaseInfo: {
        actionName: [
          { required: true, message: '请输入动作名称', trigger: 'blur' }
        ],
        actionProject: [
          { required: true, message: '请选择所属项目', trigger: 'blur' }
        ],
        actionVersion: [
          { required: true, message: '请输入软件版本', trigger: 'blur' }
        ],
        actionTimeout: [
          { required: true, message: '请输入超时时长', trigger: 'blur' }
        ],
        actionCorpus: [
          { required: true, message: '请选择语料库', trigger: 'blur' }
        ],
        actionDesc: [
          { required: true, message: '请输入动作描述', trigger: 'blur' }
        ],
        actionData: {}
      }
    };
  },
  computed: {
  },
  watch: {
  },
  methods: {
    inputBlur() {

    },
    // 修改语音名称
    tabDblClick() {},
    addVoiceRow() {},
    save() {
      this.$refs.voiceInfo.validate(valid => {
        if (!valid) return
        console.log('保存', this.voiceInfo)
        const url = 'action/add'
        this.$http.post(url, this.voiceInfo).then(res => {
          console.log(res)
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '添加动作成功！'
            })
            this.$router.push({
              path: '/action'
            })
          } else if (res.code === 2) {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
      })
    }
  }
};
</script>

<style lang='less' scoped>
.new-voice {
  .voiceInfo {

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
    .voiceInfo{
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
