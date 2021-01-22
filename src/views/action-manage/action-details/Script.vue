<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2021-01-22 10:22:08
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-01-22 13:51:59
-->
<template>
  <div class="new-voice">
    <Crumbs :crumbs='crumbs' @copy='copy' @edit='edit'></Crumbs>
    <div class="container">
      <div class="content">
        <div class="title">动作信息</div>
        <div class="formData">
          <el-row class="scriptInfo">
            <el-col :span="12">
              <p><span class='label'>动作名称：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>所属项目：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>动作类型：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>软件版本：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>创建人：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>超时时间：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>创建时间：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>更新时间：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>动作描述：</span><span>action_name_01</span></p>
            </el-col>
          </el-row>
          <div class="taskCase">
            <el-row class="text-title">
              <div >
                <p>脚本内容</p>
              </div>
            </el-row>
            <div class="editor">
              <codemirror
                ref="chartOption"
                v-model="generatedCode"
                :options="cmOptions"
                >
              </codemirror>
            </div>
          </div>
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
        details: true,
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
    // 复制
    copy() {},
    // 编辑
    edit() {}
  }
};
</script>

<style lang='less' scoped>
.new-voice {
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
      padding:0 20px 10px 20px;
      p{
        height: 30px;
        line-height: 30px;
        .label{
          text-align: right;
          width: 80px;
          display: inline-block;
        }
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
      }
    }
    .add-node{
      margin-top: 20px;
    }
  }

}
</style>
