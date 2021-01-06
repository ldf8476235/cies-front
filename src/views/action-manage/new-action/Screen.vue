<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-02 17:15:48
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-01-06 13:41:37
-->
<template>
  <div class="new-screen">
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
                          <el-form-item label="任务名称：" prop="actionName">
                            <el-input
                              :suffix-icon="loading ? 'el-icon-loading' : ''"
                              v-model.trim="actionInfo.actionName"
                              placeholder="请输入"
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="动作类型：">
                            <!-- <el-input
                              v-model="actionInfo.actionType"
                              placeholder=""
                            ></el-input> -->
                            <span>屏幕操作</span>
                          </el-form-item>
                          <el-form-item label="所属项目：" prop="actionProject ">
                            <el-select style="width:100%;" v-model="actionInfo.actionProject " placeholder="请选择">
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
                              v-model="actionInfo.actionVersion"
                              placeholder=""
                            ></el-input>
                          </el-form-item>


                          <el-form-item label="超时时长：">
                            <el-input
                              v-model="actionInfo.actionTimeout"
                              placeholder=""
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="任务描述：">
                            <el-input
                              type="textarea"
                              v-model="actionInfo.actionDesc"
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
                          :codeVal='generatedCode'
                          ></CodeMirror>
                      </div>
                    </el-card>
                  </div>
                </el-col>
                <el-col class="action-list" :span="24">
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
                          <div class="row" v-for=" (item,index) in actionSequence" :key="index">
                            <!-- 奇数行 -->
                            <div
                              v-if="index % 2 === 0"
                              :class="cindex === 9 ? 'row-wrap' : 'action-item'"
                              v-for="(citem,cindex) in item"
                              :key='cindex'>
                              <div class="click-icon">
                                <span>{{citem.name}}</span>
                                <el-popover
                                  placement="top-start"
                                  title="属性"
                                  width="220"
                                  trigger="click"
                                 >
                                 <el-row style='padding-bottom:10px;'>
                                  <el-col>
                                    <el-row>
                                      <el-col :span='10' style='text-align:end;letter-spacing:2px;'><span>名称：</span></el-col>
                                      <el-col :span='14'>
                                        <span>{{citem.name}}</span>
                                      </el-col>
                                    </el-row>

                                  </el-col>
                                  <el-col>
                                    <el-row>
                                      <el-col :span='10' style='text-align:end;letter-spacing:2px;'><span>类型：</span></el-col>
                                      <el-col :span='14'>
                                        <span>{{citem.name}}</span>
                                      </el-col>
                                    </el-row>
                                  </el-col>
                                  <el-col>
                                    <el-row>
                                      <el-col :span='10' style='text-align:end;letter-spacing:2px;'><span>文本：</span></el-col>
                                      <el-col :span='14'>
                                        <span>{{citem.name}}</span>
                                      </el-col>
                                    </el-row>
                                  </el-col>
                                  <el-col>
                                    <el-row>
                                      <el-col :span='10' style='text-align:end;letter-spacing:2px;'><span>图片：</span></el-col>
                                      <el-col :span='14'>
                                        <span>{{citem.name}}</span>
                                      </el-col>
                                    </el-row>
                                  </el-col>
                                  <el-col>
                                    <el-row>
                                      <el-col :span='10' style='text-align:end;letter-spacing:2px;'><span>区域：</span></el-col>
                                      <el-col :span='14'>
                                        <span>{{citem.name}}</span>
                                      </el-col>
                                    </el-row>
                                  </el-col>
                                  <el-col>
                                    <el-row>
                                      <el-col :span='10' style='text-align:end;letter-spacing:2px;'><span>动作：</span></el-col>
                                      <el-col :span='14'>
                                        <span>{{citem.name}}</span>
                                      </el-col>
                                    </el-row>
                                  </el-col>
                                  <el-col>
                                    <el-row>
                                      <el-col :span='10' style='text-align:end;letter-spacing:2px;'><span>执行后等待：</span></el-col>
                                      <el-col :span='14'>
                                        <span>{{citem.name}}</span>
                                      </el-col>
                                    </el-row>
                                  </el-col>
                                  <el-col>
                                    <el-row>
                                      <el-col :span='10' style='text-align:end;letter-spacing:2px;'><span>参数：</span></el-col>
                                      <el-col :span='14'>
                                        <span>{{citem.name}}</span>
                                      </el-col>
                                    </el-row>
                                  </el-col>
                                 </el-row>
                                  <el-button slot="reference" type=''>
                                    <svg-icon data_iconName="icon-gesture" className="icon-gesture"/>
                                  </el-button>
                                </el-popover>
                                <span class="el-icon-circle-close red"></span>
                              </div>
                              <div class="point-to">
                                <span :class="cindex === 9 ? 'el-icon-bottom' : 'el-icon-right'"></span>
                              </div>
                            </div>
                            <!-- 偶数行 -->
                            <div
                              v-if="index % 2 === 1"
                              :class="cindex === 9 ? 'row-wrap' : 'action-item'"
                              v-for="(citem,cindex) in item"
                              :key='cindex'>
                              <div class="point-to" v-if="cindex !== 9">
                                <span class="el-icon-back"></span>
                              </div>
                              <div class="click-icon">
                                <span>{{citem.name}}</span>
                                <el-popover
                                  placement="top-start"
                                  title="属性"
                                  width="220"
                                  trigger="click"
                                 >
                                 <el-row style='padding-bottom:10px;'>
                                  <el-col>
                                    <el-row>
                                      <el-col :span='10' style='text-align:end;letter-spacing:2px;'><span>名称：</span></el-col>
                                      <el-col :span='14'>
                                        <span>{{citem.name}}</span>
                                      </el-col>
                                    </el-row>
                                  </el-col>
                                  <el-col>
                                    <el-row>
                                      <el-col :span='10' style='text-align:end;letter-spacing:2px;'><span>类型：</span></el-col>
                                      <el-col :span='14'>
                                        <span>{{citem.name}}</span>
                                      </el-col>
                                    </el-row>
                                  </el-col>
                                  <el-col>
                                    <el-row>
                                      <el-col :span='10' style='text-align:end;letter-spacing:2px;'><span>文本：</span></el-col>
                                      <el-col :span='14'>
                                        <span>{{citem.name}}</span>
                                      </el-col>
                                    </el-row>
                                  </el-col>
                                  <el-col>
                                    <el-row>
                                      <el-col :span='10' style='text-align:end;letter-spacing:2px;'><span>图片：</span></el-col>
                                      <el-col :span='14'>
                                        <span>{{citem.name}}</span>
                                      </el-col>
                                    </el-row>
                                  </el-col>
                                  <el-col>
                                    <el-row>
                                      <el-col :span='10' style='text-align:end;letter-spacing:2px;'><span>区域：</span></el-col>
                                      <el-col :span='14'>
                                        <span>{{citem.name}}</span>
                                      </el-col>
                                    </el-row>
                                  </el-col>
                                  <el-col>
                                    <el-row>
                                      <el-col :span='10' style='text-align:end;letter-spacing:2px;'><span>动作：</span></el-col>
                                      <el-col :span='14'>
                                        <span>{{citem.name}}</span>
                                      </el-col>
                                    </el-row>
                                  </el-col>
                                  <el-col>
                                    <el-row>
                                      <el-col :span='10' style='text-align:end;letter-spacing:2px;'><span>执行后等待：</span></el-col>
                                      <el-col :span='14'>
                                        <span>{{citem.name}}</span>
                                      </el-col>
                                    </el-row>
                                  </el-col>
                                  <el-col>
                                    <el-row>
                                      <el-col :span='10' style='text-align:end;letter-spacing:2px;'><span>参数：</span></el-col>
                                      <el-col :span='14'>
                                        <span>{{citem.name}}</span>
                                      </el-col>
                                    </el-row>
                                  </el-col>
                                 </el-row>
                                  <el-button slot="reference" type=''>
                                    <svg-icon data_iconName="icon-gesture" className="icon-gesture"/>
                                  </el-button>
                                </el-popover>
                                <span class="el-icon-circle-close red"></span>
                              </div>
                              <div class="point-to" v-if="cindex === 9">
                                <span :class="cindex === 9 ? 'el-icon-bottom' : 'icon-jiantou-you' "></span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-else>
                          <v-jstree :data="jsTreeData">
                              <template slot-scope="scope">
                                <div
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
              </el-row>
            </div>
          </el-col>
          <el-col class="right" :span="6">
            <div class="gutter">
              <el-card v-click-outside="onClickOutside" class="box-card-right">
                <div slot="header" class="clearfix">
                  <span>实时界面</span>
                </div>
                <div class="screen" id="screen" ref="screen">
                  <canvas id="fgCanvas" class="canvas-fg" :style="canvasStyle"></canvas>
                  <canvas id="bgCanvas" class="canvas-bg" :style="canvasStyle"></canvas>
                  <span class="finger finger-0" style="transform: translate3d(200px, 100px, 0px)"></span>
                </div>
                <div class="screenBottomBtn">
                  <el-button>Power</el-button>
                  <el-button>Home</el-button>
                  <el-button>Back</el-button>
                  <el-button>Menu</el-button>
                  <el-button>Volume+</el-button>
                  <el-button>Volume-</el-button>
                </div>
              </el-card>
              <div class='mobile-btn'  v-show='mobileBtn'>
                <el-button>Tap Widget</el-button>
                <el-button>Tap</el-button>
                <el-button>Send Keys</el-button>
                <el-button>LongPress</el-button>
                <el-button>ScrollWidget</el-button>
                <el-button>Swipe</el-button>
                <el-button>Sleep</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import CodeMirror from '../../../components/codemirror/Codemirror.vue'
