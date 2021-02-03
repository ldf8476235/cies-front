<!--
 * @Author: wh
 * @Date: 2020-11-30 17:35:49
 * @LastEditTime: 2021-02-01 11:14:45
 * @LastEditors: wh
 * @Description: In User Settings Edit
 * @FilePath: \cies-front\src\views\action-mangage\Index.vue
-->
<template>
  <div class="action">
    <Crumbs :crumbs='crumbs'></Crumbs>
    <div class="container">
      <div class="content">
        <Func ref='func' :options='options' :txt='text' @deleteBatch='deleteBatch'>
          <el-form slot='actionForm' :inline='true' label-position="top" :model="seachInfo" class="demo-form-inline">
            <el-form-item style='width:150px;' label="动作名称">
              <el-input  v-model="seachInfo.user" placeholder="输入动作名称"></el-input>
            </el-form-item>
            <el-form-item style='width:150px;' label="动作类型">
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
              <el-select v-model="seachInfo.region" placeholder="活动区域">
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
          <el-dropdown slot="action" @command="goNewTask">
              <el-button type="primary">
                <i class="el-icon-plus"></i>
                <span>新建动作</span>
                <i class="el-icon-caret-bottom"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="0">屏幕操作</el-dropdown-item>
                <el-dropdown-item :command="1">语音输入</el-dropdown-item>
                <el-dropdown-item :command="2">命令脚本</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </Func>
        <div class="tableContent">
          <el-table
            :data="actionList"
            class='borderTop'
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column type="selection" align="center" width="55">
            </el-table-column>
            <el-table-column label="类型" width="50">
              <template slot-scope="scope">
                <div >
                  <svg-icon v-if="scope.row.type === 'U3'" data_iconName="icon-gesture" className="icon"/>
                  <svg-icon v-if="scope.row.type === 'Voice'" data_iconName="icon-voice" className="icon"/>
                  <svg-icon v-if="scope.row.type ==='Shell'" data_iconName="icon-code" className="icon"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="动作名称" width="180">
            </el-table-column>
            <el-table-column prop="mount" label="引用" min-width="80">
              <template slot-scope="scope">
                <div >
                  4
                  <!-- {{scope.row.actionCite.length}} -->
                </div>
              </template>
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
              <template slot-scope="scope">
                <el-popover
                  placement="bottom"
                  width="100"
                  trigger="click">
                  <p @click="detail(scope.row)">
                    <svg-icon data_iconName="icon-configure" />
                    <span>详情</span>
                  </p>
                  <p @click="edit(scope.row)"><svg-icon data_iconName="icon-edit" className="icon"/><span>编辑</span></p>
                  <p><svg-icon data_iconName="icon-copy" className="icon"/><span>复制</span></p>
                  <p @click="del(scope.row)"><svg-icon data_iconName="icon-delete" className="icon"/><span>删除</span></p>
                  <!-- <el-button slot="reference"><i class="el-icon-more"></i></el-button> -->
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
          @handleSizeChange = "handleSizeChange"
          @handleCurrChange ='handleCurrChange'
        ></PageUtil>
      </div>
    </div>
  </div>
</template>

