<template>
  <div class="device">
    <div class="tab">
      设备管理
      {{this.pageSize}}
    </div>
    <div style="margin:20px;border:1px solid #e8e8e8;">
      <div class="action">
        <div class="search">
        </div>
        <el-button size="small" @click="goAdd" style="float:right;margin-top:20px">
          增加设备
        </el-button>
      </div>
      <div class="devicetable">
        <template>
          <el-table
            size="small"
            ref="deviceList"
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
            <el-table-column
              label="挂载设备"
              show-overflow-tooltip
              prop="deviceMount"
              width="80">
            </el-table-column>
            <el-table-column
              label="操作"
              width="50">
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
      total:0,
      pageSize:10,
      currPage:1,
      deviceList : [],
    }
  },
  methods: {
    goAdd(){
      this.$router.push('/device/add')
    },
    getList(){
      this.$http({
        url: 'device/list',
        method: 'get',
        params: {
          page:this.currPage,
          limit:this.pageSize
        }
      }).then((res) =>{
        this.deviceList = res.data.data.list
        this.total = res.data.data.totalCount
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
    // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  .devicetable{
    margin: 0 20px;
    border-bottom: solid 2px rgba(221, 221, 221, 1);
  }
  .page{
    
    margin: 20 0px!important;
  }
}
</style>


