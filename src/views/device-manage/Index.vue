<template>
  <div class="device">
    <div class="tab">设备列表</div>
    <div style="margin: 20px; border: 1px solid #e8e8e8;">
      <div class='action'>
        <Func ref='func' :options='options' @deleteBatch='deleteBatch' :txt='text'>
          <el-form slot='device' :inline='true' label-position="top" :model="seachInfo" class="demo-form-inline">
            <el-form-item style='width:150px;' label="设备名称">
              <el-input  v-model="seachInfo.user" placeholder="输入设备名称"></el-input>
            </el-form-item>
            <el-form-item style='width:150px;' label="负责人">
              <el-input v-model="seachInfo.user" placeholder="输入负责人"></el-input>
            </el-form-item>
            <el-form-item style='width:150px;' label="设备类型">
              <el-input v-model="seachInfo.user" placeholder="输入设备类型"></el-input>
            </el-form-item>
            <el-form-item style='width:150px;' label="IP地址">
              <el-input v-model="seachInfo.user" placeholder="输入IP地址"></el-input>
            </el-form-item>
            <el-form-item style='width:150px;' label="状态">
              <el-select v-model="seachInfo.region" placeholder="选择状态">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item style='display:block; width:150px;border-top:1px solid #e4e4e4' label="创建时间">
              <el-select v-model="seachInfo.region" placeholder="创建时间">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item style="display:block;text-align:right; margin: 0">
              <div>
                <el-button size="mini" type="text" @click="clearSeach">清空列表</el-button>
                <el-button size="mini" style='border: 1px solid #DCDFE6;' @click="cancel">取消</el-button>
                <el-button type="primary" size="mini" @click="confirm">确定</el-button>
              </div>
            </el-form-item>
          </el-form>
          <el-button
            slot='refresh'
            size="small"
            @click="refresh"
            >
            刷新
          </el-button>
        </Func>
      </div>

      <div class="devicetable">
        <template>
          <el-table
            size="small"
            ref="deviceList"
            v-loading="loading"
            :data="deviceList"
            :row-key="getRowKeys"
            tooltip-effect="dark"
            style="width: 100%;border-top:1px solid #e4e4e4"
            @selection-change="selectHandler"
          >
            <el-table-column width="10px"></el-table-column>
            <el-table-column
              type="selection"
              align="center"
              :reserve-selection="true"
              :span="1"
            >
            </el-table-column>
            <el-table-column label="设备名称" show-overflow-tooltip :span="10">
              <template slot-scope="scope">{{ scope.row.actuator_name }}</template>
            </el-table-column>
            <el-table-column
              label="负责人"
              prop="actuator_username"
              show-overflow-tooltip
              width="100"
            >
            </el-table-column>
            <el-table-column
              label="IP地址"
              prop="actuator_ip"
              show-overflow-tooltip
              width="150"
            >
            </el-table-column>
            <el-table-column
              label="端口号"
              prop="actuator_port"
              show-overflow-tooltip
              width="80"
            >
            </el-table-column>
            <el-table-column
              label="类型"
              show-overflow-tooltip
              width="150"
              :formatter="formatterType"
            >
            </el-table-column>
            <el-table-column
              label="状态"
              align="center"
              show-overflow-tooltip
              width="80"
            >
              <template slot-scope="scope">
                <span
                  v-if="scope.row.deviceStatus == 0"
                  style="color: rgba(0, 0, 0, 0.3)"
                  >offline</span
                >
                <span v-else style="color: #7ed321">online</span>
              </template>
            </el-table-column>
            <el-table-column
              label="挂载设备"
              show-overflow-tooltip
              prop="deviceMount"
              width="80">
            </el-table-column>
            <el-table-column
              label="操作"
              width="80"
              align="center">
              <template slot-scope="scope">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-tickets" @click.native="del(scope.row.uid)">执行报告</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <div
        class="page"
        style="height: 50px; font-size: 15px; margin: 20px 10px 5px 20px"
        >
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
export default {
  name: 'Device',
  components: {
    Func
  },
  data() {
    return {
      condition: '',
      value: '',
      total: 0,
      loading: true,
      pageSize: 10,
      currPage: 1,
      deviceList: [],
      deviceIds: [],
      options: [{
        value: 'device_name',
        label: '设备名称'
      }, {
        value: 'device_admin',
        label: '负责人'
      }, {
        value: 'device_type',
        label: '设备类型'
      }, {
        value: 'device_ip',
        label: 'IP地址'
      }, {
        value: 'device_status',
        label: '状态'
      }],
      text: '新建校验点',
      seachInfo: {} // 高级搜索条件
    }
  },
  mounted() {
    this.getList(this.currPage, this.pageSize);
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
    goNewTask() {},
    // 刷新
    refresh() {
      this.getList(this.currPage, this.pageSize);
    },
    goAdd() {
      this.$router.push('/device/add');
    },
    selectHandler(val) {
      this.deviceIds = [];
      val.forEach(element => {
        this.deviceIds.push(element.uid)
      })
      console.log(this.deviceIds)
    },
    // 获取搜索下拉框内容
    getSelectOptions() {
      this.$http({
        url: 'device/options/'
      }).then(res => {
        this.options = res
      })
    },
    // 获取设备列表
    getList(page, size) {
      const that = this
      this.loading = true;
      // var params = {
      //   page: this.currPage,
      //   limit: this.pageSize
      // }
      // if (this.condition != '') {
      //   params[this.condition] = this.value
      // }
      this.$http({
        url: `device/list/?page=${page}&count=${size}`,
        method: 'get'
      }).then((res) => {
        this.deviceList = res.data.result
        this.total = res.data.count
        this.loading = false;
      }).catch(err => {
        console.warn(err)
        this.loading = false
      })

    },
    getRowKeys(row) {
      return row.deviceId;
    },
    // 格式化设备类型数据
    formatterType(row) {
      console.log(row.actuator_type)
      var typelist = row.actuator_type;
      const arr = []
      typelist.forEach(item => {
        if (item === 'Voice') {
          arr.push('语音')
        } else if (item === 'Phone') {
          arr.push('手机互联')
        } else if (item === 'Vamera') {
          arr.push('camera')
        }
      })
      console.log(arr.join('|'))
      return arr.join(' | ')

    },
    edit(row) {
      // row['update'] = true
      console.log(row)
      this.$router.push({
        name: 'AddDevice',
        query: {
          id: row.uid
        },
        params: {
          data: row
        }
      })
    },
    copy(row) {
      this.$router.push({ path: '/device/update', query: row })
    },
    del(uid) {
      const data = {
        'uid': [uid]
      }
      this.$http({
        url: 'device/del/',
        method: 'delete',
        data: data
      }).then((res) => {
        if (res.status_code == 200) {
          this.$message.success('删除成功');
          this.getList(this.currPage, this.pageSize);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    deleteBatch() {
      this.$http({
        url: 'device/del',
        method: 'delete',
        data: { uid: this.deviceIds }
      }).then((res) => {
        if (res.status_code === 200) {
          this.$message.success('删除成功');
          this.deviceIds = []
          this.getList(this.currPage, this.pageSize)
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 当前页条数
    handleSizeChange(size) {
      this.pageSize = size
      this.getList(this.currPage, this.pageSize)
    },
    // 当前页面
    handleCurrChange(page) {
      this.currPage = page
      this.getList(this.currPage, this.pageSize)
    }
  }

};
</script>

<style lang='less'>
.device {
  min-width: 1280px;
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  // height: 90%;
  .tab {
    height: 50px;
    padding-left: 20px;
    font-size: 18px;
    line-height: 50px;
    text-align: left;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  .action {
    // border-bottom: solid 2px rgba(221, 221, 221, 1);
    // height: 70px;
    margin: 10px 20px;
    .search {
      // float: left;
    }
    // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  .devicetable {
    margin: 0 20px;
    // border-bottom: solid 2px rgba(221, 221, 221, 1);
    .el-dropdown-link {
      cursor: pointer;
      // color: #409EFF;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
    .demonstration {
      display: block;
      color: #8492a6;
      font-size: 14px;
      margin-bottom: 20px;
    }
  }
  .page {
    margin: 20 0px !important;
  }
}
</style>


