<!--
 * @Author: wh
 * @Date: 2020-11-30 17:38:03
 * @LastEditTime: 2021-02-01 17:00:11
 * @LastEditors: wh
 * @Description: In User Settings Edit
 * @FilePath: \cies-front\src\views\user-manage\Index.vue
-->
<template>
  <div class="role">
    <div class="crumbs">
      <span>角色列表</span>
    </div>
    <div class="container">
      <div class="content">
        <div class="funcTop">
          <div class="search">
            <el-input v-model="keyword" placeholder="请输入关键字">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="getList"></i>
            </el-input>
          </div>
          <div class="newBtn">

            <el-button v-if="this.roleIds.length > 0" @click="batchDel" icon="el-icon-delete">删除
            </el-button>
            <el-button @click="addRole" type="primary" icon="el-icon-plus">添加角色
            </el-button>
          </div>
        </div>
        <div class="tableContent">
          <el-table
            :data="roleList"
            style="width: 100%"
            :row-key="getRowKeys"
            tooltip-effect="dark"
            @selection-change="selectHandler"
            >
            <el-table-column type="selection" :reserve-selection="true"  :span="1">
            </el-table-column>
            <el-table-column prop="roleName" label="角色名称" :span="10">
            </el-table-column>
            <el-table-column prop="roleDesc" label="备注" width="800">
            </el-table-column>
            <el-table-column prop="name" label="操作" width="50" align="center">
              <template slot-scope="scope">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-edit-outline" @click.native="edit(scope.row)">编辑</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-delete" @click.native="del(scope.row.roleId)">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog
          :title="title"
          :visible.sync="dialogVisible"
          width="25%"
          :close-on-click-modal="false"
          class="dialog-title"
          :before-close="handleClose"
          left>
          <el-form
            :model="roleForm"
            status-icon
            ref="roleForm"
            label-width="80px"
            class="demo-ruleForm"
            size="mini"
            label-position="top">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="roleForm.roleName" placeholder="请输入角色名称" autocomplete="off" maxlength="30" :disabled="title=='编辑角色'"></el-input>
            </el-form-item>
            <el-form-item prop="roleType" style="margin-bottom:0">
              <el-tree
                  ref="tree"
                  :data="treedata"
                  show-checkbox
                  default-expand-all
                  check-on-click-node
                  node-key="id"
                  :model="roleForm.roleType"
                  highlight-current>
                  <!-- @node-click="seleClick"
                  @check="seleClick2" -->
              </el-tree>
            </el-form-item>
            <el-form-item label="备注" prop="roleDesc">
              <el-input type="textarea" v-model="roleForm.roleDesc"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose" class="footer-button">取 消</el-button>
            <el-button
              type="primary"
              @click="submit('roleForm')"
              class="footer-button footer-no">确 定</el-button>
          </span>
        </el-dialog>
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
import { treedata } from '../../assets/js/role.js';
export default {
  name: 'User',
  data() {
    return {
      title: '新建角色',
      dialogVisible: false,
      keyword: '',
      pageSize: 10,
      total: 0,
      currPage: 1,
      roleList: [],
      roleIds: [],
      roleForm: {
        roleName: '',
        roleType: [],
        roleDesc: ''
      },
      treedata
    };
  },
  methods: {
    edit(row) {
      this.title = '编辑角色'
      this.roleForm = row
      this.dialogVisible = true
      var that = this;
      setTimeout(function() {
        that.$refs.tree.setCheckedKeys(row.roleType);
      }, 50)
    },
    submit(formName) {
      if (this.title == '新建角色') {
        this.roleForm.roleType = this.$refs.tree.getCheckedKeys()
        this.$http({
          url: 'role/add',
          method: 'post',
          data: this.roleForm
        }).then((data) => {
          if (data.code == 1) {
            this.$refs['roleForm'].resetFields()
            this.$message.success('添加成功')
            this.dialogVisible = false
            this.getList()
          } else {
            this.$message.error(data.msg)
          }
        })
      } else {
        this.roleForm.roleType = this.$refs.tree.getCheckedKeys()
        this.$http({
          url: 'role/update',
          method: 'post',
          data: this.roleForm
        }).then((data) => {
          if (data.code == 1) {
            this.$refs['roleForm'].resetFields()
            this.$message.success('更新成功')
            this.dialogVisible = false
            this.getList()
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    },
    addRole() {
      this.dialogVisible = true
    },
    getList() {
      this.loading = true;
      var params = {
        page: this.currPage,
        limit: this.pageSize
      }
      if (this.keyword != '') {
        params['keyword'] = this.keyword
      }
      this.$http({
        url: 'role/list',
        method: 'get',
        params: params
      }).then((res) => {
        this.roleList = res.data.list
        this.total = res.data.totalCount
      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$refs.tree.setCheckedKeys([]);
          this.dialogVisible = false;
          this.roleForm = {
            roleName: '',
            roleType: [],
            roleDesc: ''
          }
          done();
        })
        .catch(_ => {});
    },
    getRowKeys(row) {
      return row.deviceId;
    },
    selectHandler(val) {
      this.roleIds = [];
      val.forEach(element => {
        this.roleIds.push(element.roleId)
      })
    },
    del(id) {
      this.$http({
        url: 'role/delete/' + id,
        method: 'delete'
      }).then((res) => {
        if (res.code == 1) {
          this.$message.success('删除成功');
          this.getList();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    batchDel() {
      this.$http({
        url: 'role/batchDelete',
        method: 'post',
        data: this.roleIds
      }).then((res) => {
        if (res.code == 1) {
          this.$message.success('删除成功');
          this.roleIds = []
          this.getList()
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  },
  computed: {
  },
  watch: {
  },
  mounted: function() {
    this.getList();
  }
};
</script>
<style lang="less">
.role .el-tree>.el-tree-node>.el-tree-node__children{
    .el-tree-node .el-tree-node__children{
        .el-tree-node{
            float: left!important;
        }
    }
}
.role .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: white;
}
.role .el-tree-node__content:hover {
    background-color: white;
}
</style>
<style lang='less' scoped>
@import "../../assets/css/pub.less";
@import "../../assets/css/dialog.css";
.role {
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
