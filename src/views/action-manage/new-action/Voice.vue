<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-09 17:53:14
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-02-04 16:00:15
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
                  <el-form-item label="动作名称：" prop="name">
                    <el-input
                      :suffix-icon="loading ? 'el-icon-loading' : ''"
                      v-model.trim="voiceInfo.name"
                      placeholder="输入动作名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所属项目：" prop="project">
                    <!-- <el-select v-model="voiceInfo.project" placeholder="选择所属项目">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select> -->
                    <el-input
                      :suffix-icon="loading ? 'el-icon-loading' : ''"
                      v-model.trim="voiceInfo.project"
                      placeholder="输入所属项目"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="动作类型：">
                    语音输入
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="软件版本：" prop="version">
                    <el-input
                      v-model="voiceInfo.version"
                      placeholder="输入软件版本"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="语料库：" prop="corpus">
                    <el-select v-model="voiceInfo.corpus" placeholder="选择语料库">
                      <el-option
                        v-for="item in corpusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="超时时间：" prop="timeout">
                    <el-input
                      v-model="voiceInfo.timeout"
                      placeholder="输入超时时长"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="动作描述：" prop="desc">
                    <el-input
                      type="textarea"
                      v-model="voiceInfo.desc"
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
               class="borderTop"
                :data="voiceInfo.settings"
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
                      :prop="'settings.' + scope.$index + '.voiceName'"
                      :rules="rulesCaseInfo.settings.name"
                      label-width="0px"
                    >
                      <!-- <span v-if="scope.row.editNode">
                        <el-input
                          ref="inputBlur"
                          v-model="scope.row.voiceName"
                          placeholder=""
                          @blur="inputBlur(scope.row,scope.column)"
                        ></el-input>
                      </span> -->
                      <span > {{scope.row.name}} </span>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="执行后等待">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'settings.' + scope.$index + '.executeWait'"
                      :rules="rulesCaseInfo.settings.device_function"
                      label-width="0px"
                      >
                      <!-- <el-input
                          style="width:30%;"
                          ref="inputBlur"
                          v-model="scope.row.executeWait"
                          placeholder=""
                          @blur="inputBlur(scope.row,scope.column)"
                        ></el-input> -->
                        1
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="80">
                  <template slot-scope="scope">
                    <el-popover
                      placement="bottom"
                      width="100"
                      trigger="click">
                      <p @click="insertVoice(scope.row)">
                        <svg-icon data_iconName="icon-plus" className="icon-gesture"/>
                        <span>插入语音</span>
                      </p>
                      <p @click='del(scope.$index)'><svg-icon data_iconName="icon-delete" className="icon-gesture"/><span>删除</span></p>
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
          <Dialog ref='dialog' :title='title' @confirm='confirm'>
            <el-table slot='voice' :data="voiceList">
              <el-table-column label="" align="center" width="30">
                <template slot-scope="scope">
                  <el-radio @change="radioItem(scope.row)" v-model="radio" :label="scope.row.uid">{{''}}</el-radio>
                </template>
              </el-table-column>
              <el-table-column property="" label="序号" width="50" type="index"></el-table-column>
              <el-table-column property="file_name" label="语料名称"></el-table-column>
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
import { GET, POST } from '@/utils/api.js';
import Dialog from '@/components/config-dialog/Dialog.vue';
export default {
  name: 'NewVoice',
  components: {
    Dialog
  },
  data() {
    return {
      crumbs: {
        action: true,
        name: '新建动作'
      },
      title: '语音列表',
      total: 0,
      pageSize: 10,
      currPage: 1,
      loading: false, // 任务名称动态验证动画
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
        type: 'Voice',
        corpus: 'corpus',
        executeWait: '10',
        settings: [
        ]
      },
      rulesCaseInfo: {
        name: [
          { required: true, message: '请输入动作名称', trigger: 'blur' }
        ],
        project: [
          { required: true, message: '请选择所属项目', trigger: 'blur' }
        ],
        version: [
          { required: true, message: '请输入软件版本', trigger: 'blur' }
        ],
        timeout: [
          { required: true, message: '请输入超时时长', trigger: 'blur' }
        ],
        corpus: [
          { required: true, message: '请选择语料库', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入动作描述', trigger: 'blur' }
        ],
        settings: {}
      },
      corpusList: [// 语料库
        {
          label: 'corpus',
          value: 'corpus'
        }
      ],
      voiceList: [ // 语音列表

      ],
      radio: '',
      radioData: { // 选择语音的数据

      }
    };
  },
  mounted() {
    this.getVoiceList(this.currPage, this.pageSize)
    const uid = this.$route.query.uid
    if (uid) {
      this.getEditData()
    }
  },
  methods: {
    // 删除语音
    del(index) {
      this.voiceInfo.settings.splice(index, 1)
    },
    // 获取编辑的数据
    getEditData() {
      const uid = this.$route.query.uid
      const url = `action/detail/?uid=${uid}`
      GET(url).then(res => {
        console.log(res)
        this.voiceInfo = res.result[0]
        this.crumbs.name = this.voiceInfo.name
      })
    },
    // 获取语音列表
    getVoiceList(page, size) {
      const url = `/settings/list/?page=${page}&count=${size}`
      GET(url).then(res => {
        this.voiceList = res.result
        this.total = res.count
      })
    },
    inputBlur() {

    },
    // 选择语音
    radioItem(row) {
      console.log(row)
      this.radioData = row
    },
    addVoiceRow() {
      this.$refs.dialog.dialogTableVisible = true
      this.insertIndex = this.voiceInfo.settings.length
    },
    // 插入语音
    insertVoice() {

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
        uid: this.radioData.uid,
        name: this.radioData.file_name,
        type: this.radioData.type,
        timeout: 0,
        executeWait: '10'
      }
      this.voiceInfo.settings.splice(this.insertIndex + 1, 0, data)
      this.radio = ''
    },
    save() {
      this.$refs.voiceInfo.validate(valid => {
        if (!valid) return

        let url = 'action/add'
        let methods = 'POST'
        const uid = this.$route.query.uid

        if (uid) {
          methods = 'PUT'
          url = 'action/edit'
        } else {
          this.voiceInfo.builder = 'voiceAdmin'
        }
        const arr = this.voiceInfo.settings.map(item => {
          return item.uid ? item.uid : item
        })
        this.voiceInfo.settings = arr
        console.log('保存', this.voiceInfo)
        POST(url, methods, this.voiceInfo).then(res => {
          this.$hintMsg('success', '添加动作成功！')
          this.$router.push('/action')
        }).catch(err => {
          this.$hintMsg('error', err)
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
