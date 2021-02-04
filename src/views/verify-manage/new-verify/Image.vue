<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-10 16:06:41
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-02-04 14:14:16
-->
<template>
  <div class="new-verify">
    <Crumbs :crumbs='crumbs' @save='save'></Crumbs>
    <div class="container">
      <div class="content">
        <div class="title">检验点信息</div>
        <div class="formData">
          <el-form
            ref="verifyInfo"
            :model="verifyInfo"
            :rules="rulesCaseInfo"
            label-width="120px"
            >
            <el-row class="row">
              <el-col :span="9" class="left-container">
                <el-row class="left">
                  <el-col :span="24">
                    <el-form-item label="链接设备：" prop="device_name">
                      <el-input style="width:40%;margin-right:10px;" v-model="deviceUrl"></el-input>
                      <el-dropdown @command='linkDevice'>
                      <el-button type="">
                        链接设备<i class="el-icon-arrow-down el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for='(item,index) in hasDeviceList' :key='index' :command="item.device_ip">
                          {{item.device_name}} : {{item.device_ip}}
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <el-button style="margin-left:10px;" @click='refreshDeviceScreen'>刷新</el-button>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="校验点名称：" prop="name">
                      <el-input
                        :suffix-icon="loading ? 'el-icon-loading' : ''"
                        v-model.trim="verifyInfo.name"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="所属项目：" prop="project">
                      <!-- <el-select v-model="verifyInfo.selectVal" placeholder="请选择">
                        <el-option
                          v-for="item in belongPreject"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select> -->
                      <el-input
                        :suffix-icon="loading ? 'el-icon-loading' : ''"
                        v-model.trim="verifyInfo.project"
                        placeholder="请输入所属项目"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="软件版本：" prop="version">
                      <el-input
                        v-model="verifyInfo.version"
                        placeholder=""
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="检验点类型：" prop="type">
                      <el-select v-model="verifyInfo.type" @change="selectType" placeholder="请选择">
                        <el-option
                          v-for="item in selectTypeList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="校验点描述：">
                      <el-input
                        type="textarea"
                        v-model="verifyInfo.desc"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="left-bottom">
                  <!-- 图像 -->
                  <div v-if="selectVal === 'Image'">
                    <el-col :span="24">
                      <el-form-item label="匹配结果：" prop="regex_result">
                        <el-select v-model="verifyInfo.regex_result" placeholder="请选择">
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
                    <el-col :span="24">
                      <el-form-item label="类型：">
                        <el-button @click="imgCollect">图像采集</el-button>
                        <el-button>检验范围</el-button>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="超时时长：">
                        <el-input
                          v-model="verifyInfo.timeout"
                          placeholder="请输入超时时长"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="测试：">
                        <el-button>
                          <i class="el-icon-caret-right"></i>
                          <!-- <svg-icon data_iconName='icon-start'></svg-icon> -->
                        </el-button>
                      </el-form-item>
                    </el-col>
                  </div>
                  <!-- 文本 -->
                  <div v-if="selectVal === 'Text'">
                    <el-col :span="24">
                      <el-form-item label="文本内容：">
                        <el-input
                          type="textarea"
                          v-model="verifyInfo.text"
                          placeholder="请输入文本内容"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="匹配规则：" prop="device_space">
                        <el-select v-model="verifyInfo.rule" placeholder="请选择">
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
                    <el-col :span="24">
                      <el-form-item label="匹配结果：" prop="regex_result">
                        <el-select v-model="verifyInfo.regex_result" placeholder="请选择">
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
                    <el-col :span="24">
                      <el-form-item label="类型：">
                        <el-button>图像采集</el-button>
                        <el-button>检验范围</el-button>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="超时时间：">
                        <el-input
                          v-model="verifyInfo.timeout"
                          placeholder="请输入"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="测试：">
                        <el-button>
                          <i class="el-icon-caret-right"></i>
                          <!-- <svg-icon data_iconName='icon-start'></svg-icon> -->
                        </el-button>
                      </el-form-item>
                    </el-col>
                  </div>
                  <!-- 页面 -->
                  <div v-if="selectVal === 'U3'">
                    <el-col :span="24">
                      <el-form-item label="页面元素：" prop="element">
                        <el-select v-model="verifyInfo.element" @change="selectPageElement" placeholder="请选择">
                          <el-option
                            v-for="item in pageElementSelect"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="页面内容：" prop="content">
                        <el-input
                          disabled
                          v-model="verifyInfo.content"
                          placeholder="请输入页面内容"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="匹配结果：" prop="regex_result">
                        <el-select v-model="verifyInfo.regex_result" placeholder="请选择">
                          <el-option
                            v-for="item in regResuslt"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="超时时长：" prop="timeout">
                        <el-input
                          v-model="verifyInfo.timeout"
                          placeholder="请输入"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="测试：">
                        <el-button @click="testPage">
                          <i class="el-icon-caret-right"></i>
                          <!-- <svg-icon data_iconName='icon-start'></svg-icon> -->
                        </el-button>
                        <span :style="{color:(testResult === 'PASS' ? 'green':'red')}">&nbsp;{{testResult}}</span>
                      </el-form-item>
                    </el-col>
                  </div>
                </el-row>
              </el-col>
              <el-col :span="15">
                <div class="gutter" >
                  <div class="screen" ref="screen" id='screen'>
                    <canvas v-show="pageShow" id="fgCanvas" class="canvas-fg" :style="canvasStyle"></canvas>
                    <canvas id="bgCanvas" class="canvas-bg" @mousedown.stop.prevent="mouseDown" :style="canvasStyle"></canvas>
                    <template v-if="domArr.length > 0 && !pageShow">
                      <div v-for="(item,index) in domArr" :key="index">
                        <div
                        :id="item.id"
                        v-if="item.flag"
                        :class="item.class">
                          <!-- <p :class="item.class_1">
                            <span @click.stop="delDom(item.id)">X</span>
                          </p> -->
                        </div>
                      </div>
                    </template>
                    <svg-icon class="svgIcon" v-if="screenLoading" data_iconName='loading'></svg-icon>
                  </div>
                  <div v-if="!connect" class="link-device">
                    请先连接设备
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { b64toBlob, ImagePool } from '@/utils/common.js';
import { GET, POST } from '@/utils/api.js';
// 引入常量
import WS_URL from '@/axios/C_L.js';
export default {
  name: '',
  data() {
    var timeout = (rule, value, callback) => {
      console.log(Number(value), value)
      if (value === '') {
        return callback(new Error('请输入超时时长'))
      } else if (Number(value) + '' === 'NaN') {
        callback(new Error('请输入数字'))
      } else if (Number(value) < 0) {
        callback(new Error('超时时长不能小于0'))
      } else {
        callback()
      }
    };
    return {
      crumbs: {
        action: true,
        name: '新建校验点'
      },
      loading: false, // 任务名称动态验证动画
      selectTypeList: [ // 选择类型
        {
          value: 'Image',
          label: '图像'
        },
        {
          value: 'Text',
          label: '文本'
        },
        {
          value: 'U3',
          label: '页面'
        }
      ],
      screenLoading: false, // 屏幕未加载完成loading动画
      options: [
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      selectVal: 'U3', // 选中项
      tabClickIndex: '',
      verifyInfo: {
        type: 'U3',
        content: '',
        element: 'text',
        regex_result: 'PASS',
        timeout: '0'
      },
      rulesCaseInfo: {
        name: [
          { required: true, message: '请输入动作名称', trigger: 'blur' }
        ],
        project: [
          { required: true, message: '请输入所属项目', trigger: 'blur' }
        ],
        version: [
          { required: true, message: '请输入软件版本', trigger: 'blur' }
        ],
        element: [
          { required: true, message: '请选择页面元素', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入页面内容', trigger: ['blur', 'change'] }
        ],
        timeout: [
          { validator: timeout, trigger: 'blur' },
          { required: true, message: '请输入超时时长', trigger: 'blur' }
        ],
        regex_result: [
          { required: true, message: '请选择匹配结果', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入动作描述', trigger: 'blur' }
        ]
      },
      deviceId: 'android:',
      canvas: { // 画布
        bg: null,
        fg: null
      },
      canvasStyle: { // 画布内联style
        opacity: 1,
        width: 'inherit',
        height: 'inherit'
      },
      lastScreenSize: {
        screen: {},
        canvas: {
          width: 1,
          height: 1
        }
      },
      domArr: [], // 动态插入dom元素数组
      belongPreject: [], // 所属项目
      hasDeviceList: [],
      pageShow: false, // type为page时显示
      cursor: {}, // 鼠标hover时，选中小圆点
      mapAttrCount: {},
      pageElementSelect: [// 页面元素选择框
        {
          label: 'xpath',
          value: `xpath`
        },
        {
          label: 'text',
          value: 'text'
        },
        {
          label: 'resourceId',
          value: 'resourceId'
        }
      ],
      connect: false,
      regResuslt: [ // 匹配结果
        {
          label: 'PASS',
          value: 'PASS'
        },
        {
          label: 'FAIL',
          value: 'FAIL'
        }
      ],
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
      baseCode: '',
      testResult: '',
      deviceUrl: '' // 链接设备的IP
    };
  },
  created() {
    this.imagePool = new ImagePool(100);
  },
  mounted() {
    this.getHasDevice()
    this.initPythonWebSocket()
    this.canvas.bg = document.querySelector('#bgCanvas')
    this.canvas.fg = document.querySelector('#fgCanvas')
    window.onresize = () => {
      console.log('aaa', window.innerHeight)
      // const screenDiv = document.getElementById('screen');
      // screenDiv.style.height = (window.innerHeight - 210) + 'px' // '430px'
      this.resizeScreen(this.img)
    }
    const uid = this.$route.query.uid
    if (uid) {
      this.editData(uid)
    }

  },
  destroyed() {
    this.screenWebSocket && this.screenWebSocket.close()
    this.destroy = true
    window.onresize = null
  },
  computed: {
    nodes: function() {
      return this.originNodes
    },
    elem: function() {
      return this.nodeSelected || {};
    },
    elemXPathLite: function() {
      // scan nodes
      this.originNodes.forEach((n) => {
        this.incrAttrCount('label', n.label)
        this.incrAttrCount('resourceId', n.resourceId)
        this.incrAttrCount('text', n.text)
        this.incrAttrCount('_type', n._type)
        this.incrAttrCount('description', n.description)
      })

      let node = this.nodeSelected;
      console.log(node)
      const array = [];
      while (node && node._parentId) {
        const parent = this.originNodeMaps[node._parentId]
        if (this.getAttrCount('label', node.label) === 1) {
          array.push(`*[@label="${node.label}"]`)
          break
        } else if (this.getAttrCount('resourceId', node.resourceId) === 1) {
          array.push(`*[@resource-id="${node.resourceId}"]`)
          break
        } else if (this.getAttrCount('text', node.text) === 1) {
          array.push(`*[@text="${node.text}"]`)
          break
        } else if (this.getAttrCount('description', node.description) === 1) {
          array.push(`*[@content-desc="${node.description}"]`)
          break
        } else if (this.getAttrCount('_type', node._type) === 1) {
          array.push(`${node._type}`)
          break
        } else if (!parent) {
          array.push(`${node._type}`)
        } else {
          let index = 0;
          parent.children.some((n) => {
            if (n._type == node._type) {
              index++
            }
            return n._id == node._id
          })
          array.push(`${node._type}[${index}]`)
        }
        node = parent;
      }
      return `//${array.reverse().join('/')}`
    },
    elemXPathFull: function() {
      let node = this.elem;
      const array = [];
      while (node && node._parentId) {
        const parent = this.originNodeMaps[node._parentId];

        let index = 0;
        parent.children.some((n) => {
          if (n._type == node._type) {
            index++
          }
          return n._id == node._id
        })

        array.push(`${node._type}[${index}]`)
        node = parent;
      }
      return `//${array.reverse().join('/')}`
    }
  },
  methods: {
    editData(uid) {
      const url = `/verify/detail/?uid=${uid}`
      GET(url).then(res => {
        this.verifyInfo = res.result[0]
      }).catch(err => {
        this.$hintMsg('error', err)
      })
    },
    // 刷新屏幕
    refreshDeviceScreen() {
      this.dumpHierarchy()
    },
    // 测试页面
    testPage() {
      const node = this.nodeSelected
      // console.log(node)
      if (node) {
        node.action = 'tap'
      }
      if (!this.baseCode) {
        this.$hintMsg('warning', '请先链接设备')
      }
      var code = this.verifyInfo.content
      const ele = this.verifyInfo.element
      // const regResult = this.verifyInfo.regex_result
      const timeout = this.verifyInfo.timeout
      let codeComplate
      // this.loadLiveHierarchy()
      // this.nodeSelected = null
      // this.nodeHovered = null
      if (ele === 'xpath') {
        codeComplate = this.baseCode + '\n' + 'print(' + code + '.' + 'exists' + ')'
      } else if (ele === 'text') {
        codeComplate = this.baseCode + '\n' + 'print(' + code + '.' + 'exists' + '(' + timeout + '))'
      } else if (ele === 'resourceId') {
        console.log(ele, code)
        if (code === "d(resourceId='')") {
          this.testResult = 'FAIL'
          return
        }
        codeComplate = this.baseCode + '\n' + 'print(' + code + '.' + 'exists' + '(' + timeout + '))'
      }
      console.log(codeComplate)
      this.runPythonWithConnect(codeComplate)
        .then(this.delayReload)
    },
    // 运行python代码
    runPythonWithConnect(code) {
      console.log('code:', code)
      // if (!this.deviceId) {
      //   return this.doConnect().then(() => {
      //     this.runPythonWithConnect(code)
      //   })
      // }
      // this.pyshell.lineno.offset = 0
      return this.runPython(code)
    },
    // wh-运行python
    runPython(code) {
      return new Promise((resolve, reject) => {
        // this.resetConsole()
        // this.resetEditor()
        this.pyshell.running = true
        this.pyshell.ws.send(JSON.stringify({ method: 'input', value: code }))
        resolve()
      })
    },
    initPythonWebSocket() {
      // 初始化变量
      this.pyshell.running = false
      this.pyshell.restarting = false
      const url = 'ws://' + WS_URL.WS_URL_WE + '/ws/v1/python'
      const ws = this.pyshell.ws = new WebSocket(url)
      ws.onopen = () => {
        this.pyshell.wsOpen = true
        console.log('python:连接成功')
        // this.resetConsole()
      }
      ws.onmessage = (message) => {
        const data = JSON.parse(message.data)
        // console.log('message:', data)
        if (data.method === 'output') {
          console.log('message:', data.method, data.value)
          // if (!data.value) {
          if ((data.value === 'True' && this.verifyInfo.regex_result === 'PASS') || (data.value === 'False' && this.verifyInfo.regex_result === 'FAIL')) {
            this.testResult = 'PASS'
          } else if ((data.value === 'False' && this.verifyInfo.regex_result === 'PASS') || (data.value === 'True' && this.verifyInfo.regex_result === 'FAIL')) {
            this.testResult = 'FAIL'
          }
          // }

        }
        // const lineNumber = null
        // const timeUsed = null
        // 用蓝色的breakpoint标记已经运行过的代码
        // 用另外的breakpoint标记当前运行中的代码
        // 代码行号:lineno 从0开始
      }
      ws.onclose = () => {
        this.pyshell.wsOpen = false
        this.pyshell.ws = null
        this.pyshell.running = false
        // this.resetEditor()
        console.log('python关闭连接websocket closed')
      }
    },
    // 选择页面元素
    selectPageElement(e) {
      console.log(e)
      if (!this.originNodes) {
        console.log('aaaaa')
        this.$message({
          type: 'warning',
          message: '请先链接设备'
        })
        return
      }
      if (!this.nodeSelected) {
        this.$message({
          type: 'warning',
          message: '请先选择节点'
        })
        return
      }
      if (e === 'xpath') {
        this.verifyInfo.content = this.generateNodeSelectorCode(this.nodeSelected) // `d.xpath('${this.elemXPathLite}')`
      } else if (e === 'text') {
        this.verifyInfo.content = this.generateNodeSelectorCode(this.nodeSelected)
      } else if (e === 'resourceId') {
        this.verifyInfo.content = this.generateNodeSelectorCode(this.nodeSelected)
      }
    },
    getAttrCount(collectionKey, key) {
      // eg: getAttrCount("resource-id", "tv_scan_text")
      const mapCount = this.mapAttrCount[collectionKey];
      if (!mapCount) {
        return 0
      }
      return mapCount[key] || 0;
    },
    incrAttrCount(collectionKey, key) {
      const flag = Object.prototype.hasOwnProperty.call(this.mapAttrCount, collectionKey)
      if (!flag) {
        this.mapAttrCount[collectionKey] = {}
      }
      const count = this.mapAttrCount[collectionKey][key] || 0;
      this.mapAttrCount[collectionKey][key] = count + 1;
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
    // 生成节点关键字参数
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
    // 联合Key和Value
    _combineKeyValue(key, value) {
      if (typeof value === 'string') {
        value = `"${value}"`
      }
      return key + '=' + value;
    },
    generateNodeSelectorCode(node) {
      console.log(node)
      if (this.verifyInfo.element === 'xpath') {
        return `d.xpath('${this.elemXPathLite}')`
      }
      if (this.verifyInfo.element === 'resourceId') {
        return `d(resourceId='${node.resourceId}')`
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
        console.log(array)
        if (array[0].indexOf('resourceId') !== -1) {
          this.verifyInfo.element = 'resourceId'
        }
        return `d(${array.join(', ')})`
      }
      return `d.xpath('${this.elemXPathLite}')`


    },
    // 获取现有设备
    getHasDevice() {
      this.$http.get('/device/screen/phones/').then(res => {
        console.log(res)
        this.hasDeviceList = res.data
      })
    },
    // 连接设备
    linkDevice(ip) {
      this.screenLoading = true
      this.deviceUrl = ip
      this.baseCode = "d = u3.connect('" + ip + "')"
      this.hasDeviceList.forEach(item => {
        if (item.device_ip === ip) {
          this.verifyInfo.devices = [item.uid]
        }
      })
      this.screenWebSocket && this.screenWebSocket.close()
      this.doConnect()
    },
    // 图片采集
    imgCollect() {

    },
    // 选择类型
    selectType(e) {
      this.selectVal = e
      console.log(e)
      if (e === 'U3') {
        console.log('ssss')
        this.pageShow = true
        if (this.connect) {
          this.dumpHierarchy()
        }
      } else {
        this.pageShow = false
      }

    },
    // wh-连接手机
    doConnect() {
      const params = `platform=${'Android'}&deviceUrl=${this.deviceUrl}`
      this.$axios.post('/api/v1/connect', params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then(res => {
        this.deviceId = res.deviceId
        this.screenWebSocketUrl = res.screenWebSocketUrl
        this.connect = true
        this.getCurrentScreen()
        if (this.verifyInfo.type === 'U3') {
          this.pageShow = true
          this.dumpHierarchy()
          this.loadLiveHierarchy()

        }
      }).catch(err => {
        console.log('err', err)
      })
    },
    // wh-获取当前屏幕截图
    getCurrentScreen() {
      this.$axios.get('/api/v1/devices/' + (this.deviceId || '-') + '/screenshot').then(res => {
        console.log('screenRefresh----:', res)
        this.screenLoading = false
        const blob = b64toBlob(res.data, 'image/' + res.type);
        this.drawBlobImageToScreen(blob);
        this.loadLiveScreen()
        localStorage.setItem('screenshotBase64', res.data);
      }).catch(err => {
        console.log('err:', err)
      })
    },
    // wh-绘制当前屏幕
    drawBlobImageToScreen(blob) {
      const _this = this
      const bgcanvas = this.canvas.bg;
      const fgcanvas = this.canvas.fg;
      const ctx = bgcanvas.getContext('2d');
      const URL = window.URL || window.webkitURL;
      const BLANK_IMG = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
      let img = this.imagePool.next();
      let url = URL.createObjectURL(blob)
      img.src = url;
      img.onload = function() {
        fgcanvas.width = bgcanvas.width = img.width;
        fgcanvas.height = bgcanvas.height = img.height
        _this.img = img
        _this.resizeScreen(img)
        ctx.drawImage(img, 0, 0, img.width, img.height);

        /**
         * 尝试强制清除所有东西以消除内存泄漏。
         * 尽管如此，当开发者工具打开时，Chrome仍然会泄漏大量的内存，可能是为了节省检查的资源。
         * 关闭开发人员工具时，内存不会泄漏。
        */

        img.onload = img.onerror = null
        // img.src = BLANK_IMG
        img = null
        blob = null
        URL.revokeObjectURL(url)
        url = null
      }

      img.onerror = function() {
        /**
         * 幸福的忽视。
         * 我认为这是不应该发生的，但有时它会发生，大概当我们加载图像太快。和onload中一样，在这里做同样的清理。
        */
        img.onload = img.onerror = null
        img.src = BLANK_IMG
        img = null
        blob = null
        URL.revokeObjectURL(url)
        url = null
      }

    },
    // wh-获取安卓屏幕结构
    dumpHierarchy() { // v2
      return this.$axios.get('/api/v2/devices/' + (this.deviceId || '-') + '/hierarchy').then(res => {
        this.activity = res.activity; // only for android
        this.packageName = res.packageName;
        this.drawAllNodeFromSource(res.jsonHierarchy);
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
      this.activeMouseControl()
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
        self.drawNode(node, '#ff8901', true);
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
    loadLiveHierarchy() {
      // 选中后不在实时计算元素(app)边框
      if (this.nodeHovered || this.nodeSelected) {
        this.dumpHierarchy()
        // setTimeout(this.loadLiveHierarchy, 500)
        return
      }
      if (this.destroy) {
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
      // self.loadLiveHierarchy() // 计算手机app所有元素的黑色框
      this.screenWebSocket = ws;
      ws.onopen = function(ev) {
        console.log('screen websocket connected')
      };
      ws.onmessage = function(message) {
        console.log(message)
        var blob = new Blob([message.data], {
          type: 'image/jpeg'
        })
        var img = self.imagePool.next();
        img.onload = function() {
          canvas.width = img.width
          canvas.height = img.height
          self.img = img
          ctx.drawImage(img, 0, 0, img.width, img.height)
          self.resizeScreen(img)

          img.onload = img.onerror = null
          // img.src = BLANK_IMG
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
    // wh-可视区域尺寸变化
    resizeScreen(img) {
      console.log(img)
      if (!img) {
        return
      }
      var screenDiv = this.$refs.screen
      const w = img.width;
      const h = img.height
      console.log(img.width, img.height)
      const r = img.width / img.height
      if (w > h) {
        screenDiv.style.width = Math.floor(330 * r) + 'px'
        screenDiv.style.height = '330px'
      } else {
        screenDiv.style.width = Math.floor((window.innerHeight - 210) * r) + 'px'
        screenDiv.style.height = (window.innerHeight - 210) + 'px' // '500px'
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

          self.verifyInfo.content = generatedCode
          console.log('generatedCode_:', self.verifyInfo.content)
          // if (self.autoCopy) {
          //   copyToClipboard(generatedCode);
          // }
          // self.generatedCode = generatedCode;
        }
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
    // 鼠标按下
    mouseDown(e) {
      console.log(!this.connect, this.verifyInfo.type !== 'Image')
      if (this.verifyInfo.type === 'U3' || !this.connect) {
        this.$message({
          type: 'warning',
          message: '无截屏功能'
        })
        return
      }
      const _this = this
      let x = 0;
      let y = 0;
      const date = new Date().getTime()
      const id = 'funcDiv' + date + parseInt(Math.random() * 10)
      const bgCanvas = document.getElementById('bgCanvas')
      const screen = document.getElementsByClassName('screen')[0]
      x = e.pageX // - e.offsetX
      y = e.pageY // - e.offsetY
      const startX = e.offsetX
      const startY = e.offsetY
      const canvasWidth = bgCanvas.width;
      const canvasHeight = bgCanvas.height;
      // const divEle = document.createElement('div');
      // divEle.setAttribute('id', id);
      // videoRef.append(divEle)
      const obj = {
        id: id,
        class: 'border',
        class_1: 'desc_1',
        labelName: this.labelName,
        // startX: startX + 'px',
        // startY: startY + 'px',
        img: '',
        flag: true
      }

      _this.domArr.push(obj)
      let width = 0;
      let height = 0;
      this.$nextTick(() => {
        const divEle = document.getElementById(id)
        document.onmousemove = function(e) {
          e.preventDefault()
          e.stopPropagation()
          width = e.pageX - x
          height = e.pageY - y
          divEle.style.left = startX + 'px';
          divEle.style.top = startY + 'px';
          // 拖拽矩形框放大边界检测
          if (width >= (canvasWidth - startX)) {
            divEle.style.width = (canvasWidth - startX) + 'px';
          } else {
            divEle.style.width = width + 'px';
          }
          if (height >= (canvasHeight - startY)) {
            divEle.style.height = (canvasHeight - startY) + 'px';
          } else {
            divEle.style.height = height + 'px';
          }
        }
        document.onmouseup = function(e) {
          e.stopPropagation();
          e.preventDefault();
          document.onmousemove = null
          if (width < 10 || height < 10) {
            // divEle.remove()
            _this.domArr = _this.domArr.filter(item => {
              return id !== item.id
            })
            // alert('选中区域过小')
            document.onmousemove = null
            document.onmouseup = null
            return
          } else {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const rateX = canvasWidth / screen.offsetWidth
            const rateY = canvasHeight / screen.offsetHeight
            ctx.drawImage(
              bgCanvas,
              startX * rateX,
              startY * rateY,
              parseInt(divEle.style.width) * rateX,
              parseInt(divEle.style.height) * rateY,
              0,
              0,
              parseInt(divEle.style.width),
              parseInt(divEle.style.height))
            const blob = _this.dataURLtoBlob(canvas.toDataURL())
            console.log(blob)
            _this.drag(divEle)
            _this.flexible(divEle)
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      })
    },
    // 拖拽函数
    drag(divEle) {
      const _this = this
      let twidth = 0;
      let theight = 0;
      const bgCanvas = document.getElementById('bgCanvas')
      const canvasWidth = bgCanvas.width;
      const canvasHeight = bgCanvas.height;
      const screen = document.getElementsByClassName('screen')[0]
      divEle.onmousedown = function(e) {
        if (e.target.className === 'desc_1') return
        e.stopPropagation();
        e.preventDefault();
        const event = e || window.event;
        const _target = event.target
        const sb_bkx = event.clientX - _target.offsetLeft;
        const sb_bky = event.clientY - _target.offsetTop;
        let endx
        let endy
        twidth = parseInt(_target.style.width)
        theight = parseInt(_target.style.height)
        if (event.preventDefault) {
          event.preventDefault();
        } else {
          event.returnValue = false;
        }
        document.onmousemove = function(ev) {
          e.stopPropagation();
          e.preventDefault();
          const event = ev || window.event;
          endx = event.clientX - sb_bkx;
          endy = event.clientY - sb_bky;
          // 拖拽边界检测
          if (endx <= 0) {
            _target.style.left = 0 + 'px';
          } else if (endx + twidth >= screen.offsetWidth) {
            _target.style.left = (screen.offsetWidth - twidth - 4) + 'px';
          } else {
            _target.style.left = endx + 'px';
          }
          if (endy <= 0) {
            _target.style.top = 0 + 'px';
          } else if (endy + theight >= screen.offsetHeight) {
            _target.style.top = (screen.offsetHeight - theight - 4) + 'px';
          } else {
            _target.style.top = endy + 'px';
          }
        }
        document.onmouseup = function(e) {
          e.stopPropagation();
          e.preventDefault();
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          const rateX = canvasWidth / screen.offsetWidth
          const rateY = canvasHeight / screen.offsetHeight
          ctx.drawImage(
            bgCanvas,
            endx * rateX,
            endy * rateY,
            parseInt(divEle.style.width) * rateX,
            parseInt(divEle.style.height) * rateY,
            0,
            0,
            parseInt(divEle.style.width),
            parseInt(divEle.style.height))
          _this.flexible(divEle)
          document.onmousemove = null;
          divEle.onmouseup = null
        }
      }
    },
    // 拉伸缩放函数
    flexible(divEle) {
      let twidth = parseInt(divEle.style.width);
      let theight = parseInt(divEle.style.height);
      const canvasWidth = document.getElementById('bgCanvas').width;
      const canvasHeight = document.getElementById('bgCanvas').height;
      const dLeft = parseInt(divEle.style.left);
      const dTop = parseInt(divEle.style.top);
      let arrows = ''
      const dateArrows = new Date().getTime();
      const idArrows = 'newDiv' + dateArrows + parseInt(Math.random() * 10);
      const arr = divEle.getElementsByTagName('div')
      if (arr.length > 0) {
        divEle.removeChild(arr[0])
      }
      arrows = document.createElement('div')
      arrows.setAttribute('class', 'arrows')
      arrows.setAttribute('id', idArrows)
      arrows.style.position = 'absolute'
      arrows.style.cursor = 'nw-resize'
      arrows.style.left = twidth - 9 + 'px'
      arrows.style.top = theight - 9 + 'px'
      arrows.style.width = 10 + 'px'
      arrows.style.height = 10 + 'px'
      divEle.appendChild(arrows)
      arrows.onmousedown = function(e) {
        const x = e.pageX - e.target.offsetLeft - 10
        const y = e.pageY - e.target.offsetTop - 10
        e.stopPropagation();
        e.preventDefault();
        document.onmousemove = function(e) {
          e.stopPropagation();
          e.preventDefault();
          twidth = e.pageX - x
          theight = e.pageY - y
          // 矩形框最小收缩区域
          if (twidth <= 40) {
            twidth = 40
            theight = e.pageY - y
          }
          if (theight <= 40) {
            twidth = e.pageX - x
            theight = 40
          }
          if (twidth <= 40 && theight <= 40) {
            twidth = 40
            theight = 40
          }
          // 拖拽放大边界检测
          if (twidth >= (canvasWidth - dLeft)) {
            divEle.style.width = (canvasWidth - dLeft) + 'px';
            arrows.style.left = (canvasWidth - dLeft - 9) + 'px';
          } else {
            divEle.style.width = twidth + 'px';
            arrows.style.left = twidth - 9 + 'px'
          }

          if (theight >= (canvasHeight - dTop)) {
            divEle.style.height = (canvasHeight - dTop) + 'px';
            arrows.style.top = (canvasHeight - dTop - 9) + 'px'
          } else {
            divEle.style.height = theight + 'px';
            arrows.style.top = theight - 9 + 'px'
          }

        }
        document.onmouseup = function(e) {
          e.stopPropagation();
          e.preventDefault();
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    },
    // base64转化blob
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(',');
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      console.log(mime)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    // 保存数据
    save() {
      console.log('保存', this.verifyInfo)
      this.verifyInfo.builder = 'admin'
      this.$refs.verifyInfo.validate(valid => {
        if (!valid) return
        // if (!this.testResult) {
        //   this.$message({
        //     type: 'error',
        //     message: '测试结果有误，请检查页面元素类型'
        //   })
        //   return
        // }
        let url = 'verify/add'
        let method = 'POST'
        if (this.verifyInfo.uid) {
          url = 'verify/edit'
          method = 'PUT'
        }
        POST(url, method, this.verifyInfo).then(res => {
          console.log(res)
          this.$hintMsg('success', res)
          this.$router.push('/verify')
        }).catch(err => {
          this.$hintMsg('error', err)
        })
      })

    }
  }
};
</script>

<style lang='less' scoped>
.new-verify{
  height: 100%;
  overflow-y: hidden;
  .content {
    overflow-y:hidden ;
  }
  .title {
    height: 41px;
    line-height: 41px;
    font-size: 12px;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
  }
  .formData{
    height: 100%;
    padding: 10px 10px 10px 10px;
    .el-form{
      height: 100%;
      .row {
        height: 100%;
      }
    }
    .el-select{
        width: 100%;
      }
    .left-container{
      height: 85%;
      overflow-y: scroll;
    }
    .left{
      padding: 0 10px;
      border-bottom: 1px solid #ddd;
    }
    .left-bottom{
      padding: 10px 10px 0 10px;
    }
    .gutter {
      position: relative;
      margin-left: 10px;
      .screen{
        // width: 100%;
        height: 300px;
        margin: 0 auto;
        // margin-left: 10px;
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
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
        .border{
          border: 2px solid red;
          position: absolute;
          z-index: 999;
          cursor: Move;
        }
        .arrows {
          position: absolute;
          border: 1px solid #000 !important;
          z-index: 99;
          cursor: nw-resize;
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
      .link-device{
        position: absolute;
        top:45%;
        left: 50%;
        color:#fff;
      }
    }

  }
}
</style>
