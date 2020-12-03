<template>
  <div class="device">
    <div class="tab">
      设备管理
    </div>
    <div style="margin:20px;border:1px solid #e8e8e8;">
      <div class="action">
        <div class="search">
          <el-select style="width:100px" v-model="condition" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input
            style="margin:20px 0 0 10px;width:180px"
            size="small"
            placeholder="请输入关键字"
            v-model="value">
            <i slot="suffix" class="el-input__icon el-icon-search" style="cursor: pointer;" @click="getList()"></i>
          </el-input>
        </div>
        <el-button type="primary" size="small" @click="goAdd" style="float:right;margin-top:20px">
          <i class="el-icon-plus" style="margin:0 4px 0 -10px"></i>添加设备
        </el-button>
        <div class="batchDelete">
          <el-button size="small" @click="goAdd" style="float:right;margin-top:20px;margin-right:10px">
            <i class="el-icon-delete" style="margin:0 4px 0 -10px"></i>批量删除
          </el-button>
        </div>
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
            style="width: 100%">
            <el-table-column width="10px"></el-table-column>
            <el-table-column
              type="selection"
              :reserve-selection="true"
              :span="1">
            </el-table-column>
            <el-table-column
              label="设备名称"
              show-overflow-tooltip
              :span="10">
              <template slot-scope="scope">{{scope.row.deviceName}}</template>
            </el-table-column>
            <el-table-column
              label="负责人"
              prop="deviceAdmin"
              show-overflow-tooltip
              width="80">
            </el-table-column>
            <el-table-column
              label="IP地址"
              prop="deviceIp"
              show-overflow-tooltip
              width="120">
            </el-table-column>
            <el-table-column
              label="端口号"
              prop="devicePort"
              show-overflow-tooltip
              width="80">
            </el-table-column>
            <el-table-column
              label="类型"
              show-overflow-tooltip
              width="130"
              :formatter="formatterType">
            </el-table-column>
            <el-table-column
              label="状态"
              align="center"
              show-overflow-tooltip
              width="80">
              <template slot-scope="scope">
                <span v-if="scope.row.deviceStatus == 0" style="color:rgba(0, 0, 0, 0.3)">offline</span>
                <span v-else style="color:#7ED321">online</span>
              </template>
            </el-table-column>
            <!-- <el-table-column
              label="挂载设备"
              show-overflow-tooltip
              prop="deviceMount"
              width="80">
            </el-table-column> -->
            <el-table-column
              label="操作"
              width="50"
              align="center">
              <template slot-scope="scope">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-edit-outline" @click.native="edit(scope.row)">编辑</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-document-copy" @click.native="copy(scope.row)">复制</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-delete" @click.native="del(scope.row.deviceId)">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <div class="page" style="height:50px;font-size:15px;margin:20px 0 5px 0">
        <PageUtil ref="pageutil" :total="total"  :pageSize="pageSize" :currPage="currPage"></PageUtil>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Device',
  data(){
    return{
      condition:'',
      value:'',
      total:0,
      loading:true,
      pageSize:10,
      currPage:1,
      deviceList : [],
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
    }
  },
  methods: {
    goAdd(){
      this.$router.push('/device/add')
    },
    getList(){
      this.loading = true;
      var params = {
        page:this.currPage,
        limit:this.pageSize
      }
      if(this.condition!=''){
        params[this.condition] = this.value
      }
      this.$http({
        url: 'device/list',
        method: 'get',
        params:params
      }).then((res) =>{
        this.deviceList = res.data.data.list
        this.total = res.data.data.totalCount
        this.loading = false;
      })
    },
    getRowKeys(row){
      return row.deviceId;
    },
    //格式化设备类型数据
    formatterType(row) {
      var typelist = row.deviceType;
      if (typelist.length == 1) {
        return typelist[0]
      } else {
        var type = "";
        typelist.forEach(element => {
          type = type + " | " + element
        });
        return type.substring(2)
      }
    },
    edit(row){
      row['update'] = true
      this.$router.push({path:'/device/update',query: row})
    },
    copy(row){
      this.$router.push({path:'/device/update',query: row})
    },
    del(id) {
      this.$http({
        url: 'device/delete/'+id,
        method: 'delete',
      }).then((res) =>{
        this.$message.success('删除成功')
        this.getList()
      })
    }
  },
  mounted: function(){
    this.getList();
  }
}
</script>

<style lang='less'>
.device{
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  // height: 90%;
  .tab{
    height: 50px;
    padding-left: 20px;
    font-size: 18px;  
    line-height: 50px;
    text-align: left;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  .action{
    border-bottom: solid 2px rgba(221, 221, 221, 1);
    height: 70px;
    margin: 0 20px;
    .search{
      float: left;
    }
    // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  .devicetable{
    margin: 0 20px;
    border-bottom: solid 2px rgba(221, 221, 221, 1);
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
  .page{
    margin: 20 0px!important;
  }
}
</style>