<script>
import { b64toBlob, ImagePool } from '@/utils/common.js'
import { delHint } from '@/utils/utils.js'
import { GET } from '@/utils/api.js'
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
        name: '动作管理'
      },
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
      actionList: [ // 动作列表
        // { type: 'U3' }, { type: 'Voice' }, { type: 'Shell' }
      ],
      selectData: [], // 选中的数据
      seachInfo: {},
      text: '新建校验点'

    };
  },
  created() {
    this.deviceId = 'android:'
    // this.getCurrentScreen()
    this.imagePool = new ImagePool(100)
  },
  mounted() {
    this.getActionList(this.currPage, this.pageSize)
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
    // 详情
    detail(row) {
      console.log(row)
      const type = row.type
      let name
      switch (type) {
        case 'U3':
          name = 'ScreenDetails'
          break;
        case 'Voice':
          name = 'VoiceDetails'
          break;
        case 'Shell':
          name = 'ScriptDetails'
          break;
        default:
          break;
      }
      this.$router.push({
        name: name,
        query: {
          uid: row.uid
        },
        params: {
          data: row
        }
      })
    },
    // 编辑
    edit(row) {
      console.log(row)
      let name = ''
      if (row.type === 'U3') {
        name = 'NewScreen'
      } else if (row.type === 'Voice') {
        name = 'NewVoice'
      } else if (row.type === 'Shell') {
        name = 'NewScript'
      }
      this.$router.push({
        name: name,
        query: {
          uid: row.uid
        },
        params: {
          data: row
        }
      })
    },
    // 批量删除数据
    deleteBatch() {
      const url = 'action/del'
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
            this.getActionList(this.currPage, this.pageSize)
          }
        })
      }).catch(err => {
        this.$hintMsg('info', err)
      })

    },
    // 删除单个数据
    del(row) {
      const url = 'action/del/'
      const data = {
        uid: [row.uid]
      }
      delHint(this).then(async(res) => {
        const respone = await this.$http.delete(url, { data })
        if (respone.status_code === 200) {
          this.$hintMsg('success', res)
          this.getActionList(this.currPage, this.pageSize)
        }
      }).catch(err => {
        this.$hintMsg('info', err)
      })


    },
    // 获取动作列表
    getActionList(page, size) {
      const url = `action/list?page=${page}&count=${size}`
      GET(url).then(res => {
        console.log(res)
        this.actionList = res.result
        this.total = res.totalCount
      })
    },
    // 新建任务
    goNewTask(i) {
      let path = ''
      console.log(this.options)
      switch (i) {
        case 0:
          // path = this.screen === 'portrait' ? '/action/newscreen' : '/action/carscreen'
          path = '/action/newscreen'
          console.log(path)
          break;
        case 1:
          path = '/action/newvoice'
          break;
        case 2:
          path = '/action/newscript'
          break;
        default:
          break;
      }
      this.$router.push(path);
    },
    // tab切换
    tabCut(index) {
      console.log(index)
      this.tabIndex = index
    },
    // 获取当前屏幕截图
    getCurrentScreen() {
      this.$axios.get('/api/v1/devices/' + (this.deviceId || '-') + '/screenshot').then(res => {
        var blob = b64toBlob(res.data, 'image/' + res.type);
        this.drawBlobImageToScreen(blob);
      }).catch(err => {
        console.log('err:', err)
      })
    },
    // 绘制当前屏幕
    drawBlobImageToScreen(blob) {
      const that = this
      var URL = window.URL || window.webkitURL;
      var BLANK_IMG = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
      var img = this.imagePool.next()
      img.onload = function() {
        const r = img.width / img.height
        if (r > 1) {
          that.screen = 'landscape'
        } else {
          that.screen = 'portrait' // 'landscape'
        }
        img.onload = img.onerror = null
        img.src = BLANK_IMG
        img = null
        blob = null
        URL.revokeObjectURL(url)
        url = null
      }

      img.onerror = function() {
        img.onload = img.onerror = null
        img.src = BLANK_IMG
        img = null
        blob = null
        URL.revokeObjectURL(url)
        url = null
      }
      var url = URL.createObjectURL(blob)
      img.src = url;
    },
    // 当前页条数
    handleSizeChange(size) {
      console.log(typeof size)
      this.pageSize = size
      this.getActionList(this.currPage, size)
    },
    // 当前页数
    handleCurrChange(page) {
      this.currPage = page
      console.log(this.currPage)
      this.getActionList(page, this.pageSize)
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
    .el-dropdown{
      margin-left:10px;
    }
  }
  .funcTop {
    display: flex;
    justify-content: space-between;
    .search {
      display: flex;
      align-items: center;
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
      .btnFilter{
        padding: 0;
        margin-left: 5px;
      }
    }
    .newBtn {
      .del-btn{
        margin-right: 10px;
      }
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
