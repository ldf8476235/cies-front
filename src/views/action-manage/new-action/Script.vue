<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-09 17:53:48
 * @LastEditors: wh
 * @Description: 
 * @LastEditTime: 2020-12-10 10:28:03
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
                  <el-form-item label="动作名称：" prop="device_name">
                    <el-input
                      :suffix-icon="loading ? 'el-icon-loading' : ''"
                      v-model.trim="scriptInfo.device_name"
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
                  <el-form-item label="软件版本：">
                    <el-input
                      v-model="scriptInfo.device_sn"
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                </el-col>
                
                <el-col :span="12">
                  <el-form-item label="用例描述：">
                    <el-input
                      type="textarea"
                      v-model="scriptInfo.device_desc"
                      placeholder="请输入"
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
                <CodeMirror 
                ref="cmEditor"
                :cmTheme="cmTheme"
                :cmMode="cmMode"
                :autoFormatJson="autoFormatJson"
                :jsonIndentation="jsonIndentation"
                :codeVal='generatedCode'
                ></CodeMirror>
              </div>
              
            </div>
          </el-form>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CodeMirror from '../../../components/codemirror/Codemirror.vue'
export default {
  name: 'NewScript',
  components: {CodeMirror},
  data() {
    return {
      crumbs:{
        action:true,
        name:'新建动作'
      },
      loading: false, //任务名称动态验证动画
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
      cmTheme: "base16-light", // codeMirror主题
      // codeMirror主题选项
      cmThemeOptions: [
          "default",
          "3024-day",
          "3024-night",
          "abcdef",
          "ambiance",
          "ayu-dark",
          "ayu-mirage",
          "base16-dark",
          "base16-light",
          "bespin",
          "blackboard",
          "cobalt",
          "colorforth",
          "darcula",
          "dracula",
          "duotone-dark",
          "duotone-light",
          "eclipse",
          "elegant",
          "erlang-dark",
          "gruvbox-dark",
          "hopscotch",
          "icecoder",
          "idea",
          "isotope",
          "lesser-dark",
          "liquibyte",
          "lucario",
          "material",
          "material-darker",
          "material-palenight",
          "material-ocean",
          "mbo",
          "mdn-like",
          "midnight",
          "monokai",
          "moxer",
          "neat",
          "neo",
          "night",
          "nord",
          "oceanic-next",
          "panda-syntax",
          "paraiso-dark",
          "paraiso-light",
          "pastel-on-dark",
          "railscasts",
          "rubyblue",
          "seti",
          "shadowfox",
          "solarized dark",
          "solarized light",
          "the-matrix",
          "tomorrow-night-bright",
          "tomorrow-night-eighties",
          "ttcn",
          "twilight",
          "vibrant-ink",
          "xq-dark",
          "xq-light",
          "yeti",
          "yonce",
          "zenburn"
      ],
      cmEditorMode: "default", // 编辑模式
      // 编辑模式选项
      cmEditorModeOptions: [
          "default",
          "json",
          "sql",
          "javascript",
          "css",
          "xml",
          "html",
          "yaml",
          "markdown",
          "python"
      ],
      cmMode: "python", //codeMirror模式
      jsonIndentation: 2, // json编辑模式下，json格式化缩进 支持字符或数字，最大不超过10，默认缩进2个空格
      autoFormatJson: true, // json编辑模式下，输入框失去焦点时是否自动格式化，true 开启， false 关闭
      generatedCode:'',
      selectVal: "", // 选中项
      tabClickIndex: "",
      scriptInfo: {
        scriptInfoTable: [
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
      rulesScriptInfo: {
        scriptInfoTable: {},
      }
    };
  },
  computed:{
  },
  watch:{
  },
  methods: {
    addCaseRow() {},
    save(){
      console.log('保存')
    }
  },
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
