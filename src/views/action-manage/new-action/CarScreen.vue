<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-10 14:32:41
 * @LastEditors: wh
 * @Description: 
 * @LastEditTime: 2020-12-11 17:47:46
-->
<template>
  <div class="car-screen">
    <Crumbs :crumbs='crumbs'></Crumbs>
    <div class="container">
      <div class="content">
        <el-row :gutter="20" class="top">
          <el-col class="top-left" :span="6">
            <div class="gutter">
              <el-card class="">
                <div slot="header" class="clearfix">
                  <span>动作信息</span>
                </div>
                <div>
                  <el-form
                    ref="actionInfo"
                    :model="actionInfo"
                    :rules="rulesActionInfo"
                    label-width="100px"
                  >
                    <el-form-item label="任务名称：" prop="device_name">
                      <el-input
                        :suffix-icon="loading ? 'el-icon-loading' : ''"
                        v-model.trim="actionInfo.device_name"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="所属项目：" prop="device_space">
                      <el-select style="width:100%;" v-model="selectVal" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="软件版本：">
                      <el-input
                        v-model="actionInfo.device_sn"
                        placeholder=""
                      ></el-input>
                    </el-form-item>
                    
                    <el-form-item label="指派人：">
                      <el-input
                        v-model="actionInfo.device_sn"
                        placeholder=""
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="任务描述：">
                      <el-input
                        type="textarea"
                        v-model="actionInfo.device_desc"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col class="top-right" :span="18">
            <div class="gutter">
              <el-card class="">
                <div slot="header" class="clearfix">
                  <span>实时界面</span>
                </div>
                <div>
                  阿松大
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="bottom">
          <el-col class="bottom-left" :span="18">
            <div class="gutter">
              <el-card class="box-card-bottom">
                <div slot="header" class="action-bottom">
                  <p>
                    <span @click="tab(0)" :class="tabFlag === 0 ?'active' : ''">动作序列</span>
                    <span @click="tab(1)" :class="tabFlag === 1 ?'active' : ''">元素结构</span>
                  </p>
                  
                  <div class="action-btn">
                    <el-dropdown split-button type="">
                      链接设备
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <el-button type="">导出</el-button>
                    <el-button type="">清空</el-button>
                    <el-button type="">预览</el-button>
                  </div>
                </div>
                <div class="action-sequence-content">
                  <div v-if="tabFlag === 0">
                    <div class="row" v-for=" item1 in 3" :key="item1">
                      <div class="action-item" v-for=" item in 10" :key="item" :class="item === 10 ? 'row-wrap' : ''">
                        <!-- 奇数行 -->
                        <div class="click-icon" v-if="item1 % 2 === 1">
                          <span>Home</span>
                          <p>
                            <img src="../../../assets/iconpng/icon-gesture.png" alt="">
                          </p>
                          <span class=" el-icon-circle-close red"></span>
                        </div>
                        <div class="point-to" v-if="item1 % 2 === 1">
                          <span :class="item === 10 ? 'el-icon-bottom' : 'el-icon-right' "></span>
                        </div>
                        <!-- 偶数行 -->
                        <div class="point-to" v-if="item !== 10 && item1 % 2 === 0">
                          <span :class="item === 10 ? 'el-icon-bottom' : 'el-icon-back' "></span>
                        </div>
                        <div class="click-icon" v-if="item1 % 2 === 0">
                          <span>Home</span>
                          <p>
                              <svg-icon data_iconName="icon-gesture" className="icon-gesture"/>
                          </p>
                          <span class="el-icon-circle-close red"></span>
                        </div>
                        <div class="point-to" v-if="item === 10 && item1 % 2 === 0">
                          <span :class="item === 10 ? 'el-icon-bottom' : 'icon-jiantou-you' "></span>
                        </div>
                      </div>
                      <!-- <div class="action-item" v-if="item1 % 2 === 0" v-for=" item in 10" :key="item" :class="item === 10 ? 'row-wrap' : ''">
                        <div class="point-to" v-if="item !== 10">
                          <span :class="item === 10 ? 'el-icon-bottom' : 'el-icon-back' "></span>
                        </div>
                        <div class="click-icon">
                          <span>Home</span>
                          <p>
                              <svg-icon data_iconName="icon-gesture" className="icon-gesture"/>
                          </p>
                          <span class="el-icon-circle-close red"></span>
                        </div>
                        <div class="point-to" v-if="item === 10">
                          <span :class="item === 10 ? 'el-icon-bottom' : 'icon-jiantou-you' "></span>
                        </div>
                      </div> -->
                    </div>
                  </div>
                  <div v-else>
                    <v-jstree :data="jsTreeData">
                        <template slot-scope="scope">
                          <div style="" 
                            @click.exact="itemClick(scope.model)"
                            >
                            <i :class="scope.model.icon" role="presentation"></i>
                            {{scope.model.text}}
                          </div>
                        </template>
                    </v-jstree>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col class="bottom-right" :span="6">
            <div class="gutter">
              <el-card class="box-card-top">
                <div slot="header" class="clearfix">
                  <span>脚本</span>
                </div>
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
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import CodeMirror from '../../../components/codemirror/Codemirror.vue'
export default {
  name: 'CarScreen',
  components: {CodeMirror},
  data() {
    return {
      crumbs:{
        action:true,
        name:'新建动作'
      },
      loading:false,
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
      actionInfo:{},
      rulesActionInfo:{},
      tabFlag:0,
      options:[],
      selectVal:''

    };
  },
  computed:{
  },
  watch:{
  },
  methods: {
    // 元素节点点击事件
    itemClick(a,b){
      console.log('元素节点',a,b)
    },
    // 动作/元素结构切换
    tab(i){
      console.log(i)
      this.tabFlag = i
    },
  },
};
</script>