import VJstree from 'vue-jstree'
import { b64toBlob, ImagePool, copyToClipboard } from '@/utils/common.js';
export default {

  name: 'NewScreen',
  components: { CodeMirror, VJstree },
  data() {
    return {
      crumbs: {
        action: true,
        name: '新建动作'
      },
      cmTheme: 'base16-light', // codeMirror主题
      // codeMirror主题选项
      cmThemeOptions: [
        'default',
        '3024-day',
        '3024-night',
        'abcdef',
        'ambiance',
        'ayu-dark',
        'ayu-mirage',
        'base16-dark',
        'base16-light',
        'bespin',
        'blackboard',
        'cobalt',
        'colorforth',
        'darcula',
        'dracula',
        'duotone-dark',
        'duotone-light',
        'eclipse',
        'elegant',
        'erlang-dark',
        'gruvbox-dark',
        'hopscotch',
        'icecoder',
        'idea',
        'isotope',
        'lesser-dark',
        'liquibyte',
        'lucario',
        'material',
        'material-darker',
        'material-palenight',
        'material-ocean',
        'mbo',
        'mdn-like',
        'midnight',
        'monokai',
        'moxer',
        'neat',
        'neo',
        'night',
        'nord',
        'oceanic-next',
        'panda-syntax',
        'paraiso-dark',
        'paraiso-light',
        'pastel-on-dark',
        'railscasts',
        'rubyblue',
        'seti',
        'shadowfox',
        'solarized dark',
        'solarized light',
        'the-matrix',
        'tomorrow-night-bright',
        'tomorrow-night-eighties',
        'ttcn',
        'twilight',
        'vibrant-ink',
        'xq-dark',
        'xq-light',
        'yeti',
        'yonce',
        'zenburn'
      ],
      cmEditorMode: 'default', // 编辑模式
      // 编辑模式选项
      cmEditorModeOptions: [
        'default',
        'json',
        'sql',
        'javascript',
        'css',
        'xml',
        'html',
        'yaml',
        'markdown',
        'python'
      ],
      cmMode: 'python', // codeMirror模式
      jsonIndentation: 2, // json编辑模式下，json格式化缩进 支持字符或数字，最大不超过10，默认缩进2个空格
      autoFormatJson: true, // json编辑模式下，输入框失去焦点时是否自动格式化，true 开启， false 关闭
      generatedCode: '',
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
      selectVal: '', // 选中项
      tabClickIndex: '',
      actionInfo: {
        actionType: 'screen'
      },
      rulesActionInfo: {},
      canvasStyle: { // 画布内联style
        opacity: 1,
        width: 'inherit',
        height: 'inherit'
      },
      canvas: { // 画布
        bg: null,
        fg: null
      },
      lastScreenSize: {
        screen: {},
        canvas: {
          width: 1,
          height: 1
        }
      },
      cursor: {},
      tabFlag: 0,
      jsTreeData: [], // 树形节点对象
      actionSequence: [
        [
          {
            name: 'name',
            type: 'type',
            text: 'text',
            picture: 'picture',
            area: 'area',
            action: 'action',
            exectuteWait: '',
            params: 'params'
          },
          {
            name: 'name2',
            type: 'type2',
            text: 'text2',
            picture: 'picture2',
            area: 'area2',
            action: 'action2',
            exectuteWait: '',
            params: 'params2'
          }
        ]
      ],
      autoCopy: true,
      mobileBtn: false
    };
  },
  created() {
    this.imagePool = new ImagePool(100);
  },
  mounted() {
    this.canvas.bg = document.querySelector('#bgCanvas')
    this.canvas.fg = document.querySelector('#fgCanvas')

    this.deviceId = 'android:'
    this.checkVersion()
    this.getCurrentScreen()
    this.doConnect()
    this.activeMouseControl()

    // window.onresize = () => {
    //   this.resizeScreen()
    // }
  },
  destroyed() {
    this.screenWebSocket && this.screenWebSocket.close()
  },
  computed: {
    nodes: {
      // cache:false,//控制计算属性缓存
      get: function() {
        return this.originNodes
      }

    }
  },
  methods: {
    // 点击按钮外部区域，隐藏元素
    onClickOutside() {
      this.mobileBtn = false;
    },
    // 处理动作序列数据
    disposeActionSequence() {
      const arr = []

    },
    // 元素节点点击事件
    itemClick(a, b) {
      console.log('元素节点', a, b)
    },
    // 动作/元素结构切换
    tab(i) {
      this.tabFlag = i
    },
    // wh-检查版本
    checkVersion: function() {
      this.$axios.get('/api/v1/version').then(res => {
        this.version = res.version;
        // var lastScreenshotBase64 = localStorage.screenshotBase64;
        // if (lastScreenshotBase64) {
        //   var blob = b64toBlob(lastScreenshotBase64, 'image/jpeg');
        //   this.drawBlobImageToScreen(blob);
        //   this.canvasStyle.opacity = 1.0;
        // }
        // if (localStorage.jsonHierarchy) {
        //   let source = JSON.parse(localStorage.jsonHierarchy);
        //   this.drawAllNodeFromSource(source);
        //   this.loading = false;
        //   this.canvasStyle.opacity = 1.0;
        // }
      })
    },
    // 获取当前屏幕截图
    getCurrentScreen() {
      this.$axios.get('/api/v1/devices/' + encodeURIComponent(this.deviceId || '-') + '/screenshot').then(res => {
        var blob = b64toBlob(res.data, 'image/' + res.type);
        this.drawBlobImageToScreen(blob);
        this.dumpHierarchy().then(this.loadLiveScreen)
        localStorage.setItem('screenshotBase64', res.data);
      }).catch(err => {
        console.log('err:', err)
      })
    },
    // wh-连接手机
    doConnect() {
      const params = `platform=${'Android'}&deviceUrl=${''}`
      this.$axios.post('/api/v1/connect', params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then(res => {

        this.deviceId = res.deviceId
        this.screenWebSocketUrl = res.screenWebSocketUrl
        console.log(this.screenWebSocketUrl)
      }).catch(err => {
        console.log('err', err)
      })
    },
    // 绘制当前屏幕
    drawBlobImageToScreen(blob) {
      // Support jQuery Promise
      // var dtd = $.Deferred();
      var bgcanvas = this.canvas.bg;
      var fgcanvas = this.canvas.fg;
      var ctx = bgcanvas.getContext('2d');
      var self = this;
      var URL = window.URL || window.webkitURL;
      var BLANK_IMG = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
      var img = this.imagePool.next()
      img.onload = function() {
        fgcanvas.width = bgcanvas.width = img.width
        fgcanvas.height = bgcanvas.height = img.height
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
        // URL.revokeObjectURL(url)
        // url = null
        // dtd.resolve();
      }

      img.onerror = function() {
        // Happily ignore. I suppose this shouldn't happen, but sometimes it does, presumably when we're loading images too quickly.
        // Do the same cleanup here as in onload.
        img.onload = img.onerror = null
        img.src = BLANK_IMG
        img = null
        blob = null
        URL.revokeObjectURL(url)
        url = null
        // dtd.reject();
      }
      var url = URL.createObjectURL(blob)
      img.src = url;
      // return dtd;
    },
    // wh-获取安卓屏幕结构
    dumpHierarchy() { // v2
      return this.$axios.get('/api/v2/devices/' + encodeURIComponent(this.deviceId || '-') + '/hierarchy').then(res => {
        localStorage.setItem('xmlHierarchy', res.xmlHierarchy);
        localStorage.setItem('jsonHierarchy', JSON.stringify(res.jsonHierarchy));
        localStorage.setItem('activity', res.activity);
        localStorage.setItem('packageName', res.packageName);
        localStorage.setItem('windowSize', res.windowSize);
        this.activity = res.activity; // only for android
        this.packageName = res.packageName;
        this.drawAllNodeFromSource(res.jsonHierarchy);
        this.nodeSelected = null;
      })
    },
    // wh-绘制所有安卓屏幕所有节点
    drawAllNodeFromSource(source) {
      const nodeMaps = this.originNodeMaps = {}
      function sourceToNodes(source) {
        const node = Object.assign({}, source); //, { children: undefined });
        nodeMaps[node._id] = node;
        let nodes = [node];
        if (source.children) {
          source.children.forEach(function(s) {
            s._parentId = node._id;
            nodes = nodes.concat(sourceToNodes(s))
          })
        }
        return nodes;
      }
      this.originNodes = sourceToNodes(source) // res.nodes;
      const jsTreeData = this.sourceToJstree(source)
      this.jsTreeData = [jsTreeData]
      this.drawAllNode();
      this.canvasStyle.opacity = 1.0;
    },
    // 绘制所有节点-黑色虚线框
    drawAllNode() {
      var self = this;
      var canvas = self.canvas.fg;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      self.originNodes.forEach(function(node) {
        // ignore some types
        if (['Layout'].includes(node.type)) {
          return;
        }
        self.drawNode(node, 'black', true);
      })
    },
    // wh-绘制app位置边框
    drawNode(node, color, dashed) {
      if (!node || !node.rect) {
        return;
      }
      var x = node.rect.x;
      var y = node.rect.y;
      var w = node.rect.width;
      var h = node.rect.height;
      color = color || 'black';
      var ctx = this.canvas.fg.getContext('2d');
      var rectangle = new Path2D();
      rectangle.rect(x, y, w, h);
      if (dashed) {
        ctx.lineWidth = 5;
        ctx.setLineDash([8, 10]); // 设置虚线 实现部分与虚线部分 8-10-8-10 循环
      } else {
        ctx.lineWidth = 5;
        ctx.setLineDash([]);
      }
      ctx.strokeStyle = color;
      ctx.stroke(rectangle);
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
      // this.$nextTick(() => {
      var screenDiv = this.$refs.screen // document.getElementById('screen');
      this.lastScreenSize = {
        canvas: {
          width: img.width,
          height: img.height
        },
        screen: {
          width: screenDiv.clientWidth,
          height: screenDiv.clientHeight
        }
      }
      var canvasRatio = img.width / img.height;
      // var screenRatio = screenDiv.clientWidth / screenDiv.clientHeight;
      Object.assign(this.canvasStyle, {
        width: Math.floor(screenDiv.clientHeight * canvasRatio) + 'px', // 'inherit',
        height: Math.floor(screenDiv.clientHeight) + 'px' // '100%',
      })
      // })


      // if (canvasRatio > screenRatio) {
      //   Object.assign(this.canvasStyle, {
      //     width: Math.floor(screenDiv.clientWidth) + 'px', //'100%',
      //     height: Math.floor(screenDiv.clientWidth / canvasRatio) + 'px', // 'inherit',
      //   })
      // } else {
      //   // Object.assign(this.canvasStyle, {
      //   //   width: Math.floor(screenDiv.clientHeight * canvasRatio) + 'px', //'inherit',
      //   //   height: Math.floor(screenDiv.clientHeight) + 'px', //'100%',
      //   // })
      // }
    },
    drawRefresh() {
      this.drawAllNode()
      if (this.nodeHovered) {
        this.drawNode(this.nodeHovered, '#ff8901')
      }
      if (this.nodeSelected) {
        this.drawNode(this.nodeSelected, 'red')
      }
    },
    findNodesByPosition(pos) {
      function isInside(node, x, y) {
        if (!node.rect) {
          return false;
        }
        var lx = node.rect.x;
        var ly = node.rect.y;
        var rx = node.rect.width + lx;
        var ry = node.rect.height + ly;
        return lx < x && x < rx && ly < y && y < ry;
      }

      function nodeArea(node) {
        return node.rect.width * node.rect.height;
      }
      // if (this.originNodes) {
      const activeNodes = this.originNodes.filter(function(node) {
        if (!isInside(node, pos.x, pos.y)) {
          return false;
        }
        // skip some types
        if (['Layout', 'Sprite'].includes(node.type)) {
          return false;
        }
        return true;
      })

      activeNodes.sort((node1, node2) => {
        return nodeArea(node1) - nodeArea(node2)
      })
      return activeNodes;
      // }

    },
    drawHoverNode(pos) {
      const hoveredNodes = this.findNodesByPosition(pos);
      const node = hoveredNodes[0];
      this.nodeHovered = node;

      hoveredNodes.forEach((node) => {
        this.drawNode(node, 'green')
      })
      this.drawNode(this.nodeHovered, 'blue');
    },
    findNodes(kwargs) {
      return this.originNodes.filter((node) => {
        for (const [k, v] of Object.entries(kwargs)) {
          if (node[k] !== v) {
            return false;
          }
        }
        return true
      })
    },
    generateNodeSelectorKwargs(node) {
      // iOS: name, label, className
      // Android: text, description, resourceId, className
      const kwargs = {};
      ['label', 'resourceId', 'name', 'text', 'type', 'tag', 'description', 'className'].some((key) => {
        if (!node[key]) {
          return false;
        }
        kwargs[key] = node[key];
        return this.findNodes(kwargs).length === 1
      });

      const matchedNodes = this.findNodes(kwargs);
      const nodeCount = matchedNodes.length
      if (nodeCount > 1) {
        kwargs['instance'] = matchedNodes.findIndex((n) => {
          return n._id == node._id
        })
      }
      kwargs['_count'] = nodeCount
      return kwargs;
    },
    _combineKeyValue(key, value) {
      if (typeof value === 'string') {
        value = `"${value}"`
      }
      return key + '=' + value;
    },
    // 生成节点选择器
    generateNodeSelectorCode(node) {
      if (this.useXPathOnly) {
        return `d.xpath('${this.elemXPathLite}')`
      }
      const kwargs = this.generateNodeSelectorKwargs(node)
      if (kwargs._count === 1) {
        const array = [];
        for (const [key, value] of Object.entries(kwargs)) {
          if (key.startsWith('_')) {
            continue;
          }
          array.push(this._combineKeyValue(key, value))
        }
        return `d(${array.join(', ')})`
      }
      return `d.xpath('${this.elemXPathLite}')`
    },
    loadLiveHierarchy() {
      // 选中后不在实时计算元素(app)边框
      if (this.nodeHovered || this.nodeSelected) {
        console.log('进入判断')
        setTimeout(this.loadLiveHierarchy, 500)
        return
      }
      this.dumpHierarchy()
        .then(() => {
          this.loadLiveHierarchy()
        })
    },
    loadLiveScreen() {
      var self = this;
      var BLANK_IMG =
        'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
      // var protocol = location.protocol == 'http:' ? 'ws://' : 'wss://'
      var ws = new WebSocket(this.screenWebSocketUrl);
      var canvas = document.getElementById('bgCanvas')
      var ctx = canvas.getContext('2d');

      self.loadLiveHierarchy() // 计算手机app所有元素的黑色框
      this.screenWebSocket = ws;
      ws.onopen = function(ev) {
        console.log('screen websocket connected')
      };
      ws.onmessage = function(message) {
        var blob = new Blob([message.data], {
          type: 'image/jpeg'
        })
        var img = self.imagePool.next();
        img.onload = function() {
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0, img.width, img.height);
          self.resizeScreen(img);

          // Try to forcefully clean everything to get rid of memory
          // leaks. Note self despite this effort, Chrome will still
          // leak huge amounts of memory when the developer tools are
          // open, probably to save the resources for inspection. When
          // the developer tools are closed no memory is leaked.
          img.onload = img.onerror = null
          img.src = BLANK_IMG
          img = null
          blob = null

          URL.revokeObjectURL(url)
          url = null
        }

        img.onerror = function() {
          // Happily ignore. I suppose this shouldn't happen, but
          // sometimes it does, presumably when we're loading images
          // too quickly.

          // Do the same cleanup here as in onload.
          img.onload = img.onerror = null
          img.src = BLANK_IMG
          img = null
          blob = null

          URL.revokeObjectURL(url)
          url = null
        }
        var url = URL.createObjectURL(blob)
        img.src = url;
      }

      ws.onclose = (ev) => {
        this.liveScreen = false;
      }
    },
    // 源节点转换成树形节点对象
    sourceToJstree(source) {
      var n = {}
      n.id = source._id;
      n.text = source._type
      if (source.name) {
        n.text += ' - ' + source.name;
      }
      if (source.resourceId) {
        n.text += ' - ' + source.resourceId;
      }
      n.icon = this.sourceTypeIcon(source.type);
      if (source.children) {
        n.children = []
        source.children.forEach((s) => {
          n.children.push(this.sourceToJstree(s))
        })
      }

      return n
    },
    sourceTypeIcon(widgetType) {
      switch (widgetType) {
        case 'Scene':
          return 'glyphicon glyphicon-tree-conifer'
        case 'Layer':
          return 'glyphicon glyphicon-equalizer'
        case 'Camera':
          return 'glyphicon glyphicon-facetime-video'
        case 'Node':
          return 'glyphicon glyphicon-leaf'
        case 'ImageView':
          return 'glyphicon glyphicon-picture'
        case 'Button':
          return 'glyphicon glyphicon-inbox'
        case 'Layout':
          return 'glyphicon glyphicon-tasks'
        case 'Text':
          return 'glyphicon glyphicon-text-size'
        default:
          return 'el-icon-s-promotion'
      }
    },
    // wh-鼠标移动，点击事件
    activeMouseControl() {
      console.log('鼠标事件监控')
      var self = this;
      var element = this.canvas.fg;

      var screen = {
        bounds: {}
      }
      // wh-计算界限
      function calculateBounds() {
        var el = element;
        screen.bounds.w = el.offsetWidth
        screen.bounds.h = el.offsetHeight
        screen.bounds.x = 0
        screen.bounds.y = 0

        while (el.offsetParent) {
          screen.bounds.x += el.offsetLeft
          screen.bounds.y += el.offsetTop
          el = el.offsetParent
        }
      }
      // 模拟手机点击图像
      function activeFinger(index, x, y, pressure) {
        // var scale = 0.5 + pressure
        // $(".finger-" + index)
        //   .addClass("active")
        //   .css("transform", 'translate3d(' + x + 'px,' + y + 'px,0)')
      }

      function deactiveFinger(index) {
        // $(".finger-" + index).removeClass("active")
      }

      function mouseMoveListener(event) {
        var e = event
        if (e.originalEvent) {
          e = e.originalEvent
        }
        // Skip secondary click
        if (e.which === 3) {
          return
        }
        e.preventDefault()

        var pressure = 0.5
        activeFinger(0, e.pageX, e.pageY, pressure);
        // that.touchMove(0, x / screen.bounds.w, y / screen.bounds.h, pressure);
      }

      function mouseHoverLeaveListener(event) {
        self.nodeHovered = null;
        self.drawRefresh()
      }

      function mouseUpListener(event) {
        console.log('鼠标抬起')
        var e = event
        if (e.originalEvent) {
          e = e.originalEvent
        }
        // Skip secondary click
        if (e.which === 3) {
          return
        }
        e.preventDefault()

        var pos = coord(e);
        // change precision
        pos.px = Math.floor(pos.px * 1000) / 1000;
        pos.py = Math.floor(pos.py * 1000) / 1000;
        pos.x = Math.floor(pos.px * element.width);
        pos.y = Math.floor(pos.py * element.height);
        self.cursor = pos;

        self.nodeHovered = null;
        markPosition(self.cursor)

        stopMousing()
      }

      function stopMousing() {
        element.removeEventListener('mousemove', mouseMoveListener);
        element.addEventListener('mousemove', mouseHoverListener);
        element.addEventListener('mouseleave', mouseHoverLeaveListener);
        document.removeEventListener('mouseup', mouseUpListener);
        deactiveFinger(0);
      }

      function coord(event) {
        var e = event;
        if (e.originalEvent) {
          e = e.originalEvent
        }
        calculateBounds()
        var x = e.pageX - screen.bounds.x
        var y = e.pageY - screen.bounds.y
        var px = x / screen.bounds.w;
        var py = y / screen.bounds.h;
        return {
          px: px,
          py: py,
          x: Math.floor(px * element.width),
          y: Math.floor(py * element.height)
        }
      }
      // 鼠标hover事件
      function mouseHoverListener(event) {
        var e = event;
        if (e.originalEvent) {
          e = e.originalEvent
        }
        // Skip secondary click
        if (e.which === 3) {
          return
        }
        e.preventDefault()
        // var x = e.pageX - screen.bounds.x
        // var y = e.pageY - screen.bounds.y
        var pos = coord(event);
        self.nodeHoveredList = self.findNodesByPosition(pos);
        self.nodeHovered = self.nodeHoveredList[0];
        self.drawRefresh()
        if (self.cursor.px) {
          markPosition(self.cursor)
        }
      }

      function contextMenuListener(event) {
        event.preventDefault()
        self.getCurrentScreen()
      }
      // 鼠标按下
      function mouseDownListener(event) {
        console.log('鼠标按下')
        var e = event;
        // var pos = coord(event);
        if (e.originalEvent) {
          e = e.originalEvent
        }
        // Skip secondary click
        if (e.which === 3) {
          return
        }
        self.mobileBtn = true
        e.preventDefault()

        // fakePinch = e.altKey
        calculateBounds()

        // var x = e.pageX - screen.bounds.x
        // var y = e.pageY - screen.bounds.y
        var pressure = 0.5
        activeFinger(0, e.pageX, e.pageY, pressure);

        if (self.nodeHovered) {
          self.nodeSelected = self.nodeHovered;

          self.drawAllNode();
          // self.drawHoverNode(pos);
          self.drawNode(self.nodeSelected, 'red');
          var generatedCode = self.generateNodeSelectorCode(self.nodeSelected);
          if (self.autoCopy) {
            copyToClipboard(generatedCode);
          }
          self.generatedCode = generatedCode;
          // document.getElementById(self.nodeHovered._id).scrollIntoView(false);
        }
        // self.touchDown(0, x / screen.bounds.w, y / screen.bounds.h, pressure);
        element.removeEventListener('mouseleave', mouseHoverLeaveListener);
        element.removeEventListener('mousemove', mouseHoverListener);
        element.addEventListener('mousemove', mouseMoveListener);
        document.addEventListener('mouseup', mouseUpListener);
      }
      // 标志点击的元素的圆点
      function markPosition(pos) {
        var ctx = self.canvas.fg.getContext('2d');
        ctx.fillStyle = '#ff8901' // '#ff0000'; // red
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 12, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fill()

        ctx.fillStyle = '#fff'; // white
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 8, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fill();
      }

      /* bind listeners */
      element.addEventListener('contextmenu', contextMenuListener);
      element.addEventListener('mousedown', mouseDownListener);
      element.addEventListener('mousemove', mouseHoverListener);
      element.addEventListener('mouseleave', mouseHoverLeaveListener);
    },
    save() {
      console.log('保存', this.actionInfo)
    }
  }
};
</script>

