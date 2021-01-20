<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-09 17:53:48
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-01-19 11:28:19
-->
<template>
  <div class="new-voice">
    <Crumbs :crumbs='crumbs' @save='save'></Crumbs>
    <div class="container">
      <div class="content">
        <div class="title">动作信息</div>
        <div class="formData">
          <el-form
            ref="scriptInfo"
            :model="scriptInfo"
            :rules="rulesScriptInfo"
            label-width="100px"
          >
            <div class="scriptInfo">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="动作名称：" prop="actionName">
                    <el-input
                      :suffix-icon="loading ? 'el-icon-loading' : ''"
                      v-model.trim="scriptInfo.actionName"
                      placeholder="输入动作名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所属项目：" prop="actionProject">
                    <el-select v-model="scriptInfo.actionProject" placeholder="选择所属项目">
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
                    命令脚本
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="软件版本：" prop='actionVersion'>
                    <el-input
                      v-model="scriptInfo.actionVersion"
                      placeholder="输入软件版本"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="超时时长：" prop='actionTimeout'>
                    <el-input
                      v-model="scriptInfo.actionTimeout"
                      placeholder="输入超时时长"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="动作描述：" prop='actionDesc'>
                    <el-input
                      type="textarea"
                      v-model="scriptInfo.actionDesc"
                      placeholder="输入动作描述"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="taskCase">
              <el-row class="text-title">
                <div >
                  <p>脚本内容</p>
                  <p>
                    <span>导入</span>
                    <span>导出</span>
                  </p>
                </div>
              </el-row>
              <div class="editor">
                <!-- <CodeMirror
                ref="cmEditor"
                :cmTheme="cmTheme"
                :cmMode="cmMode"
                :autoFormatJson="autoFormatJson"
                :jsonIndentation="jsonIndentation"
                :codeVal='generatedCode'
                ></CodeMirror> -->
                <codemirror
                  ref="chartOption"
                  v-model="generatedCode"
                  :options="cmOptions"
                  >
                </codemirror>
              </div>
            </div>
          </el-form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import CodeMirror from '../../../components/codemirror/Codemirror.vue'
import { codemirror } from 'vue-codemirror' // 引入组件
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css';
import 'codemirror/theme/base16-light.css'
import 'codemirror/mode/python/python.js';
export default {
  name: 'NewScript',
  components: { codemirror },
  data() {
    return {
      crumbs: {
        action: true,
        name: '新建动作'
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
      cmTheme: 'base16-light', // codeMirror主题
      cmMode: 'python', // codeMirror模式
      jsonIndentation: 2, // json编辑模式下，json格式化缩进 支持字符或数字，最大不超过10，默认缩进2个空格
      autoFormatJson: true, // json编辑模式下，输入框失去焦点时是否自动格式化，true 开启， false 关闭
      generatedCode: 'asda  ↵asd↵ad↵ad↵adq', // 输入代码
      cmOptions: {
        tabSize: 2, // Tab键空格数
        mode: 'python', // 模式
        theme: 'material', // 主题
        lineNumbers: true, // 是否显示行号
        line: true,
        extraKeys: { 'Ctrl': 'autocomplete' }, // 自定义快捷键
        autofocus: true,
        smartIndent: false,
        autocorrect: true,
        spellcheck: true,
        hintOptions: { // 自定义提示选项
          tables: {
            users: ['name', 'score', 'birthDate'],
            countries: ['name', 'population', 'size']
          }
        }
      },
      selectVal: '', // 选中项
      tabClickIndex: '',
      scriptInfo: {
        actionType: 2
      },
      rulesScriptInfo: {
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
        scriptInfoTable: {}
      },
      coder: null
    };
  },
  mounted() {
  },
  methods: {
    save() {
      this.$refs.scriptInfo.validate(valid => {
        if (!valid) return
        this.scriptInfo.actionScript = this.generatedCode
        console.log('保存', this.scriptInfo)
        const url = 'action/add'
        this.$http.post(url, this.scriptInfo).then(res => {
          console.log(res)
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '添加动作成功！'
            })
            this.$router.push({
              path: '/action'
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
  .scriptInfo {

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
    .scriptInfo{
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
        height: 42px;
        line-height: 42px;
        border-top: 1px solid #DDDDDD;
        border-bottom: 1px solid #DDDDDD;
        font-size: 12px;
        margin-bottom: 5px;
        // .del-color{
        //   color: #006CEB;
        // }
        div {
          display: flex;
          justify-content: space-between;
          span {
            padding: 0 5px;
            color: #006CEB;
          }
        }
      }
      .editor{
        .vue-codemirror{
          // width: 100px;
          /deep/ .CodeMirror-scroll {
            padding-bottom: 0px;
            overflow-x: hidden !important;
          }
        }
        /deep/ .CodeMirror-vscrollbar::-webkit-scrollbar{
          width:5px;
          height:5px;
          // color: red;
        }
        /*正常情况下滑块的样式*/
        /deep/ .CodeMirror-vscrollbar::-webkit-scrollbar-thumb{
          background-color:rgb(83,98,111);
          border-radius:10px;
          -webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,.1);
        }
        /*鼠标悬浮在该类指向的控件上时滑块的样式*/
        /deep/ .CodeMirror-vscrollbar:hover::-webkit-scrollbar-thumb{
          background-color:rgba(0,0,0,.2);
          border-radius:10px;
          -webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,.1);
        }
        /*鼠标悬浮在滑块上时滑块的样式*/
        /deep/ .CodeMirror-vscrollbar::-webkit-scrollbar-thumb:hover{
          background-color:rgba(0,0,0,.4);
          -webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,.1);
        }
        /*正常时候的主干部分*/
        /deep/ .CodeMirror-vscrollbar::-webkit-scrollbar-track{
          border-radius:10px;
          -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0);
          background-color: #fff;//rgb(38, 56, 73);
        }
        /*鼠标悬浮在滚动条上的主干部分*/
        /deep/ .CodeMirror-vscrollbar::-webkit-scrollbar-track:hover{
          -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.4);
          background-color:rgba(0,0,0,.01);
        }
      }
    }
    .add-node{
      margin-top: 20px;
    }
  }

}
</style>
