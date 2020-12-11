<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-10 16:07:02
 * @LastEditors: wh
 * @Description: 
 * @LastEditTime: 2020-12-11 13:52:26
-->
<template>
  <div class="new-verify">
    <Crumbs :crumbs='crumbs' @save='save'></Crumbs>
    <div class="container">
      <div class="content">
        <div class="title">检验点信息</div>
        <div class="formData">
          <el-form
            ref="caseInfo"
            :model="caseInfo"
            :rules="rulesCaseInfo"
            label-width="100px"
          >
            <div class="caseInfo">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="校验点名称：" prop="device_name">
                    <el-input
                      :suffix-icon="loading ? 'el-icon-loading' : ''"
                      v-model.trim="caseInfo.device_name"
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
                      v-model="caseInfo.device_sn"
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                </el-col>
                
                <el-col :span="12">
                  <el-form-item label="校验点描述：">
                    <el-input
                      type="textarea"
                      v-model="caseInfo.device_desc"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="taskCase">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="gutter">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="检验类型：" prop="device_space">
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
                      <!-- 图像 -->
                      <div v-if="false">
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
                          <el-form-item label="超时时长：">
                            <el-input
                              v-model="caseInfo.device_desc"
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
                      <div v-if="false">
                        <el-col :span="24">
                          <el-form-item label="文本内容：">
                            <el-input
                              type="textarea"
                              v-model="caseInfo.device_desc"
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
                          <el-form-item label="超时时长：">
                            <el-input
                              v-model="caseInfo.device_desc"
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
                      <!-- 语音 -->
                      <div v-if="false">
                        <el-col :span="24">
                          <el-form-item label="预期结果：">
                            <el-input
                              type="textarea"
                              v-model="caseInfo.device_desc"
                              placeholder="请输入"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="匹配方式：" prop="device_space">
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
                          <el-form-item label="超时时长：">
                            <el-input
                              v-model="caseInfo.device_desc"
                              placeholder="请输入"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </div>
                      <!-- 日志 -->
                      <div v-if="false">
                        <el-col :span="24">
                          <el-form-item label="预期结果：">
                            <el-input
                              type="textarea"
                              v-model="caseInfo.device_desc"
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
                              v-model="caseInfo.device_desc"
                              placeholder="请输入"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </div>
                      <!-- 音频 -->
                      <div v-if="false">
                        <el-col :span="24">
                          <el-form-item label="预期结果：">
                            <!-- <el-input
                              type="textarea"
                              v-model="caseInfo.device_desc"
                              placeholder="请输入"
                            ></el-input> -->
                            <el-button>浏览</el-button>
                            <span style="padding:0 5px;">空调提示音</span>
                            <el-button>
                              <i class="el-icon-caret-right"></i>
                            </el-button>
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
                              v-model="caseInfo.device_desc"
                              placeholder="请输入"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </div>
                      <div>
                        <el-col :span="24">
                          <el-form-item label="页面元素：">
                            <el-input
                              v-model="caseInfo.device_desc"
                              placeholder="请输入"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="页面内容：">
                            <el-input
                              v-model="caseInfo.device_desc"
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
                              v-model="caseInfo.device_desc"
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
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="gutter">
                    <div class="screen" ref="screen">
                      <canvas id="bgCanvas" class="canvas-bg" :style="canvasStyle"></canvas>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { b64toBlob, ImagePool} from "@/utils/common.js";
export default {
  name: 'NewVoice',
  data() {
    return {
      crumbs:{
        action:true,
        name:'新建校验点'
      },
      loading: true, //任务名称动态验证动画
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
      caseInfo: {
        caseInfoTable: [
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
      rulesCaseInfo: {
        caseInfoTable: {},
      },
      deviceId:'android:',
      canvas: {   // 画布
        bg: null,
        fg: null,
      },
      canvasStyle: { //画布内联style
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
    };
  },
  created(){
    this.imagePool = new ImagePool(100);
  },
  mounted(){
    this.getCurrentScreen()
    this.canvas.bg = document.querySelector('#bgCanvas')
    window.onresize = () => {
      this.resizeScreen()
    }
  },
  computed:{
  },
  watch:{
  },
  methods: {
    // wh-获取当前屏幕截图
    getCurrentScreen(){
      this.$axios.get('/api/v1/devices/' + encodeURIComponent(this.deviceId || '-') + '/screenshot').then(res => {
        console.log(res)
        console.log('screenRefresh----:',res)
        var blob = b64toBlob(res.data, 'image/' + res.type);
        this.drawBlobImageToScreen(blob);
        // this.dumpHierarchy().then(this.loadLiveScreen)
        localStorage.setItem('screenshotBase64', res.data);
      }).catch(err => {
        console.log('err:',err)
      })
    },
    // wh-绘制当前屏幕
    drawBlobImageToScreen (blob) {
      var bgcanvas = this.canvas.bg,
        ctx = bgcanvas.getContext('2d'),
        self = this,
        URL = window.URL || window.webkitURL,
        BLANK_IMG = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        
        img = this.imagePool.next();
      img.onload = function () {
        bgcanvas.width = img.width
        bgcanvas.height = img.height
        console.log(img.width,img.height)
        // var screenDiv = document.getElementById('screen');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        // self.resizeScreen(img);

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
      }
      var url = URL.createObjectURL(blob)
      img.src = url;
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
        var screenDiv =this.$refs.screen //document.getElementById('screen');
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
        console.log(img.width,img.height)
        console.log('sssssssssssssssss',screenDiv.clientWidth,screenDiv.clientHeight)
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
    // 保存数据
    save(){
      console.log('保存')
    }
  },
};
</script>

<style lang='less' scoped>
.new-verify {
  // height: 100%;
  .title {
    height: 41px;
    line-height: 41px;
    font-size: 12px;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
  }
  .formData {
    .el-input {
        width: 50%;
      }
      .el-select {
        width: 50%;
      }
      .el-textarea {
        width: 50%;
      }
    padding: 20px 20px;
    .caseInfo{
      
    }
    .taskCase {
      // height: 100%;
      padding: 10px 0;
      border-top: 1px solid #DDDDDD;
      .screen{
          // width: 100%;
          height: 330px;
          // position: relative;
          overflow-x: hidden;
          overflow-y: auto;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          flex: 1;
          background-color: gray;
          .canvas-fg {
            // z-index: 1;
            // position: absolute;
          }

          .canvas-bg {
            // z-index: 0;
            // position: absolute;
          }
        }
      .gutter {
        // background: #ccc;
      }
    }
  }
  
}
</style>