<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2021-01-22 10:21:56
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-02-01 10:11:36
-->
<template>
  <div class="new-screen">
    <Crumbs :crumbs='crumbs' @edit='edit' @copy='copy'></Crumbs>
    <div class="container">
      <div class="content">
        <el-row :gutter="20">
          <el-col class="left" :span="18">
            <div class="gutter">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-card class="box-card-top">
                    <div slot="header" class="clearfix">
                      <span>动作信息</span>
                    </div>
                    <div class='action-base-info'>
                      <p><span class='label'>动作名称：</span><span>{{actionInfo.name}}</span></p>
                      <p><span class='label'>动作类型：</span><span>{{actionInfo.type}}</span></p>
                      <p><span class='label'>所属项目：</span><span>{{actionInfo.project}}</span></p>
                      <p><span class='label'>软件版本：</span><span>{{actionInfo.version}}</span></p>
                      <p><span class='label'>超时时间：</span><span>{{actionInfo.timeout}}</span></p>
                      <p><span class='label'>创建人：</span><span>{{actionInfo.builder}}</span></p>
                      <p><span class='label'>创建时间：</span><span>{{actionInfo.time_create}}</span></p>
                      <p><span class='label'>更新时间：</span><span>{{actionInfo.time_modify}}</span></p>
                      <p><span class='label'>动作描述：</span><span>{{actionInfo.desc}}</span></p>
                    </div>
                  </el-card>
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
                          <el-button type="">预览</el-button>
                        </div>
                      </div>
                      <div class="action-sequence-content">
                        <div v-if="tabFlag === 0">
                          <div class="row" v-for=" (item,index) in actionSequence" :key="index">
                            <!-- 奇数行 -->
                            <template v-if="index % 2 === 0">
                              <div
                                :class="cindex === 9 ? 'row-wrap' : 'action-item'"
                                v-for="(citem,cindex) in item"
                                :key='cindex'>
                                <div class="click-icon">
                                  <span>{{citem.text}}</span>
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
                                          <span>{{citem.text}}</span>
                                        </el-col>
                                      </el-row>

                                    </el-col>
                                    <el-col>
                                      <el-row>
                                        <el-col :span='10' style='text-align:end;letter-spacing:2px;'><span>类型：</span></el-col>
                                        <el-col :span='14'>
                                          <span>{{citem._type}}</span>
                                        </el-col>
                                      </el-row>
                                    </el-col>
                                    <el-col>
                                      <el-row>
                                        <el-col :span='10' style='text-align:end;letter-spacing:2px;'><span>文本：</span></el-col>
                                        <el-col :span='14'>
                                          <span>{{citem.text}}</span>
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
                                          <!-- <span>{{citem.rect.x}},{{citem.rect.y}},{{citem.rect.width}},{{citem.rect.height}}</span> -->
                                        </el-col>
                                      </el-row>
                                    </el-col>
                                    <el-col>
                                      <el-row>
                                        <el-col :span='10' style='text-align:end;letter-spacing:2px;'><span>动作：</span></el-col>
                                        <el-col :span='14'>
                                          <span>{{citem.action}}</span>
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
                            </template>
                            <!-- 偶数行 -->
                            <template v-if="index % 2 === 1">
                              <div
                                :class="cindex === 9 ? 'row-wrap' : 'action-item'"
                                v-for="(citem,cindex) in item"
                                :key='cindex'>
                                <div class="point-to" v-if="cindex !== 9">
                                  <span class="el-icon-back"></span>
                                </div>
                                <div class="click-icon">
                                  <span>{{citem.text}}</span>
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
                            </template>
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
                  <canvas id="bgCanvas" class="canvas-bg" :style="canvasStyle"></canvas>
                  <svg-icon class="svgIcon" v-if="screenLoading" data_iconName='loading'></svg-icon>
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
import VJstree from 'vue-jstree'
import { b64toBlob, ImagePool } from '@/utils/common.js';
import { GET } from '@/utils/api.js';
export default {

  name: 'NewScreen',
  components: { CodeMirror, VJstree },
  data() {
    return {
      crumbs: {
        action: true,
        details: true,
        name: '动作详情'
      },
      cmTheme: 'base16-light', // codeMirror主题
      cmEditorMode: 'default', // 编辑模式
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
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      selectVal: '', // 选中项
      tabClickIndex: '',
      actionInfo: {
        type: 'U3'
      },
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
        // [
        //   {
        //     name: 'name',
        //     type: 'type',
        //     text: 'text',
        //     picture: 'picture',
        //     area: 'area',
        //     action: 'action',
        //     exectuteWait: '',
        //     params: 'params'
        //   },
        //   {
        //     name: 'name2',
        //     type: 'type2',
        //     text: 'text2',
        //     picture: 'picture2',
        //     area: 'area2',
        //     action: 'action2',
        //     exectuteWait: '',
        //     params: 'params2'
        //   }
        // ]
      ],
      autoCopy: true,
      mobileBtn: false,
      mapAttrCount: {},
      pyshell: {
        running: false,
        restarting: false,
        consoleData: [],
        wsOpen: false,
        ws: null,
        lineno: {
          offset: 0,
          current: -1
        }
      },
      clickMobileApp: [], // 收集点击手机app数据
      screenLoading: true // 屏幕未加载完成loading动画
    };
  },
  created() {
    this.imagePool = new ImagePool(100);
  },
  mounted() {
    this.canvas.bg = document.querySelector('#bgCanvas')
    this.deviceId = 'android:'
    // this.dumpHierarchy()
    // this.doConnect()
    // this.checkVersion()
    // this.getCurrentScreen()

    // 编辑进入
    const uid = this.$route.query.uid
    if (uid) {
      this.editData()
    }
  },
  destroyed() {
    this.screenWebSocket && this.screenWebSocket.close()
  },
  computed: {
  },
  methods: {
    // 编辑
    editData() {
      // const actionData = this.$route.params.data
      // if (actionData) {
      //   localStorage.setItem('actionData', JSON.stringify(actionData))
      // }
      // this.actionInfo = actionData || JSON.parse(localStorage.getItem('actionData'))
      const uid = this.$route.query.uid
      const url = `/action/detail/?uid=${uid}`
      GET(url).then(res => {
        console.log(res)
        this.actionInfo = res.result[0]
        this.generatedCode = this.actionInfo.script
        this.disposeActionSequence(this.actionInfo.sequence)
      })

    },
    // 点击按钮外部区域，隐藏元素
    onClickOutside() {
      this.mobileBtn = false;
    },
    // 处理动作序列数据
    disposeActionSequence(data) {
      const arr = []

      // const sequence = JSON.parse(JSON.stringify(data))
      console.log(data)
      // const len = sequence.length
      // for (let i = 0; i < len;) {
      //   arr.push(sequence.slice(i, i += 10))
      // }
      // this.actionSequence = arr
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
      })
    },
    // 获取当前屏幕截图
    getCurrentScreen() {
      this.$axios.get('/api/v1/devices/' + (this.deviceId || '-') + '/screenshot').then(res => {
        var blob = b64toBlob(res.data, 'image/' + res.type);
        this.screenLoading = false
        this.drawBlobImageToScreen(blob);
        this.loadLiveScreen()
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
      }).catch(err => {
        console.log('err', err)
      })
    },
    // 绘制当前屏幕
    drawBlobImageToScreen(blob) {
      var bgcanvas = this.canvas.bg;
      var ctx = bgcanvas.getContext('2d');
      var URL = window.URL || window.webkitURL;
      const screen = document.getElementsByClassName('screen')[0]
      var BLANK_IMG = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
      var img = this.imagePool.next()
      img.onload = function() {
        bgcanvas.width = img.width
        bgcanvas.height = img.height
        const r = img.width / img.height
        screen.style.width = Math.floor(500 * r) + 'px'
        screen.style.height = '500px'
        ctx.drawImage(img, 0, 0, img.width, img.height);
        img.onload = img.onerror = null
        img.src = BLANK_IMG
        img = null
        blob = null
        URL.revokeObjectURL(url)
        url = null
      }

      img.onerror = function() {
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
    loadLiveScreen() {
      var self = this;
      var BLANK_IMG =
        'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
      // var protocol = location.protocol == 'http:' ? 'ws://' : 'wss://'
      var ws = new WebSocket(this.screenWebSocketUrl);
      var canvas = document.getElementById('bgCanvas')
      var ctx = canvas.getContext('2d');
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
          img.onload = img.onerror = null
          img.src = BLANK_IMG
          img = null
          blob = null
          URL.revokeObjectURL(url)
          url = null
        }
        img.onerror = function() {
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
    // wh-获取安卓屏幕结构
    dumpHierarchy() { // v2
      return this.$axios.get('/api/v2/devices/' + encodeURI(this.deviceId || '-') + '/hierarchy').then(res => {
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
    copy() {},
    edit() {


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
        .action-base-info{
          p{
            font-size: 14px;
            height: 30px;
            line-height: 30px;
            .label{
              text-align: right;
              width: 80px;
              display: inline-block;
            }
          }
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
            }
            .point-to{
              width: 30px;
              display: flex;
              justify-content: center;
            }
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
          height: 500px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          flex: 1;
          // background-color: gray;
          .canvas-bg {
            z-index: 0;
            position: absolute;
          }
          .svgIcon{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 101px;
            height: 116px;
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
