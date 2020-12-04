<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-02 17:15:48
 * @LastEditors: wh
 * @Description: 
 * @LastEditTime: 2020-12-04 17:40:56
-->
<template>
  <div class="new-action">
    <Crumbs :crumbs='crumbs' @save='save'></Crumbs>
    <div class="container">
      <div class="content">
        <el-row :gutter="20">
          <el-col class="left" :span="18">
            <div class="gutter">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="gutter">
                    <el-card class="box-card-top">
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
                <el-col :span="12">
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
                          ></CodeMirror>
                      </div>
                    </el-card>
                  </div>
                </el-col>
                <el-col class="action-list" :span="24">
                  <div class="gutter">
                    <el-card class="box-card-bottom">
                      <div slot="header" class="action-bottom">
                        <span>动作序列</span>
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
                      <div v-for="o in 4" :key="o" class="text item">
                        {{'列表内容 ' + o }}
                      </div>
                    </el-card>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col class="right" :span="6">
            <div class="gutter">
              <el-card class="box-card-right">
                <div slot="header" class="clearfix">
                  <span>实时界面</span>
                </div>
                <div class="screen" id="screen">
                  <!-- <img src="../../../assets/images/test.png" alt=""> -->
                  <canvas id="bgCanvas" class="canvas-bg" :style="canvasStyle"></canvas>
                </div>
                <div class="screenBottomBtn">
                  <el-button>Power</el-button>
                  <el-button>Power</el-button>
                  <el-button>Power</el-button>
                  <el-button>Power</el-button>
                  <el-button>Power</el-button>
                  <el-button>Power</el-button>
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
import Crumbs from '../../../components/crumbs/Crumbs.vue';
import CodeMirror from '../../../components/codemirror/Codemirror.vue'
import { b64toBlob, ImagePool} from "@/utils/common.js";
export default {
  components: { Crumbs ,CodeMirror},
  name: 'NewAction',
  data() {
    return {
      crumbs:{
        action:true,
        name:'新建动作'
      },
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
      selectVal: "", // 选中项
      tabClickIndex: "",
      actionInfo:{},
      rulesActionInfo:{},
      canvasStyle: { //画布内联style
        opacity: 1,
        width: 'inherit',
        height: 'inherit'
      },
      canvas: {   // 画布
        bg: null,
        fg: null,
      },
      lastScreenSize: {
        screen: {},
        canvas: {
          width: 1,
          height: 1
        }
      }

    };
  },
  created(){
    this.imagePool = new ImagePool(100);
  },
  mounted(){
    this.canvas.bg = document.querySelector('#bgCanvas')
    this.$axios.get('/api/v1/version').then(res => {
      console.log(res)
    })
    this.deviceId = 'android:'
    this.getCurrentScreen()

    window.onresize = () => {
      this.resizeScreen()
    }
    
    // this.$axios.get('/api/v2/devices/' + encodeURIComponent(this.deviceId || '-') + '/hierarchy').then(res => {
    //   console.log(res)
    // })
  },
  computed:{
  },
  watch:{
  },
  methods: {
    // 检测版本
    // 获取当前屏幕截图
    getCurrentScreen(){
      this.$axios.get('/api/v1/devices/' + encodeURIComponent(this.deviceId || '-') + '/screenshot').then(res => {
        console.log(res)
        console.log('screenRefresh----:',res)
        var blob = b64toBlob(res.data, 'image/' + res.type);
        this.drawBlobImageToScreen(blob);
        localStorage.setItem('screenshotBase64', res.data);
      }).catch(err => {
        console.log('err:',err)
      })
    },
    // 绘制当前屏幕
    drawBlobImageToScreen (blob) {
      
      console.log('drawBlobImageToScreen----',blob)
      // Support jQuery Promise
      // var dtd = $.Deferred();
      // console.log(this.canvas.bg)
      var bgcanvas = this.canvas.bg,
        // fgcanvas = this.canvas.fg,
        ctx = bgcanvas.getContext('2d'),
        self = this,
        URL = window.URL || window.webkitURL,
        BLANK_IMG = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        img = this.imagePool.next();
      img.onload = function () {
        // fgcanvas.width = bgcanvas.width = img.width
        // fgcanvas.height = bgcanvas.height = img.height
        bgcanvas.width = img.width
        bgcanvas.height = img.height
        // img.height = 500
        // img.width = 290
        console.log(img.width, img.height)
        // var screenDiv = document.getElementById('screen');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        self.resizeScreen(img);

        // Try to forcefully clean everything to get rid of memory
        // leaks. Note self despite this effort, Chrome will still
        // leak huge amounts of memory when the developer tools are
        // open, probably to save the resources for inspection. When
        // the developer tools are closed no memory is leaked.
        // img.onload = img.onerror = null
        // img.src = BLANK_IMG
        // img = null
        // blob = null
        console.log('------',img)
        // URL.revokeObjectURL(url)
        // url = null
        // dtd.resolve();
      }

      img.onerror = function () {
        // Happily ignore. I suppose this shouldn't happen, but sometimes it does, presumably when we're loading images too quickly.
        // Do the same cleanup here as in onload.
        img.onload = img.onerror = null
        img.src = BLANK_IMG
        img = null
        blob = null
        console.log('error')
        URL.revokeObjectURL(url)
        url = null
        // dtd.reject();
      }
      console.log(blob)
      var url = URL.createObjectURL(blob)
      img.src = url;
      // return dtd;
    },
    // wh-可视区域尺寸变化
    resizeScreen(img) {
      
      // check if need update
      if (img) {
        if (this.lastScreenSize.canvas.width == img.width &&
          this.lastScreenSize.canvas.height == img.height) {
          return;
        }
      } else {
        img = this.lastScreenSize.canvas;
        if (!img) {
          return;
        }
      }
      var screenDiv = document.getElementById('screen');
      this.lastScreenSize = {
        canvas: {
          width: img.width,
          height: img.height
        },
        screen: {
          width: screenDiv.clientWidth,
          height: screenDiv.clientHeight,
        }
      }
      var canvasRatio = img.width / img.height;
      var screenRatio = screenDiv.clientWidth / screenDiv.clientHeight;
      console.log('sssssssssssssssss',canvasRatio,screenRatio)
      if (canvasRatio > screenRatio) {
        Object.assign(this.canvasStyle, {
          width: Math.floor(screenDiv.clientWidth) + 'px', //'100%',
          height: Math.floor(screenDiv.clientWidth / canvasRatio) + 'px', // 'inherit',
        })
      } else {
        Object.assign(this.canvasStyle, {
          width: Math.floor(screenDiv.clientHeight * canvasRatio) + 'px', //'inherit',
          height: Math.floor(screenDiv.clientHeight) + 'px', //'100%',
        })
      }
    },
    save(){
      console.log('保存')
    }
  },
};
</script>

