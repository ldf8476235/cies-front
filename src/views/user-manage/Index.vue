<!--
 * @Author: wh
 * @Date: 2020-11-30 17:38:03
 * @LastEditTime: 2020-12-01 09:55:05
 * @LastEditors: wh
 * @Description: In User Settings Edit
 * @FilePath: \cies-front\src\views\user-manage\Index.vue
-->
<template>
  <div class="user">
    <div class="crumbs">
      <span>用户列表</span>
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

            <el-button v-if="this.userIds.length > 0" @click="batchDel" icon="el-icon-delete">删除
            </el-button>
            <el-button @click="addUser" type="primary" icon="el-icon-plus">添加用户
            </el-button>
          </div>
        </div>
        <div class="tableContent">
          <el-table
            :data="userList"
            style="width: 100%"
            :row-key="getRowKeys"
            tooltip-effect="dark"
            @selection-change="selectHandler"
          >
            <el-table-column type="selection" :reserve-selection="true"  :span="1">
            </el-table-column>
            <el-table-column prop="userName" label="用户名称" :span="10">
            </el-table-column>
            <el-table-column prop="roleName" label="用户角色" width="800">
            </el-table-column>
            <el-table-column prop="name" label="操作" width="50" align="center">
              <template slot-scope="scope">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-edit-outline" @click.native="edit(scope.row)">编辑</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-delete" @click.native="del(scope.row.userId)">删除</el-dropdown-item>
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
:model="userForm"
status-icon
ref="userForm"
label-width="80px"
                  class="demo-ruleForm"
size="mini"
label-position="top">
            <el-form-item label="用户名称" prop="userName">
              <el-input v-model="userForm.userName" placeholder="请输入用户名称" autocomplete="off" maxlength="30" :disabled="title=='编辑用户'"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="roleName">
              <el-select v-model="userForm.roleName" placeholder="请设置角色" style="width: 100%">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <!-- <el-input type="text" v-model="ruleForm2.checkPass" style="display:none" autocomplete="off" maxlength="30"></el-input>  -->
              <el-input type="password" v-model="userForm.pwd" autocomplete="off" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="userPwd">
              <el-input type="password" v-model="userForm.userPwd" autocomplete="off" maxlength="30"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
                    <el-button @click="handleClose" class="footer-button">取 消</el-button>
                    <el-button
type="primary"
@click="submit('userForm')"
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
export default {
  name: 'User',
  data() {
    return {
      dialogVisible: false,
      keyword: '',
      title: '新建用户',
      pageSize: 10,
      total: 0,
      currPage: 1,
      userList: [],
      userIds: [],
      userForm: {
        userName: '',
        roleName: '',
        pwd: '',
        userPwd: ''
      },
      options2: []
    };
  },
  methods: {
    edit(row) {
      this.title = '编辑用户'
      this.userForm = row
      this.dialogVisible = true
    },
    addUser() {
      this.title = '新建用户'
      this.dialogVisible = true
    },
    submit(formName) {
      if (this.title == '新建用户') {
        this.$http({
          url: 'user/add',
          method: 'post',
          data: this.userForm
        }).then((data) => {
          if (data.data.code == 1) {
            this.$refs['userForm'].resetFields()
            this.$message.success('添加成功')
            this.dialogVisible = false
            this.getList()
          } else {
            this.$message.error(data.data.msg)
          }
        })
      } else {
        this.$http({
          url: 'user/update',
          method: 'post',
          data: this.userForm
        }).then((data) => {
          if (data.data.code == 1) {
            this.$refs['userForm'].resetFields()
            this.$message.success('更新成功')
            this.dialogVisible = false
            this.getList()
          } else {
            this.$message.error(data.data.msg)
          }
        })
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.dialogVisible = false;
          this.userForm = {
            userName: '',
            roleName: '',
            pwd: '',
            userPwd: ''
          },
          done();
        })
        .catch(_ => {});
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
        url: 'user/list',
        method: 'get',
        params: params
      }).then((res) => {
        this.userList = res.data.data.list
        this.total = res.data.data.totalCount
      });
    },
    getRoleList() {
      this.$http({
        url: 'role/list',
        method: 'get'
      }).then((res) => {
        var roleList = res.data.data.list
        roleList.forEach((v, i) => {
          this.options2.push({ value: v.roleName })
        })
      });
    },
    getRowKeys(row) {
      return row.deviceId;
    },
    selectHandler(val) {
      this.userIds = [];
      val.forEach(element => {
        this.userIds.push(element.userId)
      })
    },
    del(id) {
      this.$http({
        url: 'user/delete/' + id,
        method: 'delete'
      }).then((res) => {
        if (res.data.code == 1) {
          this.$message.success('删除成功');
          this.getList();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    batchDel() {
      this.$http({
        url: 'user/batchDelete',
        method: 'post',
        data: this.userIds
      }).then((res) => {
        if (res.data.code == 1) {
          this.$message.success('删除成功');
          this.userIds = []
          this.getList()
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    clear() {

    }
  },
  computed: {
  },
  watch: {
  },
  mounted: function() {
    this.getList();
    this.getRoleList();
  }
};
</script>
<style lang='less' scoped>
@import "../../assets/css/pub.less";
@import "../../assets/css/dialog.css";
.user {
  .el-form-item--mini .el-form-item__label {
    line-height: 0px!important;
}
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
