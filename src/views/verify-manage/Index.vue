<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-02 18:31:44
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-02-03 15:40:24
-->
<template>
  <div class="verify">
    <Crumbs :crumbs='crumbs'></Crumbs>
    <div class="container">
      <div class="content">
        <Func ref='func' :options='options' :txt='text' @deleteBatch='deleteBatch'>
          <el-form slot='verify' :inline='true' label-position="top" :model="seachInfo" class="demo-form-inline">
            <el-form-item style='width:150px;' label="校验点名称">
              <el-input  v-model="seachInfo.user" placeholder="输入动作名称"></el-input>
            </el-form-item>
            <el-form-item style='width:150px;' label="校验点类型">
              <el-input v-model="seachInfo.user" placeholder="输入动作类型"></el-input>
            </el-form-item>
            <el-form-item style='width:150px;' label="创建人">
              <el-input v-model="seachInfo.user" placeholder="输入创建人"></el-input>
            </el-form-item>
            <el-form-item style='width:150px;' label="所属项目">
              <el-select v-model="seachInfo.region" placeholder="选择所属项目">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style='width:150px;' label="软件版本">
              <el-select v-model="seachInfo.region" placeholder="选择软件版本">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style='display:block; width:150px;border-top:1px solid #e4e4e4' label="创建时间">
              <el-select v-model="seachInfo.region" placeholder="创建时间">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="display:block;text-align:right; margin: 0">
              <div>
                <el-button size="mini" type="text" @click="clearSeach">清空列表</el-button>
                <el-button size="mini" style='border: 1px solid #DCDFE6;' @click="cancel">取消</el-button>
                <el-button type="primary" size="mini" @click="confirm">确定</el-button>
              </div>
            </el-form-item>
          </el-form>
          <el-dropdown slot='dropBtn' @command="goNewVerify">
            <el-button type="primary">
              <i class="el-icon-plus"></i>
              <span>新建校验点</span>
              <!-- <svg-icon data_iconName='icon-arrow-down'></svg-icon> -->
              <i class="el-icon-caret-bottom"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="0">屏幕校验点</el-dropdown-item>
              <el-dropdown-item :command="1">其他校验点</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </Func>
        <div class="tableContent">
          <el-table
            :data="verifyList"
            class='borderTop'
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center" width="55">
            </el-table-column>
            <el-table-column label="类型" width="50">
              <template slot-scope='scope'>
                <svg-icon v-if="scope.row.type === 'Image'" data_iconName="icon-gesture" />
                <svg-icon v-else-if="scope.row.type === 'U3'" data_iconName="icon-gesture" />
                <svg-icon v-else-if="scope.row.type === 'Text'" data_iconName="icon-gesture" />
                <svg-icon v-else-if="scope.row.type === 'Voice'" data_iconName="icon-gesture" />
                <svg-icon v-else-if="scope.row.type === 'Log'" data_iconName="icon-gesture" />
                <svg-icon v-else data_iconName="icon-gesture" />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="检验点名称" min-width="180">
            </el-table-column>
            <el-table-column prop="project" label="所属项目" width="180">
            </el-table-column>
            <el-table-column prop="builder" label="创建人" width="180">
            </el-table-column>
            <el-table-column prop="version" label="软件版本" width="140">
            </el-table-column>
            <el-table-column prop="time_create" label="创建时间" width="160">
            </el-table-column>
            <el-table-column prop="time_modify" label="更新时间" width="160">
            </el-table-column>
            <el-table-column label="操作" width="60">
              <template slot-scope='scope'>
                <el-popover
                  placement="bottom"
                  width="100"
                  trigger="click">
                  <p @click="detail(scope.row)">
                      <svg-icon data_iconName="icon-configure" />
                      <span>详情</span>
                    </p>
                  <p @click='edit(scope.row)'><svg-icon data_iconName="icon-edit" className="icon"/><span>编辑</span></p>
                  <p><svg-icon data_iconName="icon-copy" className="icon"/><span>复制</span></p>
                  <p @click='del(scope.row)'><svg-icon data_iconName="icon-delete" className="icon"/><span>删除</span></p>
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
import { delHint } from '@/utils/utils.js'
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
        }
      ],
      selectVal: '', // 选中项
      inputKey: '', // 搜索输入项
      tabIndex: 1,
      verifyList: [], // 动作列表
      seachInfo: {}, // 高级检索条件
      selectData: [] // 选择的数据

    };
  },
  mounted() {
    this.getVerifyList(this.currPage, this.pageSize)
  },
  methods: {
    // 清空条件
    clearSeach() {},
    // 取消搜索
    cancel() {
      this.$refs.func.visible = false
    },
    // 确认搜索
    confirm() {
      console.log(this.seachInfo)
    },
    // 选择数据
    handleSelectionChange(val) {
      this.selectData = val;
    },
    // 获取检验点列表
    getVerifyList(page, size) {
      const url = `/verify/list/?page=${page}&count=${size}`
      this.$http.get(url).then(res => {
        console.log(res)
        if (res.status_code === 200) {
          this.verifyList = res.data.result
          this.total = res.data.count
        }
      })
    },
    // 新建任务
    goNewVerify(i) {
      console.log(i)
      switch (i) {
        case 0:
          this.$router.push('/verify/newimage');
          break;
        case 1:
          this.$router.push('/verify/newother');
          break;
        default:
          break;
      }
    },
    // 批量删除数据
    deleteBatch() {
      const url = 'verify/del'
      if (this.selectData.length === 0) {
        this.$hintMsg('warning', '请先选择任何数据！')
        return
      }
      const idList = this.selectData.map(item => {
        return item.uid
      })
      const data = {
        uid: idList
      }
      delHint(this).then(res => {
        this.$http.delete(url, { data }).then(respone => {
          console.log(respone)
          if (respone.status_code === 200) {
            this.$hintMsg('success', '批量删除成功')
            this.getVerifyList(this.currPage, this.pageSize)
          }
        })
      }).catch(err => {
        this.$hintMsg('info', err)
      })

    },
    // 删除单个数据
    del(row) {
      const url = 'verify/del/'
      const data = {
        uid: [row.uid]
      }
      delHint(this).then(async(res) => {
        const respone = await this.$http.delete(url, { data })
        if (respone.status_code === 200) {
          this.$hintMsg('success', res)
          console.log(this)
          this.getVerifyList(this.currPage, this.pageSize)
        }
      }).catch(err => {
        this.$hintMsg('info', err)
      })


    },
    // 编辑
    edit(row) {
      const type = row.type
      let name
      switch (type) {
        case 'Image':
        case 'Text':
        case 'U3':
          name = 'NewImage'
          break;
        case 'other':
          name = 'NewOther'
          break;
        default:
          break;
      }
      this.$router.push({
        name: name,
        query: {
          uid: row.uid,
          type: type
        },
        params: {
          data: row
        }
      })
    },
    // 详情
    detail(row) {
      console.log(row)
      const type = row.type
      let name
      switch (type) {
        case 'Image':
        case 'Text':
        case 'U3':
          name = 'ImageDetails'
          break;
        case 'other':
          name = 'OtherDetails'
          break;
        default:
          break;
      }
      this.$router.push({
        name: name,
        query: {
          uid: row.uid,
          type: type
        },
        params: {
          data: row
        }
      })
    }
  }
};
</script>

<style lang='less' scoped>
// @import "../../assets/css/pub.less";
.verify {
  .content {
    padding: 20px;
    box-sizing: border-box;
    .el-dropdown{
      margin-left:10px;
    }
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
    .borderTop{
      border-top: 1px solid #EBEEF5;
    }
  }
}
</style>

