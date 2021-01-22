<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-10 16:07:02
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-01-21 11:36:03
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
            <div class="verifyInfo">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="校验点名称：" prop="device_name">
                    <el-input
                      :suffix-icon="loading ? 'el-icon-loading' : ''"
                      v-model.trim="verifyInfo.device_name"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
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
                <el-col :span="12">
                  <el-form-item label="软件版本：">
                    <el-input
                      v-model="verifyInfo.device_sn"
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="检验类型：" prop="device_space">
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
                <el-col :span="12">
                  <el-form-item label="校验点描述：">
                    <el-input
                      type="textarea"
                      v-model="verifyInfo.device_desc"
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
                      <!-- 语音 -->
                      <div v-if="selectVal === 'voice'">
                        <el-col :span="24">
                          <el-form-item label="预期结果：">
                            <el-input
                              type="textarea"
                              v-model="verifyInfo.device_desc"
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
                              v-model="verifyInfo.device_desc"
                              placeholder="请输入"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </div>
                      <!-- 日志 -->
                      <div v-if="selectVal === 'log'">
                        <el-col :span="24">
                          <el-form-item label="预期结果：">
                            <el-input
                              type="textarea"
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
                      </div>
                      <!-- 音频 -->
                      <div v-if="selectVal === 'audio'">
                        <el-col :span="24">
                          <el-form-item label="预期结果：">
                            <!-- <el-input
                              type="textarea"
                              v-model="verifyInfo.device_desc"
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
                              v-model="verifyInfo.device_desc"
                              placeholder="请输入"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </div>
                    </el-row>
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
export default {
  name: 'NewVoice',
  data() {
    return {
      crumbs: {
        action: true,
        name: '新建校验点'
      },
      loading: false, // 任务名称动态验证动画
      selectTypeList: [ // 选择类型
        {
          value: 'voice',
          label: '语音'
        },
        {
          value: 'log',
          label: '日志'
        },
        {
          value: 'audio',
          label: '音频'
        }
      ],

      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        }
      ],
      selectVal: 'voice', // 选中项
      tabClickIndex: '',
      verifyInfo: {},
      rulesCaseInfo: {
      },
      belongPreject: [] // 所属项目
    };
  },
  mounted() {
  },
  computed: {
  },
  watch: {
  },
  methods: {
    // 图片采集
    imgCollect() {

    },
    // 选择类型
    selectType(e) {
      this.selectVal = e
    },

    // 保存数据
    save() {
      console.log('保存', this.verifyInfo)
    }
  }
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
    .verifyInfo{

    }
    .taskCase {
      // height: 100%;
      padding: 10px 0;
      border-top: 1px solid #DDDDDD;
      .screen{
          width: 100%;
          height: 330px;
          position: relative;
          overflow-x: hidden;
          overflow-y: auto;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          flex: 1;
          background-color: gray;
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

        }
      .gutter {
        // background: #ccc;
      }
    }
  }

}
</style>
