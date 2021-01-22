<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-10 16:06:41
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-01-22 11:14:08
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
            label-width="100px"
            >
            <el-row>
              <el-col :span="9">
                <el-row class="left">
                  <el-col :span="24">
                    <el-form-item label="校验点名称：" prop="device_name">
                      <el-input
                        :suffix-icon="loading ? 'el-icon-loading' : ''"
                        v-model.trim="verifyInfo.device_name"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="所属项目：" prop="device_space">
                      <el-select v-model="verifyInfo.selectVal" placeholder="请选择">
                        <el-option
                          v-for="item in belongPreject"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="软件版本：">
                      <el-input
                        v-model="verifyInfo.device_sn"
                        placeholder=""
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="检验点类型：" prop="device_space">
                      <el-select v-model="selectVal" @change="selectType" placeholder="请选择">
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
                        v-model="verifyInfo.device_desc"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="left-bottom">
                  <!-- 图像 -->
                  <div v-if="selectVal === 'img'">
                    <el-col :span="24">
                      <el-form-item label="匹配结果：" prop="device_space">
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
                    <el-col :span="24">
                      <el-form-item label="类型：">
                        <el-button @click="imgCollect">图像采集</el-button>
                        <el-button>检验范围</el-button>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="超时时长：">
                        <el-input
                          v-model="verifyInfo.device_desc"
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
                  <!-- 文本 -->
                  <div v-if="selectVal === 'txt'">
                    <el-col :span="24">
                      <el-form-item label="文本内容：">
                        <el-input
                          type="textarea"
                          v-model="verifyInfo.device_desc"
                          placeholder="请输入"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="匹配规则：" prop="device_space">
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
                    <el-col :span="24">
                      <el-form-item label="匹配结果：" prop="device_space">
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
                    <el-col :span="24">
                      <el-form-item label="类型：">
                        <el-button>图像采集</el-button>
                        <el-button>检验范围</el-button>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="超时时间：">
                        <el-input
                          v-model="verifyInfo.device_desc"
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
                    <el-col :span="24">
                      <el-form-item label="链接设备：" prop="device_space">
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
                  </div>
                  <!-- 页面 -->
                  <div v-if="selectVal === 'page'">
                    <el-col :span="24">
                      <el-form-item label="页面元素：">
                        <el-input
                          v-model="verifyInfo.device_desc"
                          placeholder="请输入"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="页面内容：">
                        <el-input
                          v-model="verifyInfo.device_desc"
                          placeholder="请输入"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="匹配结果：" prop="device_space">
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
                    <el-col :span="24">
                      <el-form-item label="超时时长：">
                        <el-input
                          v-model="verifyInfo.device_desc"
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
                </el-row>
              </el-col>
              <el-col :span="15">
                <div class="gutter" >
                  <div class="screen" ref="screen" >
                    <canvas id="bgCanvas" class="canvas-bg" @mousedown.stop.prevent="mouseDown" :style="canvasStyle"></canvas>
                    <template v-if="domArr.length > 0">
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
export default {
  name: '',
  data() {
    return {
      crumbs: {
        action: true,
        name: '新建校验点'
      },
      loading: false, // 任务名称动态验证动画
      selectTypeList: [ // 选择类型
        {
          value: 'img',
          label: '图像'
        },
        {
          value: 'txt',
          label: '文本'
        },
        {
          value: 'page',
          label: '页面'
        }
      ],
      screenLoading: true, // 屏幕未加载完成loading动画
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
      selectVal: 'img', // 选中项
      tabClickIndex: '',
      verifyInfo: {},
      rulesCaseInfo: {
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
      belongPreject: [] // 所属项目
    };
  },
  created() {
    this.imagePool = new ImagePool(100);
  },
  mounted() {
    this.doConnect()
    this.getCurrentScreen()
    this.canvas.bg = document.querySelector('#bgCanvas')
    window.onresize = () => {
      // this.resizeScreen()
    }
  },
  methods: {
    // 图片采集
    imgCollect() {

    },
    // 选择类型
    selectType(e) {
      this.selectVal = e
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
    // wh-获取当前屏幕截图
    getCurrentScreen() {
      this.$axios.get('/api/v1/devices/' + encodeURIComponent(this.deviceId || '-') + '/screenshot').then(res => {
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
      const bgcanvas = this.canvas.bg;
      const ctx = bgcanvas.getContext('2d');
      const URL = window.URL || window.webkitURL;
      const BLANK_IMG = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
      const screen = document.getElementsByClassName('screen')[0]

      let img = this.imagePool.next();
      let url = URL.createObjectURL(blob)
      img.src = url;
      img.onload = function() {
        const w = bgcanvas.width = img.width;
        const h = bgcanvas.height = img.height
        console.log(img.width, img.height)
        const r = img.width / img.height
        if (w > h) {
          screen.style.width = Math.floor(330 * r) + 'px'
          screen.style.height = '330px'
        } else {
          screen.style.width = Math.floor(500 * r) + 'px'
          screen.style.height = '500px'
        }
        // let screenDiv = document.getElementById('screen');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        // self.resizeScreen(img);

        /**
         * 尝试强制清除所有东西以消除内存泄漏。
         * 尽管如此，当开发者工具打开时，Chrome仍然会泄漏大量的内存，可能是为了节省检查的资源。
         * 关闭开发人员工具时，内存不会泄漏。
        */

        img.onload = img.onerror = null
        img.src = BLANK_IMG
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

    loadLiveHierarchy() {
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
      const screen = document.getElementsByClassName('screen')[0]

      // self.loadLiveHierarchy() // 计算手机app所有元素的黑色框
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
          const w = canvas.width = img.width
          const h = canvas.height = img.height
          const r = img.width / img.height
          if (w > h) {
            screen.style.width = Math.floor(330 * r) + 'px'
            screen.style.height = '330px'
          } else {
            screen.style.width = Math.floor(500 * r) + 'px'
            screen.style.height = '500px'
          }
          ctx.drawImage(img, 0, 0, img.width, img.height);
          // self.resizeScreen(img);
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
      const screenDiv = this.$refs.screen // document.getElementById('screen');
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

      // let canvasRatio = img.width / img.height;
      // let screenRatio = screenDiv.clientWidth / screenDiv.clientHeight;
      console.log(img.width, img.height)
      // Object.assign(this.canvasStyle, {
      //   width: Math.floor(screenDiv.clientHeight * canvasRatio) + 'px', //'inherit',
      //   height: Math.floor(screenDiv.clientHeight) + 'px', //'100%',
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
    // 鼠标按下
    mouseDown(e) {
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
          // if (width < 40 || height < 40) {
          //   // divEle.remove()
          //   _this.domArr = _this.domArr.filter(item => {
          //     return id !== item.id
          //   })
          //   // alert('选中区域过小')
          //   document.onmousemove = null
          //   document.onmouseup = null
          //   return
          // } else {
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
          // }
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
    }
  }
};
</script>

<style lang='less' scoped>
.new-verify{
  .title {
    height: 41px;
    line-height: 41px;
    font-size: 12px;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
  }
  .formData{
    padding: 10px 10px 10px 10px;
    .el-select{
        width: 100%;
      }
    .left{
      padding: 0 10px;

      border-bottom: 1px solid #ddd;
    }
    .left-bottom{
      padding: 10px 10px 0 10px;
    }
    .screen{
      // width: 100%;
      // height: 330px;
      margin: 0 auto;
      position: relative;
      overflow-x: hidden;
      overflow-y: auto;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      flex: 1;
      // background-color: gray;
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
        // display: flex;
        // justify-content: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 101px;
        height: 116px;
      }

    }
  }
}
</style>
