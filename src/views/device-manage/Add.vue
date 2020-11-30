<template>
  <div class="addDevice">
      <div class="tab">
        <i class="el-icon-back back" @click="back()"></i>
        添加设备
        <el-button @click="submit" type="primary" size="small" style="float:right;margin:10px 20px 0 0">保存</el-button>
      </div>
      <div style="margin:20px;border:1px solid #e8e8e8;">
        <div class="title">
          设备信息
        </div>
        <div class="form">
          <el-form label-position="right" label-width="120px" :model="deviceMsg" size="small">
            <el-form-item label="设备名称：">
              <el-input v-model="deviceMsg.deviceName"></el-input>
            </el-form-item>
            <el-form-item label="负责人：">
              <el-input v-model="deviceMsg.deviceAdmin"></el-input>
            </el-form-item>
            <el-form-item label="IP地址：">
              <el-input v-model="deviceMsg.deviceIp"></el-input>
            </el-form-item>
            <el-form-item label="端口号：">
              <el-input v-model="deviceMsg.devicePort"></el-input>
            </el-form-item>
            <el-form-item label="设备类型：">
              <el-checkbox-group v-model="deviceMsg.deviceType">
                <el-checkbox label="语音" name="type"></el-checkbox>
                <el-checkbox label="camera" name="type"></el-checkbox>
                <el-checkbox label="手机互联" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="执行机描述：">
              <el-input type="textarea" v-model="deviceMsg.deviceDesc"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name:'Device',
  data(){
    return{
      deviceMsg: {
        deviceId: "",
        deviceName: "",
        deviceAdmin: "",
        deviceIp: "",
        devicePort: "",
        deviceType: [],
        deviceStatus: "",
        deviceMount: "",
        deviceDesc: "",
      }
    }
  },
  methods: {
    submit(){
      this.$http({
        url: 'device/add',
        method: 'post',
        data: this.deviceMsg
      }).then((data)=>{
        this.$message.success('保存成功')
        this.$router.replace('/device')
      })
    },
    back(){
      this.$router.replace('/device')
    }
  },
}
</script>

<style lang='less'>
.addDevice{
    // border: 1px solid #e8e8e8;
    border: 1px solid #e8e8e8;
    // height: 90%;
    border-radius: 3px;
    font-size: 12px!important;
    text-align: left;
    // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    .tab{
      height: 50px;
      padding-left: 20px;
      font-size: 18px;  
      line-height: 50px;
      text-align: left;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      .back{
        cursor: pointer;
      }
    }
    .title{
        max-height: 30px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
        line-height: 30px;
        padding-left: 20px;
    }
    .form{
      margin-top: 50px;
      width: 500px;
      overflow: auto;
    }
}
</style>


