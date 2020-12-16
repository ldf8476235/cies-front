<!--
 * @Author: wh
 * @Date: 2020-11-30 17:34:55
 * @LastEditTime: 2020-12-15 18:05:15
 * @LastEditors: wh
 * @Description: In User Settings Edit
 * @FilePath: \cies-front\src\views\case-manage\Index.vue
-->
<template>
  <div class="case">
    <div class="crumbs">
      <span>用例列表</span>
    </div>
    <div class="container">
      <div class="content">
        <!-- <div class="funcTop">
          <div class="search">
            <el-select v-model="selectVal" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-input v-model="inputKey" placeholder="请输入内容">
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <div class="newBtn">
            <el-button @click="goNewCase" type="primary" icon="el-icon-plus"
              >新建用例</el-button>
          </div>
        </div> -->
        <Func :options='options' @goNew='goNewCase' :txt='text'></Func>
        <div class="tableContent">
          <el-table :data="caseList" border style="width: 100%">
            <el-table-column type="selection" align="center" width="55">
            </el-table-column>
            <el-table-column prop="caseName" label="用例名称" width="180">
            </el-table-column>
            <el-table-column prop="caseCite" label="引用" width="60">
            </el-table-column>
            <el-table-column prop="caseProject" label="所属项目" min-width="180">
            </el-table-column>
            <el-table-column prop="caseCreator" label="创建人" width="180">
            </el-table-column>
            <el-table-column prop="caseVersion" label="软件版本" width="140">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="140">
            </el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="180">
            </el-table-column>
            <el-table-column prop="" label="操作" width="60">
              <template slot-scope="scope">
                <el-popover
                  placement="bottom"
                  width="100"
                  trigger="click">
                  <p @click="editCase(scope.$index)">
                    <svg-icon data_iconName="icon-edit" className="icon-gesture"/>
                    <span>编辑</span>
                  </p>
                  <p @click="copyCase"><svg-icon data_iconName="icon-copy" className="icon-gesture"/><span>复制</span></p>
                  <p><svg-icon data_iconName="icon-report" className="icon-gesture"/><span>报告</span></p>
                  <p @click="delCase"><svg-icon data_iconName="icon-delete" className="icon-gesture"/><span>删除</span></p>
                  <!-- <el-button slot="reference"><i  class="el-icon-more"></i></el-button> -->
                  <div slot="reference">
                    <svg-icon data_iconName='icon-more'></svg-icon>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <PageUtil
          ref="pageutil"
          :total="total"
          :pageSize="pageSize"
          :currPage="currPage"
        ></PageUtil>
      </div>
    </div>
  </div>
</template>

<script>
import Func from '@/components/seach-func-header/Func.vue'
export default {
  name: 'Case',
  components: {
    Func
  },
  data() {
    return {
      text: '新建用例',
      total: 0,
      pageSize: 10,
      currPage: 1,
      // 选择项内容
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      selectVal: '', // 选中项
      inputKey: '', // 搜索输入项
      caseList: [] // 任务列表
    };
  },
  created() {
    this.getCaseList()
  },
  mounted() {},
  methods: {
    // 获取case列表
    getCaseList() {
      const url = 'case/list'
      this.$http.get(url).then(res => {
        console.log(res)
        if (res.code === 1) {
          this.caseList = res.data.list
        }
      })
    },
    // 删除用例
    delCase() {

    },
    // 复制用例
    copyCase() {

    },
    // 编辑用例
    editCase(id) {
      console.log(id)
      this.$router.push({
        path: '/case/newcase',
        query: {
          id: id
        }
      });
    },
    // 新建用例
    goNewCase() {
      this.$router.push('/case/newcase');
    }
  }
};
</script>

<style lang='less' scoped>
@import "../../assets/css/pub.less";
.case {
  .content {
    padding: 20px;
    box-sizing: border-box;
  }
  .funcTop {
    display: flex;
    justify-content: space-between;
    .search {
      .el-select {
        width: 90px;
        height: 30px;
        .el-input {
          width: 100%;
          margin-left: 0px;
        }
      }
      .el-input {
        width: 180px;
        height: 30px;
        margin-left: 10px;
        i {
          cursor: pointer;
        }
      }
    }
    .newBtn {
      .el-button {
        // width: 100px;
        // height: 30px;
        // padding: 0;
        // font-size: 12px;
      }
    }
  }
  .tableContent {
    margin-top: 10px;
  }
}
</style>