<style lang='less' scoped>
.new-action {
  // height: 100%;
  // overflow: hidden;
  // .action-content{
    .left{
      .el-card {
        overflow-y: auto;
        .clearfix:before,
        .clearfix:after {
          display: table;
          content: "";
        }
        .clearfix:after {
          clear: both
        }
        .action-btn{
          
          
        }
        
      }
      .box-card-top {
        height: 355px;
        overflow: hidden;
        .editor{
          .vue-codemirror{
            // width: 100px;
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
      .box-card-bottom {
        // height: 230px;
        .action-bottom{
          display: flex;
          justify-content: space-between;
          .el-dropdown{
            margin-right: 10px;
          }
        }
      }
      .action-list {
        margin-top: 20px;
      }
    }
    .right{
      .box-card-right {
        // height: 605px;
        .screen{
          // width: 100%;
          // height: 500px;
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          flex: 1;
          background-color: gray;
          .canvas-bg {
            // z-index: 0;
            // position:absolute;
          }
          img{
            width: 100%;
            height: 500px;
          }
        }
        .screenBottomBtn{
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          .el-button{
            margin-left: 0;
            margin-right: 10px;
            margin-bottom: 10px;
          }
        }
      }
    }
    
    
    .gutter {
      // background: #ccc;
    }
  // }
  
}
</style>
