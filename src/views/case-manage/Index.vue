<!--
 * @Author: wh
 * @Date: 2020-11-30 17:34:55
 * @LastEditTime: 2021-02-18 15:04:09
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
        <Func :options='options' @goNew='goNewCase' :txt='text' @deleteBatch='deleteBatch'>
          <el-form slot='case' :inline='true' label-position="top" :model="seachInfo" class="demo-form-inline">
            <el-form-item style='width:150px;' label="用例名称">
              <el-input  v-model="seachInfo.user" placeholder="输入用例名称"></el-input>
            </el-form-item>
            <el-form-item style='width:150px;' label="创建人">
              <el-input v-model="seachInfo.user" placeholder="输入创建人"></el-input>
            </el-form-item>
            <el-form-item style='width:150px;' label="指派人">
              <el-input v-model="seachInfo.user" placeholder="输入指派人"></el-input>
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
        </Func>
        <div class="tableContent">
          <el-table
            :data="caseList"
            class='borderTop'
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center" width="55">
            </el-table-column>
            <el-table-column prop="name" label="用例名称" width="180">
            </el-table-column>
            <el-table-column prop="mount" label="引用" width="60">
              <template slot-scope='scope'>
                <!-- <div>{{scope.row.caseCite.length}}</div> -->
              </template>
            </el-table-column>
            <el-table-column prop="project" label="所属项目" min-width="140">
            </el-table-column>
            <el-table-column prop="builder" label="创建人" width="180">
            </el-table-column>
            <el-table-column prop="version" label="软件版本" width="120">
            </el-table-column>
            <el-table-column prop="time_create" label="创建时间" width="180">
            </el-table-column>
            <el-table-column prop="time_modify" label="更新时间" width="180">
            </el-table-column>
            <el-table-column prop="" label="操作" width="60">
              <template slot-scope="scope">
                <el-popover
                  placement="bottom"
                  width="100"
                  trigger="click">
                  <p @click="detail(scope.row)">
                    <svg-icon data_iconName="icon-configure" />
                    <span>详情</span>
                  </p>
                  <p @click="editCase(scope.row)">
                    <svg-icon data_iconName="icon-edit" className="icon-gesture"/>
                    <span>编辑</span>
                  </p>
                  <p @click="copyCase"><svg-icon data_iconName="icon-copy" className="icon-gesture"/><span>复制</span></p>
                  <p><svg-icon data_iconName="icon-report" className="icon-gesture"/><span>报告</span></p>
                  <p @click="delCase(scope.row)"><svg-icon data_iconName="icon-delete" className="icon-gesture"/><span>删除</span></p>
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
          @handleSizeChange='handleSizeChange'
          @handleCurrChange='handleCurrChange'
        ></PageUtil>

      </div>
    </div>
  </div>
</template>

<script>
import Func from '@/components/seach-func-header/Func.vue'
import { delHint } from '@/utils/utils.js'
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
        }
      ],
      selectVal: '', // 选中项
      inputKey: '', // 搜索输入项
      caseList: [{}], // 任务列表
      seachInfo: {}, // 高级检索条件
      delArr: [] // 批量删除的数据
    };
  },
  created() {
    this.getCaseList(this.currPage, this.pageSize)
  },
  mounted() {},
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
    // 获取case列表
    getCaseList(page, size) {
      const url = `case/list/?page=${page}&count=${size}`
      this.$http.get(url).then(res => {
        console.log(res)
        if (res.status_code === 200) {
          this.caseList = res.data.result
          this.total = res.data.count
        }
      })
    },
    // 选择框
    handleSelectionChange(data) {
      this.delArr = data.map(item => {
        return item.uid
      })
      console.log(this.delArr)
    },
    // 批量删除
    deleteBatch() {
      if (this.delArr.length === 0) {
        this.$hintMsg('warning', '请先选择任何数据！')
        return
      }
      const data = {
        uid: this.delArr
      }
      delHint(this).then(res => {
        this.$http.delete(`case/del/`, { data }).then(respone => {
          console.log(respone)
          if (respone.status_code === 200) {

            this.$hintMsg('success', res)
            this.getCaseList(this.currPage, this.pageSize)
          }
        })
      }).catch(err => {
        this.$hintMsg('info', err)
      })

    },
    // 删除用例
    delCase(row) {
      delHint(this).then((res) => {
        const url = 'case/del/'
        const data = {
          uid: [row.uid]
        }
        console.log(data)
        this.$http.delete(url, { data }).then(respone => {
          console.log(respone)
          if (respone.status_code === 200) {
            this.$hintMsg('success', res)
            this.getCaseList(this.currPage, this.pageSize)
          }
        })
      }).catch((err) => {
        this.$hintMsg('info', err)
      })

    },
    // 复制用例
    copyCase(row) {
      this.$router.push(
        {
          path: '/case/newcase',
          query: {
            uid: row.uid,
            copy: 'copy'
          }
        }
      )
    },
    // 详情
    detail(row) {
      this.$router.push(
        {
          path: '/case/newcase',
          query: {
            uid: row.uid
          }
        }
      )
    },
    // 编辑用例
    editCase(row) {
      console.log(row)
      this.$router.push({
        name: 'NewCase',
        query: {
          uid: row.uid
        },
        params: {
          data: row
        }
      });
    },
    // 新建用例
    goNewCase() {
      this.$router.push('/case/newcase');
    },
    // 当前页条数
    handleSizeChange(size) {
      this.pageSize = size
      this.getCaseList(this.currPage, size)
    },
    // 当前页面
    handleCurrChange(page) {
      this.currPage = page
      console.log(this.currPage)
      this.getCaseList(page, this.pageSize)
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
  .tableContent {
    margin-top: 10px;
    .borderTop{
      border-top: 1px solid #EBEEF5;
    }
  }
}
</style>
