<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2021-01-22 14:22:34
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-01-22 15:27:32
-->
<template>
  <div class="new-verify">
    <Crumbs :crumbs='crumbs' @copy='copy' @edit='edit'></Crumbs>
    <div class="container">
      <div class="content">
        <div class="title">检验点信息</div>
        <el-row class="formData">
          <el-col :span="9">
            <el-row class="left">
              <el-col :span="24">
                <p><span class='label'>校验点名称：</span><span>action_name_01</span></p>
              </el-col>
              <el-col :span="24">
                <p><span class='label'>所属项目：</span><span>action_name_01</span></p>
              </el-col>
              <el-col :span="24">
                <p><span class='label'>软件版本：</span><span>action_name_01</span></p>
              </el-col>
              <el-col :span="24">
                <p><span class='label'>创建时间：</span><span>action_name_01</span></p>
              </el-col>
              <el-col :span="24">
                <p><span class='label'>修改时间：</span><span>action_name_01</span></p>
              </el-col>
              <el-col :span="24">
                <p><span class='label'>创建人：</span><span>action_name_01</span></p>
              </el-col>
              <el-col :span="24">
                <p><span class='label'>校验点类型：</span><span>action_name_01</span></p>
              </el-col>
              <el-col :span="24">
                <p><span class='label'>校验点描述：</span><span>action_name_01</span></p>
              </el-col>
            </el-row>
            <el-row class="left-bottom">
              <!-- 图像 -->
              <div v-if="selectVal === 'img'">
                <el-col :span="24">
                  <p><span class='label'>匹配结果：</span><span>action_name_01</span></p>
                </el-col>
                <el-col :span="24">
                  <p><span class='label'>类型：</span><span>图像采集 </span><span> 校验范围</span></p>
                </el-col>
                <el-col :span="24">
                  <p><span class='label'>超时时间：</span><span>3000</span></p>
                </el-col>
              </div>
              <!-- 文本 -->
              <div v-if="selectVal === 'txt'">
                <el-col :span="24">
                  <p><span class='label'>文本内容：</span><span>3000</span></p>
                </el-col>
                <el-col :span="24">
                  <p><span class='label'>匹配规则：</span><span>3000</span></p>
                </el-col>
                <el-col :span="24">
                  <p><span class='label'>匹配结果：</span><span>3000</span></p>
                </el-col>
                <el-col :span="24">
                  <p><span class='label'>类型：</span><span>图像采集 </span><span> 检验范围</span></p>
                </el-col>
                <el-col :span="24">
                  <p><span class='label'>超时时间：</span><span>3000</span></p>
                </el-col>
              </div>
              <!-- 页面 -->
              <div v-if="selectVal === 'page'">
                <el-col :span="24">
                  <p><span class='label'>页面元素：</span><span>3000</span></p>
                </el-col>
                <el-col :span="24">
                  <p><span class='label'>页面内容：</span><span>3000</span></p>
                </el-col>
                <el-col :span="24">
                  <p><span class='label'>匹配结果：</span><span>3000</span></p>
                </el-col>
                <el-col :span="24">
                  <p><span class='label'>超时时间：</span><span>3000</span></p>
                </el-col>
              </div>
            </el-row>
          </el-col>
          <el-col :span="15" class="right-image">
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
      screenLoading: true, // 屏幕未加载完成loading动画
      selectVal: 'page', // 选中项
      verifyInfo: {},
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
      domArr: [] // 动态插入dom元素数组
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
    loadLiveScreen() {
      var self = this;
      var BLANK_IMG =
        'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
      // var protocol = location.protocol == 'http:' ? 'ws://' : 'wss://'
      var ws = new WebSocket(this.screenWebSocketUrl);
      var canvas = document.getElementById('bgCanvas')
      var ctx = canvas.getContext('2d');
      const screen = document.getElementsByClassName('screen')[0]
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
    // 复制
    copy() {
      console.log('保存', this.verifyInfo)
    },
    // 编辑
    edit() {

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
    .left{
      padding: 0 0px 10px 10px;
      margin-right: 10px;
      border-bottom: 1px solid #ddd;

    }
    p{
      height: 30px;
      line-height: 30px;
      .label{
        text-align: right;
        width: 80px;
        display: inline-block;
      }
    }
    .left-bottom{
      padding: 0 10px;
    }
    .right-image{
      border-left: 1px solid #ddd;
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
}
</style>