<style lang='less' scoped>
.new-screen {
  // height: 100%;
  // overflow: hidden;
  // .action-content{
    /deep/ .el-card__header{
      padding: 5px 10px 0px 10px;
    }
    /deep/ .el-card__body {
      padding: 5px;
    }
    span {
      font-size: 12px;
    }
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
        height: 330px;
        overflow: hidden;
        .editor{
          .vue-codemirror{
            // width: 100px;
            /deep/ .CodeMirror-scroll {
              padding-bottom: 0px;
              width: 100%;
              height: 93%;
              overflow-x: hidden !important;
            }
          }
          /deep/ .CodeMirror-vscrollbar {
            overflow: hidden;
          }
          /deep/ .CodeMirror-sizer{
            // border: none;
          }
        }
      }
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
          height: 165px;
          overflow-y: auto;
          .row{
            width: 830px;
            display: flex;
            margin: 0 auto;
            // justify-content: center;
            // align-items: flex-start;
            .row-wrap {
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-top:12px;
            }
          }
          .row:nth-child(even){
            flex-direction: row-reverse;
          }
          .row-content{
            display: flex;
          }
          .action-item{
            display: flex;
            align-items: center;
          }
          .click-icon{
              display: flex;
              flex-direction: column;
              align-items: center;
              .property{
                width: 150px;
              }
              span{
                font-size: 12px;
                color: #9B9B9B;
              }
              .red{
                color: #D0021B;
              }
              // p {
              //   width: 46px;
              //   height: 46px;
              //   display: flex;
              //   justify-content: center;
              //   align-items: center;
              //   border: 1px solid #DBDBDB;
              //   text-align: center;
              //   line-height: 46px;
              //   border-radius: 5px;
              //   span{
              //     font-size: 24px;
              //     color: #9B9B9B;
              //   }
              // }
            }
            .point-to{
              width: 30px;
              display: flex;
              justify-content: center;
              // flex-wrap: wrap;
              // text-align: center;
              // width: 30px;
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
      .action-list {
        margin-top: 20px;
      }
    }
    .right{
      position: relative;
      .box-card-right {
        // height: 605px;
       /deep/ .el-card__body{
          padding: 10px;
        }
        .screen{
          // width: 100%;
          height: 390px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          flex: 1;
          background-color: gray;
          .canvas-fg {
            z-index: 1;
            position: absolute;
          }

          .canvas-bg {
            z-index: 0;
            position: absolute;
          }
        }
        .screenBottomBtn{
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          .el-button{
            width: 80px;
            margin-left: 0;
            margin-right: 10px;
            margin-bottom: 10px;
          }
        }
      }
      .mobile-btn{
        position: absolute;
        width: 200px;
        background: rgba(170, 235, 252, 0.51);;
        padding: 10px;
        margin: 0 auto;
        box-sizing: border-box;
        top:20px;
        left: -150px;
        z-index: 11;
        border-radius: 5px;
        .el-button {
          width: 90px;
          margin-left: 0;
          margin-bottom: 5px;
        }
      }
    }
  // }

}
</style>
