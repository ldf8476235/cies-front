<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2021-01-22 10:21:45
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-01-22 14:00:34
-->
<template>
  <div class="new-voice">
    <Crumbs :crumbs='crumbs' @copy='copy'></Crumbs>
    <div class="container">
      <div class="content">
        <div class="title">动作信息</div>
        <div class="formData">
          <el-row class="voiceInfo">
            <el-col :span="12">
              <p><span class='label'>动作名称：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>所属项目：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>动作类型：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>软件版本：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>创建人：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>超时时间：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>创建时间：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>更新时间：</span><span>action_name_01</span></p>
            </el-col>
            <el-col :span="12">
              <p><span class='label'>动作描述：</span><span>action_name_01</span></p>
            </el-col>
          </el-row>
          <div class="taskCase">
            <el-row class="text-title">
              <p>
                语音列表
              </p>
            </el-row>
            <el-table
              width="100%"
              class='borderTop'
              :data="voiceInfo.actionData"
              >
              <el-table-column
                type="index"
                label="#"
                align="center"
                width="40">
              </el-table-column>
              <el-table-column label="语音名称"  width='180'>
                <template slot-scope="scope">
                  语音名称
                </template>
              </el-table-column>
              <el-table-column label="执行后等待">
                <template slot-scope="scope">
                  执行后等待
                </template>
              </el-table-column>
            </el-table>
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
        details: true,
        name: '新建动作'
      },
      voiceInfo: {
        actionType: 1,
        actionData: [
          {
            voiceName: '节点名称1',
            executeWait: 'aq2134'
          },
          {
            voiceName: '节点名称2',
            executeWait: 'aq2134'
          }
        ]
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.crumbs.name = 'action_name_1'
    }, 200);
  },
  methods: {
    copy() {

    },
    edit() {

    }
  }
};
</script>

<style lang='less' scoped>
.new-voice {
  .title {
    height: 41px;
    line-height: 41px;
    font-size: 12px;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
  }
  .formData {
    padding: 20px 0px;
    .voiceInfo{
      padding-bottom: 20px;
       p{
        height: 30px;
        line-height: 30px;
        .label{
          text-align: right;
          width: 80px;
          display: inline-block;
        }
      }
    }
    .taskCase {
      padding: 0 20px;
      .text-title{
        font-size: 12px;
        margin-bottom: 5px;
        .del-color{
          color: #006CEB;
        }
      }
    }
    .borderTop{
      border-top: 1px solid #EBEEF5;
    }
  }

}
</style>
