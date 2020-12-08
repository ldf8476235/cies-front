<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-02 17:15:48
 * @LastEditors: wh
 * @Description: 
 * @LastEditTime: 2020-12-08 19:00:22
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
                      <div class="action-sequence-content">

                        <div class="row" v-for=" item1 in 3" :key="item1">
                          <div class="action-item" v-if="item1 % 2 === 1" v-for=" item in 10" :key="item" :class="item === 10 ? 'row-wrap' : ''">
                            <div class="click-icon">
                              <span>Home</span>
                              <p>
                                <img src="../../../assets/iconpng/icon-gesture.png" alt="">
                              </p>
                              <span class="iconfont icon-cuo1 red"></span>
                            </div>
                            <div class="point-to">
                              <span class="iconfont" :class="item === 10 ? 'icon-jiang' : 'icon-arrow-up-copy' "></span>
                            </div>
                          </div>
                          <div class="action-item" v-if="item1 % 2 === 0" v-for=" item in 10" :key="item" :class="item === 10 ? 'row-wrap' : ''">
                            <div class="point-to" v-if="item !== 10">
                              <span class="iconfont" :class="item === 10 ? 'icon-jiang' : 'icon-jiantou-you' "></span>
                            </div>
                            <div class="click-icon">
                              <span>Home</span>
                              <p>
                                <!-- <img src="../../../assets/iconpng/icon-gesture.png" alt=""> -->
                                    <svg-icon data_iconName="icon-gesture" className="icon-gesture"/>
                              </p>
                              <span class="iconfont icon-cuo1 red"></span>
                            </div>
                            <div class="point-to" v-if="item === 10">
                              <span class="iconfont" :class="item === 10 ? 'icon-jiang' : 'icon-jiantou-you' "></span>
                            </div>
                          </div>
                        </div>
                        <!-- <div class="row" v-for=" item1 in 1" :key="item1">
                          <div class="action-item" v-for=" item in 10" :key="item" :class="item === 10 ? 'row-wrap' : ''">
                            <div class="point-to">
                              <span class="iconfont" :class="item === 10 ? 'icon-jiang' : 'icon-jiantou-you' "></span>
                            </div>
                            <div class="click-icon">
                              <span>Home</span>
                              <p>
                                <img src="../../../assets/iconpng/icon-gesture.png" alt="">
                              </p>
                              <span class="iconfont icon-cuo1 red"></span>
                            </div>
                          </div>
                        </div> -->
                        
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
      generatedCode:'',
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
      },
      cursor: {}
    };
  },
  created(){
    this.imagePool = new ImagePool(100);
  },
  mounted(){
    this.canvas.bg = document.querySelector('#bgCanvas')
    this.canvas.fg = document.querySelector('#fgCanvas')
    
    this.deviceId = 'android:'
    this.checkVersion()
    this.getCurrentScreen()
    this.doConnect()
    
    window.onresize = () => {
      this.resizeScreen()
    }
    
    
  },
  computed:{
    nodes:{
      // cache:false,//控制计算属性缓存
      get:function (){
        console.log('计算属性')
        return this.originNodes
      }
      
    },
  },
  watch:{
  },
  methods: {
    // wh-检查版本
    checkVersion: function () {
      this.$axios.get('/api/v1/version').then(res => {
        console.log(res)
        this.version = res.version;
          console.log('版本：',this.version)
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
    getCurrentScreen(){
      this.$axios.get('/api/v1/devices/' + encodeURIComponent(this.deviceId || '-') + '/screenshot').then(res => {
        console.log(res)
        console.log('screenRefresh----:',res)
        var blob = b64toBlob(res.data, 'image/' + res.type);
        this.drawBlobImageToScreen(blob);
        this.dumpHierarchy().then(this.loadLiveScreen)
        localStorage.setItem('screenshotBase64', res.data);
      }).catch(err => {
        console.log('err:',err)
      })
    },
    // wh-连接手机
    doConnect() {
      
      const params = `platform=${'Android'}&deviceUrl=${''}`
      this.$axios.post('/api/v1/connect',params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
        console.log("deviceId", res.deviceId)
          this.deviceId = res.deviceId
          this.screenWebSocketUrl = res.screenWebSocketUrl
      }).catch(err => {
        console.log('err',err)
      })
    },
    // 绘制当前屏幕
    drawBlobImageToScreen (blob) {
      console.log('drawBlobImageToScreen----',blob)
      // Support jQuery Promise
      // var dtd = $.Deferred();
      // console.log(this.canvas.bg)
      var bgcanvas = this.canvas.bg,
        fgcanvas = this.canvas.fg,
        ctx = bgcanvas.getContext('2d'),
        self = this,
        URL = window.URL || window.webkitURL,
        BLANK_IMG = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        img = this.imagePool.next();
        console.log(img.width,img.height)
      img.onload = function () {
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
    // wh-获取安卓屏幕结构
    dumpHierarchy () { // v2
      return this.$axios.get('/api/v2/devices/' + encodeURIComponent(this.deviceId || '-') + '/hierarchy').then(res => {
        // console.log('res----:',res)
        localStorage.setItem("xmlHierarchy", res.xmlHierarchy);
        localStorage.setItem('jsonHierarchy', JSON.stringify(res.jsonHierarchy));
        localStorage.setItem("activity", res.activity);
        localStorage.setItem("packageName", res.packageName);
        localStorage.setItem("windowSize", res.windowSize);
        this.activity = res.activity; // only for android
        this.packageName = res.packageName;
        this.drawAllNodeFromSource(res.jsonHierarchy);
        // this.nodeSelected = null;
      })
    },
    // wh-绘制所有安卓屏幕所有节点
    drawAllNodeFromSource (source) {
      let nodeMaps = this.originNodeMaps = {}
      function sourceToNodes(source) {
        let node = Object.assign({}, source); //, { children: undefined });
        nodeMaps[node._id] = node;
        let nodes = [node];
        if (source.children) {
          source.children.forEach(function (s) {
            s._parentId = node._id;
            nodes = nodes.concat(sourceToNodes(s))
          })
        }
        return nodes;
      }
      this.originNodes = sourceToNodes(source) //res.nodes;
      console.log('this.originNodes:',this.originNodes)
      this.activeMouseControl()
      this.drawAllNode();
      this.canvasStyle.opacity = 1.0;
    },
    drawAllNode() {
      var self = this;
      var canvas = self.canvas.fg;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      self.originNodes.forEach(function (node) {
        // ignore some types
        if (['Layout'].includes(node.type)) {
          return;
        }
        self.drawNode(node, 'red', true);
      })
    },
    // wh-绘制app位置边框
    drawNode(node, color, dashed) {
      if (!node || !node.rect) {
        return;
      }
      // console.log(node.rect.x)
      var x = node.rect.x,
        y = node.rect.y,
        w = node.rect.width,
        h = node.rect.height;
      color = color || 'black';
      var ctx = this.canvas.fg.getContext('2d');
      var rectangle = new Path2D();
      rectangle.rect(x, y, w, h);
      // if (dashed) {
        ctx.lineWidth = 5;
        ctx.setLineDash([8, 10]); // 设置虚线 实现部分与虚线部分 8-10-8-10 循环
      // } else {
      //   ctx.lineWidth = 5;
      //   ctx.setLineDash([]);
      // }
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
      console.log('sssssssssssssssss',screenDiv.clientWidth,screenDiv.clientHeight)
       Object.assign(this.canvasStyle, {
          width: Math.floor(screenDiv.clientHeight * canvasRatio) + 'px', //'inherit',
          height: Math.floor(screenDiv.clientHeight) + 'px', //'100%',
        })
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
        this.drawNode(this.nodeHovered, "blue")
      }
      if (this.nodeSelected) {
        this.drawNode(this.nodeSelected, "red")
      }
    },
    findNodesByPosition(pos) {
      function isInside(node, x, y) {
        if (!node.rect) {
          return false;
        }
        var lx = node.rect.x,
          ly = node.rect.y,
          rx = node.rect.width + lx,
          ry = node.rect.height + ly;
        return lx < x && x < rx && ly < y && y < ry;
      }

      function nodeArea(node) {
        return node.rect.width * node.rect.height;
      }

      let activeNodes = this.nodes.filter(function (node) {
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
    },
    drawHoverNode(pos) {
      let hoveredNodes = this.findNodesByPosition(pos);
      let node = hoveredNodes[0];
      this.nodeHovered = node;

      hoveredNodes.forEach((node) => {
        this.drawNode(node, "green")
      })
      this.drawNode(this.nodeHovered, "blue");
    },
    findNodes (kwargs) {
      return this.nodes.filter((node) => {
        for (const [k, v] of Object.entries(kwargs)) {
          if (node[k] !== v) {
            return false;
          }
        }
        return true
      })
    },
    generateNodeSelectorKwargs (node) {
      // iOS: name, label, className
      // Android: text, description, resourceId, className
      let kwargs = {};
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
      kwargs["_count"] = nodeCount
      return kwargs;
    },
    _combineKeyValue(key, value) {
      if (typeof value === "string") {
        value = `"${value}"`
      }
      return key + '=' + value;
    },
    generateNodeSelectorCode(node) {
      console.log('node:',node)
      if (this.useXPathOnly) {
        return `d.xpath('${this.elemXPathLite}')`
      }
      let kwargs = this.generateNodeSelectorKwargs(node)
      if (kwargs._count === 1) {
        const array = [];
        for (const [key, value] of Object.entries(kwargs)) {
          if (key.startsWith("_")) {
            continue;
          }
          array.push(this._combineKeyValue(key, value))
        }
        return `d(${array.join(", ")})`
      }
      return `d.xpath('${this.elemXPathLite}')`
    },
    loadLiveHierarchy () {
      if (this.nodeHovered || this.nodeSelected) {
        setTimeout(this.loadLiveHierarchy, 500)
        return
      }
      this.dumpHierarchy()
        .then(() => {
          this.loadLiveHierarchy()
        })
    },
    loadLiveScreen() {
      console.log('aaaaa')
      var self = this;
      var BLANK_IMG =
        'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
      var protocol = location.protocol == "http:" ? "ws://" : "wss://"
      var ws = new WebSocket(this.screenWebSocketUrl);
      var canvas = document.getElementById('bgCanvas')
      var ctx = canvas.getContext('2d');
      var lastScreenSize = {
        screen: {},
        canvas: {}
      };

      this.screenWebSocket = ws;

      // this.loadLiveHierarchy() // 计算红色框
      
      ws.onopen = function (ev) {
        console.log('screen websocket connected')
      };
      ws.onmessage = function (message) {
        
        console.log("New message");
        var blob = new Blob([message.data], {
          type: 'image/jpeg'
        })
        var img = self.imagePool.next();
        img.onload = function () {
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

        img.onerror = function () {
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
        console.log("screen websocket closed")
      }
    },
    // wh-鼠标移动，点击事件
    activeMouseControl() {
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

      function activeFinger(index, x, y, pressure) {
        var scale = 0.5 + pressure
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
          y: Math.floor(py * element.height),
        }
      }

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
        // startMousing()

        var x = e.pageX - screen.bounds.x
        var y = e.pageY - screen.bounds.y
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

      function mouseDownListener(event) {
        var e = event;
        console.log(e)
        if (e.originalEvent) {
          e = e.originalEvent
        }
        // Skip secondary click
        if (e.which === 3) {

          return
        }
        e.preventDefault()

        // fakePinch = e.altKey
        calculateBounds()
        // startMousing()

        var x = e.pageX - screen.bounds.x
        var y = e.pageY - screen.bounds.y
        var pressure = 0.5
        activeFinger(0, e.pageX, e.pageY, pressure);

        if (self.nodeHovered) {
          self.nodeSelected = self.nodeHovered;
          self.drawAllNode();
          // self.drawHoverNode(pos);
          self.drawNode(self.nodeSelected, "red");
          var generatedCode = self.generateNodeSelectorCode(self.nodeSelected);
          if (self.autoCopy) {
            copyToClipboard(generatedCode);
          }
          self.generatedCode = generatedCode;

          console.log(self.generatedCode)

          // self.$jstree.jstree("deselect_all");
          // self.$jstree.jstree("close_all");
          // self.$jstree.jstree("select_node", "#" + self.nodeHovered._id);
          // self.$jstree.jstree(true)._open_to("#" + self.nodeHovered._id);
          // document.getElementById(self.nodeHovered._id).scrollIntoView(false);
        }
        // self.touchDown(0, x / screen.bounds.w, y / screen.bounds.h, pressure);

        element.removeEventListener('mouseleave', mouseHoverLeaveListener);
        element.removeEventListener('mousemove', mouseHoverListener);
        element.addEventListener('mousemove', mouseMoveListener);
        document.addEventListener('mouseup', mouseUpListener);
      }

      function markPosition(pos) {
        var ctx = self.canvas.fg.getContext("2d");
        ctx.fillStyle = '#ff8901' // '#ff0000'; // red
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 12, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fill()

        ctx.fillStyle = "#fff"; // white
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 8, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fill();
      }

      /* bind listeners */
      element.addEventListener("contextmenu", contextMenuListener);
      element.addEventListener('mousedown', mouseDownListener);
      element.addEventListener('mousemove', mouseHoverListener);
      element.addEventListener('mouseleave', mouseHoverLeaveListener);
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
    /deep/ .el-card__header{
      padding: 5px 10px;
    }
    /deep/ .el-card__body {
      padding: 5px;
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
        height: 300px;
        overflow: hidden;
        .editor{
          .vue-codemirror{
            // width: 100px;
            /deep/ .CodeMirror-scroll {
              padding-bottom: 0px;
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
      .box-card-bottom {
        
        .action-bottom{
          display: flex;
          justify-content: space-between;
          .el-dropdown{
            margin-right: 10px;
          }
        }
        .action-sequence-content{
          // width: 900px;
          height: 185px;
          // margin: 0 auto;
          // text-align: center;
          // display: flex;
          // flex: 1;
          // align-items: flex-start;
          // flex-wrap: wrap;
          overflow-y: auto;
          // justify-content: center;
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
              .icon-gesture{
                color: red;
              }
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
      .action-list {
        margin-top: 20px;
      }
    }
    .right{
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
          img{
            // width: 100%;
            // height: 500px;
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
