<template>
  <div class="addDevice">
    <div class="tab">
      <i class="el-icon-back back" @click="back"></i>
      {{title}}
      <el-button @click="submit" type="primary" size="small" style="float:right;margin:10px 20px 0 0">保存</el-button>
    </div>
    <div class="container">
      <div class="content">
        <div class="title">
          设备信息
        </div>
        <div class="form">
          <el-form ref="deviceInfo" label-width="120px" :model="deviceMsg" :rules="rulesDeviceMsg">
            <el-row>
              <el-col :span="12">
                <el-form-item label="设备名称：" prop="name">
                  <el-input v-model="deviceMsg.name" :disabled="title==='编辑设备'" placeholder="输入设备名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负责人：" prop="user">
                  <el-input v-model="deviceMsg.user" placeholder="输入负责人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="IP地址：" prop="ip">
                  <el-select v-model="deviceMsg.ip" placeholder="选择IP地址">
                      <el-option
                        v-for="item in ipList"
                        :key="item.filed_str"
                        :label="item.h5_str"
                        :value="item.filed_str"
                      >
                      </el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="端口号：" prop="port">
                  <el-select v-model="deviceMsg.port" placeholder="选择端口号">
                    <el-option
                      v-for="item in portList"
                      :key="item.filed_str"
                      :label="item.h5_str"
                      :value="item.filed_str"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设备类型：" prop="type">
                  <el-checkbox-group v-model="deviceMsg.type">
                    <el-checkbox
                     v-for="item in typeList"
                     :key="item.filed_str"
                     :label="item.filed_str"
                     >
                     {{item.h5_str}}
                     </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="执行机描述：" prop="desc">
                  <el-input type="textarea" v-model="deviceMsg.desc" placeholder="输入执行机描述"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Device',
  data() {
    return {
      title: '添加设备',
      deviceMsg: {
        type: [],
        status: true
      },
      rulesDeviceMsg: {
        name: [
          { required: true, message: '请输入设备名称', trigger: 'blur' }
        ],
        user: [
          { required: true, message: '请输入负责人', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: '请输入设备IP', trigger: 'blur' }
        ],
        port: [
          { required: true, message: '请输入设备端口', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择设备类型', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入设备描述', trigger: 'blur' }
        ]
      },
      options: [
        {
          value: 'index1',
          label: '项目1'
        },
        {
          value: 'index2',
          label: '项目2'
        }
      ],
      ipList: [],
      portList: [],
      typeList: []
    }
  },
  created() {
    var id = this.$route.query.id
    if (id) {
      this.editInto()
    }
    this.getOptions()
    // if (msg.deviceId) {
    //   // 编辑设备
    //   if (msg.update) {
    //     this.title = '编辑设备'
    //     this.deviceMsg = msg
    //   } else {
    //   // 复制设备
    //     this.deviceMsg.ip = msg.ip
    //     this.deviceMsg.port = msg.port
    //     this.deviceMsg.type = msg.type
    //     this.deviceMsg.desc = msg.desc
    //   }
    // }
  },
  methods: {
    submit() {
      if (this.title == '添加设备') {
        this.add()
      } else {
        this.update()
      }
    },
    // 获取选项
    getOptions() {
      this.$http({
        methods: 'GET',
        url: '/device/options/'
      }).then(res => {
        console.log(res)
        if (res.status_code === 200) {
          this.ipList = res.data.ip
          this.portList = res.data.port
          this.typeList = res.data.type
        }
      })
    },
    // 编辑进入
    editInto() {
      this.title = '编辑设备'
      const data = this.$route.params.data
      if (data) {
        localStorage.setItem('deviceData', JSON.stringify(this.$route.params.data))
      }
      this.deviceMsg = JSON.parse(localStorage.getItem('deviceData'))
      console.log(this.deviceMsg)
    },
    // 添加设备
    add() {
      console.log(this.deviceMsg)
      this.$refs.deviceInfo.validate(valid => {
        if (!valid) return
        this.$http({
          url: 'device/add',
          method: 'post',
          data: this.deviceMsg
        }).then((res) => {
          if (res.status_code == 200) {
            this.$message.success('添加成功')
            this.$router.replace('/device')
          } else {
            this.$message.error(res.msg)
          }
        })
      })

    },
    update() {
      this.$http({
        url: 'device/edit',
        method: 'put',
        data: this.deviceMsg
      }).then((data) => {
        if (data.status_code === 200) {
          this.$message.success('编辑成功')
          this.$router.replace('/device')
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    back() {
      this.$router.replace('/device')
    }
  }

}
</script>

<style lang='less' scoped>
.addDevice{
  width: 100%;
    // border: 1px solid #e8e8e8;
    border: 1px solid #e8e8e8;
    // height: 90%;
    border-radius: 3px;
    font-size: 12px!important;
    // text-align: left;
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
      margin-top: 20px;
      .el-form{
        .el-input{
          width:50%;
        }
        .el-textarea{
          width: 50%;
        }
        .el-select{
          width: 50%;
        }

      }

    }
}
</style>


