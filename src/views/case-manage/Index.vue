<!--
 * @Author: wh
 * @Date: 2020-11-30 17:34:55
 * @LastEditTime: 2020-12-03 12:36:38
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
        <div class="funcTop">
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
        </div>
        <div class="tableContent">
          <el-table :data="caseList" border style="width: 100%">
            <el-table-column type="selection" align="center" width="55">
            </el-table-column>
            <el-table-column prop="date" label="用例名称" width="180">
            </el-table-column>
            <el-table-column prop="name" label="所属项目" min-width="180">
            </el-table-column>
            <el-table-column prop="name" label="创建人" width="180">
            </el-table-column>
            <el-table-column prop="name" label="软件版本" width="140">
            </el-table-column>
            <el-table-column prop="name" label="创建时间" width="140">
            </el-table-column>
            <el-table-column prop="name" label="更新时间" width="180">
            </el-table-column>
            <el-table-column prop="name" label="操作" width="180">
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
export default {
  name: "Case",
  data() {
    return {
      total: 0,
      pageSize: 10,
      currPage: 1,
      // 选择项内容
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
      inputKey: "", // 搜索输入项
      caseList: [{}], // 任务列表
    };
  },
  methods: {
    // 新建任务
    goNewCase() {
      this.$router.push("/case/newcase");
    },
  },
};
</script>

<style lang='less' scoped>
@import "../../assets/css/pub.less";
.case {
  .content {
    padding: 20px;
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
