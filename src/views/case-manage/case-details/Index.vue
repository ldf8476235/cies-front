<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-09 10:30:22
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-02-03 14:50:38
-->
<template>
  <div class="case-details">
    <Crumbs :crumbs='crumbs' @edit='edit' @copy='copy'></Crumbs>
    <div class="container">
      <div class="content">
        <div class="title">用例信息</div>
        <div class="formData">
          <div class="caseInfo">
            <el-row class="">
              <el-col :span="12">
                <p><span>用例名称：</span><span class="width-span">{{caseInfo.name}}</span></p>
              </el-col>
              <el-col :span="12">
                <p><span>软件版本：</span><span class="width-span">{{caseInfo.version}}</span></p>
              </el-col>
              <el-col :span="12">
                <p><span>所属项目：</span><span class="width-span">{{caseInfo.project}}</span></p>
              </el-col>
              <el-col :span="12">
                <p><span>创建人：</span><span class="width-span">{{caseInfo.builder}}</span></p>
              </el-col>
              <el-col :span="12">
                <p><span>创建时间：</span><span class="width-span">{{caseInfo.time_create}}</span></p>
              </el-col>
              <el-col :span="12">
                <p><span>更新时间：</span><span class="width-span">{{caseInfo.time_modify}}</span></p>
              </el-col>
              <el-col :span="12">
                <p><span>用例描述：</span><span class="width-span">{{caseInfo.desc}}</span></p>
              </el-col>
            </el-row>
          </div>
          <div class="taskCase">
            <div class="action-list-title">动作列表</div>
            <el-table
              width="100%"
              :data="caseInfo.action"
              class="borderTop"
              >
              <el-table-column
                type="index"
                label="序号"
                width="55">
              </el-table-column>
              <el-table-column
                label="动作类型"
                width="100">
                <template>
                  <svg-icon data_iconName="icon-gesture" className="icon-gesture"/>
                </template>
              </el-table-column>
              <el-table-column label="动作名称">
                <template slot-scope="scope">
                  <span> {{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column label="循环次数">
                <template slot-scope="scope">
                  <span> {{scope.row.loop_count}}12</span>
                </template>
              </el-table-column>
              <el-table-column label="出错处理">
                <template slot-scope="scope">
                  <span> {{scope.row.error}}跳出</span>
                </template>
              </el-table-column>

              <el-table-column label="执行后等待">
                <template slot-scope="scope">
                  <span>{{scope.row.execute_wait}}无处理</span>
                </template>
              </el-table-column>
              <el-table-column label="执行位置">
                <template slot-scope="scope">
                  <span>被测设备</span>
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
import { GET } from '@/utils/api.js';
export default {
  name: 'CaseDetails',
  data() {
    return {
      crumbs: {
        action: true,
        details: true,
        name: ''
      },
      caseInfo: {
        action: [
          // {
          //   editNode: false,
          //   editLoop: false,
          //   nodeName: '节点名称1',
          //   loop_count: 10,
          //   error: '123',
          //   overtime: 'asdasd',
          //   executeWait: 'aq2134'
          // },
          // {
          //   editNode: false,
          //   editLoop: false,
          //   nodeName: '节点名称2',
          //   loop_count: 10,
          //   error: '123',
          //   overtime: 'asdasd',
          //   executeWait: 'aq2134'
          // }
        ]
      }
    };
  },
  mounted() {
    this.getDetails()
  },
  methods: {
    // 获取详情
    getDetails() {
      const uid = this.$route.query.uid
      const url = `case/detail/?uid=${uid}`
      GET(url).then(data => {
        this.caseInfo = data.result[0]
        this.crumbs.name = this.caseInfo.name
      })
    },
    // 复制
    copy() {
      console.log('复制')
    },
    // 编辑
    edit() {
      const uid = this.$route.query.uid
      this.$router.push(
        {
          path: '/case/newcase',
          query: {
            uid
          }
        }
      )
      console.log('编辑')
    }
  }
};
</script>

<style lang='less' scoped>
.case-details{
  .title {
    height: 41px;
    line-height: 41px;
    font-size: 12px;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
  }
  .formData {
    padding: 20px 0px;
    .caseInfo{
      padding:10px 20px;

      p{
        font-size: 12px;
        line-height: 18px;
         margin-bottom: 18px;
        span{
          display: inline-block;
          width: 60px;
          text-align: right;
        }
        .width-span{
          width: 80%;
          text-align: left;
        }
      }
      .el-input {
        width: 50%;
      }
      .el-select {
        width: 50%;
      }
      .el-textarea {
        width: 50%;
      }
    }
    .taskCase {
      padding: 0 20px;
      .text-title{
        font-size: 12px;
        .del-color{
          color: #006CEB;
        }
      }
      .borderTop{
        border-top: 1px solid #EBEEF5;
      }
      .action-list-title{
        height: 41px;
        line-height: 41px;
        font-size: 12px;
        // padding: 0 20px;
        // border-bottom: 1px solid #ddd;
      }
    }
  }
  .info{
    // padding:10px 20px;
  }

}
</style>

