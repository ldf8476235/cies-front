<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2021-01-22 14:22:43
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-01-22 15:35:53
-->
<template>
  <div class="new-verify">
    <Crumbs :crumbs='crumbs' @copy='copy' @edit='edit'></Crumbs>
    <div class="container">
      <div class="content">
        <div class="title">检验点信息</div>
        <div class="formData">
          <el-row class="verifyInfo">
            <el-col :span="12">
              <p><span class='label'>校验点名称：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>所属项目：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>软件版本：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>创建时间：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>修改时间：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>创建人：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>校验点类型：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>校验点描述：</span><span>action_name_01</span></p>
            </el-col>
          </el-row>
          <div class="taskCase">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="gutter">
                  <el-row>
                    <!-- 语音 -->
                    <div v-if="selectVal === 'voice'">
                      <el-col :span="24">
                        <p><span class='label'>预期结果：</span><span>action_name_01</span></p>
                      </el-col>
                      <el-col :span="24">
                        <p><span class='label'>匹配方式：</span><span>action_name_01</span></p>
                      </el-col>
                      <el-col :span="24">
                        <p><span class='label'>匹配结果：</span><span>action_name_01</span></p>
                      </el-col>
                      <el-col :span="24">
                        <p><span class='label'>超时时长：</span><span>action_name_01</span></p>
                      </el-col>
                    </div>
                    <!-- 日志 -->
                    <div v-if="selectVal === 'log'">
                      <el-col :span="24">
                        <p><span class='label'>预期结果：</span><span>action_name_01</span></p>
                      </el-col>
                      <el-col :span="24">
                        <p><span class='label'>匹配结果：</span><span>action_name_01</span></p>
                      </el-col>
                      <el-col :span="24">
                        <p><span class='label'>超时时长：</span><span>action_name_01</span></p>
                      </el-col>
                    </div>
                    <!-- 音频 -->
                    <div v-if="selectVal === 'audio'">
                      <el-col :span="24">
                        <p><span class='label'>预期结果：</span><span>action_name_01</span></p>
                      </el-col>
                      <el-col :span="24">
                        <p><span class='label'>匹配结果：</span><span>action_name_01</span></p>
                      </el-col>
                      <el-col :span="24">
                        <p><span class='label'>超时时长：</span><span>action_name_01</span></p>
                      </el-col>
                    </div>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
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
      selectVal: 'voice', // 选中项
      verifyInfo: {}
    };
  },
  mounted() {
  },
  methods: {

    // 复制
    copy() {
      console.log('保存', this.verifyInfo)
    },
    // 编辑
    edit() {}
  }
};
</script>

<style lang='less' scoped>
.new-verify {
  .title {
    height: 41px;
    line-height: 41px;
    font-size: 12px;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
  }
  .formData {
    padding: 20px 20px;
    .verifyInfo{
      padding-bottom: 10px;
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
    .taskCase {
      padding: 10px 0;
      border-top: 1px solid #DDDDDD;
    }
  }
}
</style>
