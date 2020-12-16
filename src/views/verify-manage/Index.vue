<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-02 18:31:44
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2020-12-15 15:52:16
-->
<template>
  <div class="action">
    <Crumbs :crumbs='crumbs'></Crumbs>
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
            <el-button  type="primary" icon="el-icon-plus" @click="goNewVerify">新建校验点</el-button>

          </div>
        </div> -->
        <Func :options='options' @goNew='goNewVerify' :txt='text'></Func>
        <div class="tableContent">
          <el-table :data="actionList" border style="width: 100%">
            <el-table-column type="selection" align="center" width="55">
            </el-table-column>
            <el-table-column prop="name" label="类型" width="50">
              <template>
                <svg-icon data_iconName="icon-gesture" className="icon"/>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="检验点名称" min-width="180">
            </el-table-column>
            <el-table-column prop="name" label="所属项目" width="180">
            </el-table-column>
            <el-table-column prop="name" label="创建人" width="180">
            </el-table-column>
            <el-table-column prop="name" label="软件版本" width="140">
            </el-table-column>
            <el-table-column prop="name" label="创建时间" width="140">
            </el-table-column>
            <el-table-column prop="name" label="更新时间" width="140">
            </el-table-column>
            <el-table-column prop="name" label="操作" width="60">
              <el-popover
                placement="bottom"
                width="100"
                trigger="click">
                <p><svg-icon data_iconName="icon-edit" className="icon"/><span>编辑</span></p>
                <p><svg-icon data_iconName="icon-copy" className="icon"/><span>复制</span></p>
                <p><svg-icon data_iconName="icon-delete" className="icon"/><span>删除</span></p>
                <!-- <el-button slot="reference"><i  class="el-icon-more"></i></el-button> -->
                <div slot="reference">
                    <svg-icon data_iconName='icon-more'></svg-icon>
                  </div>
              </el-popover>
            </el-table-column>
          </el-table>

          <!-- <action-list></action-list> -->
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
  name: 'Action',
  components: {
    Func
  },
  data() {
    return {
      crumbs: { // 面包屑内容
        action: false,
        name: '检验点管理'
      },
      text: '新建校验点',
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
      tabIndex: 1,
      actionList: [{}] // 动作列表

    };
  },
  methods: {
    // 新建任务
    goNewVerify() {
      this.$router.push('/verify/newimage')
    }
  }
};
</script>

<style lang='less' scoped>
// @import "../../assets/css/pub.less";
.action {
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
        padding: 7px 8px;
        span{
          padding:0 3px;
        }
        i {
          font-weight: 600;
        }
      }
    }
  }
  .tableContent {
    margin-top: 10px;
  }
}
</style>