<style lang='less' scoped>
.car-screen{
  /deep/ .el-card__header{
      padding: 5px 10px 5px 10px;
    }
    /deep/ .el-card__body {
      padding: 5px 10px;
    }
  .top {
    
    margin-bottom: 10px;
    
  }
  .bottom {
    .bottom-left {
      .box-card-bottom {
        .action-bottom{
          display: flex;
          justify-content: space-between;
          p{
            span {
              padding:0 5px;
              box-sizing: border-box;
              cursor: pointer;
            }
            .active{
              display: inline-block;
              height: 33px;
              line-height: 33px;
              color: #006CEB;
              border-bottom: 2px solid #006CEB;
            }
          }
          .el-dropdown{
            margin-right: 10px;
          }
        }
        .action-sequence-content{
          height: 206px;
          overflow-y: auto;
          .row{
            display: flex;
            justify-content: center;
            .row-wrap {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
          }
          .row:nth-child(even){
            flex-direction: row-reverse;
          }
          .action-item{
            display: flex;
            align-items: center;
            .click-icon{
              width: 46px;
              text-align: center;
              
              span{
                font-size: 12px;
                color: #9B9B9B;
              }
              .red{
                color: #D0021B;
              }
              p {
                width: 46px;
                height: 46px;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #DBDBDB;
                text-align: center;
                line-height: 46px;
                border-radius: 5px;
                span{
                  font-size: 24px;
                  color: #9B9B9B;
                }
              }
            }
            .point-to{
              width: 40px;
              display: flex;
              justify-content: center;
              // text-align: center;
              // width: 30px;
            }
          }
        }
        /deep/ .action-sequence-content::-webkit-scrollbar{
            width:5px;
            height:5px;
            // color: red;
          }
          /*正常情况下滑块的样式*/
         /deep/ .action-sequence-content::-webkit-scrollbar-thumb{
            background-color:rgb(83,98,111);
            border-radius:10px;
            -webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,.1);
          }
          /*鼠标悬浮在该类指向的控件上时滑块的样式*/
         /deep/ .action-sequence-content:hover::-webkit-scrollbar-thumb{
            background-color:rgba(0,0,0,.2);
            border-radius:10px;
            -webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,.1);
          }
          /*鼠标悬浮在滑块上时滑块的样式*/
         /deep/ .action-sequence-content::-webkit-scrollbar-thumb:hover{
            background-color:rgba(0,0,0,.4);
            -webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,.1);
          }
          /*正常时候的主干部分*/
         /deep/ .action-sequence-content::-webkit-scrollbar-track{
            border-radius:10px;
            -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0);
            background-color: #fff;//rgb(38, 56, 73);
          }
          /*鼠标悬浮在滚动条上的主干部分*/
          /deep/ .action-sequence-content::-webkit-scrollbar-track:hover{
            -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.4);
            background-color:rgba(0,0,0,.01);
          }
      }
    }
    .bottom-right {
      .box-card-top {
        overflow: hidden;
        .editor{
          height: 220px;
          .vue-codemirror{
            /deep/ .CodeMirror-scroll {
              padding-bottom: 0px;
              width: 100%;
              height: 80%;
              overflow-x: hidden !important;
            }
          }
          /deep/ .CodeMirror-vscrollbar {
            overflow: hidden;
          }
          /deep/ .CodeMirror-sizer{
            // border: none;
          }
        //   /deep/ .CodeMirror-scroll::-webkit-scrollbar{
        //     width:5px;
        //     height:5px;
        //     // color: red;
        //   }
        //   /*正常情况下滑块的样式*/
        //  /deep/ .CodeMirror-scroll::-webkit-scrollbar-thumb{
        //     background-color:rgb(83,98,111);
        //     border-radius:10px;
        //     -webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,.1);
        //   }
        //   /*鼠标悬浮在该类指向的控件上时滑块的样式*/
        //  /deep/ .CodeMirror-scroll:hover::-webkit-scrollbar-thumb{
        //     background-color:rgba(0,0,0,.2);
        //     border-radius:10px;
        //     -webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,.1);
        //   }
        //   /*鼠标悬浮在滑块上时滑块的样式*/
        //  /deep/ .CodeMirror-scroll::-webkit-scrollbar-thumb:hover{
        //     background-color:rgba(0,0,0,.4);
        //     -webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,.1);
        //   }
        //   /*正常时候的主干部分*/
        //  /deep/ .CodeMirror-scroll::-webkit-scrollbar-track{
        //     border-radius:10px;
        //     -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0);
        //     background-color: #fff;//rgb(38, 56, 73);
        //   }
        //   /*鼠标悬浮在滚动条上的主干部分*/
        //   /deep/ .CodeMirror-scroll::-webkit-scrollbar-track:hover{
        //     -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.4);
        //     background-color:rgba(0,0,0,.01);
        //   }
        }
      }
    }
  }
  .gutter{
    background: #ccc;
  }

}
</style>
