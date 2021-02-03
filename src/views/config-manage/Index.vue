<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2021-01-25 15:44:01
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-02-02 18:06:29
-->
<template>
  <div class="environment">
    <Crumbs :crumbs='crumbs'></Crumbs>
    <div class="container">
      <div class="content">
        <Func :options='options' ref='func' @goNew='goNewEnvironment' :txt='text' @deleteBatch='deleteBatch'>
          <el-form slot='environment' :inline='true' label-position="top" :model="seachInfo" class="demo-form-inline">
            <el-form-item style='width:150px;' label="环境名称">
              <el-input  v-model="seachInfo.name" placeholder="输入任务名称"></el-input>
            </el-form-item>
            <el-form-item style='width:150px;' label="创建人">
              <el-input v-model="seachInfo.createUser" placeholder="输入创建人"></el-input>
            </el-form-item>
            <el-form-item style='width:150px;' label="指派人">
              <el-input v-model="seachInfo.assignUser" placeholder="输入指派人"></el-input>
            </el-form-item>
            <el-form-item style='width:150px;' label="所属项目">
              <el-select v-model="seachInfo.project" placeholder="选择所属项目">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style='width:150px;' label="软件版本">
              <el-select v-model="seachInfo.version" placeholder="选择软件版本">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style='width:150px;' label="任务状态">
              <el-select v-model="seachInfo.status" placeholder="选择任务状态">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style='display:block; width:150px;border-top:1px solid #e4e4e4' label="创建时间">
              <el-select v-model="seachInfo.createTime" placeholder="选择创建时间">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="display:block;text-align:right; margin: 0">
              <div>
                <el-popconfirm
                  title="确认清空搜索列表？"
                  style='padding-right:10px;'
                  @confirm='clearSeach'
                  icon="el-icon-info"

                  >
                  <el-button slot="reference" size="mini" type="text">清空列表</el-button>
                </el-popconfirm>
                <el-popconfirm
                  title="取消搜索列表？"
                  style='padding-right:10px;'
                  icon="el-icon-info"
                  @confirm='cancel'
                  >
                  <el-button slot="reference" size="mini" style='border: 1px solid #DCDFE6;'>取消</el-button>
                </el-popconfirm>
                <el-button type="primary" size="mini" @click="confirm">确定</el-button>
              </div>
            </el-form-item>
          </el-form>
        </Func>
        <div class="tableContent">
          <el-table
            :data="environmentList"
            class='borderTop'
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center" width="55">
            </el-table-column>
            <el-table-column prop="caseName" label="设备名称" width="180">
            </el-table-column>
            <el-table-column prop="caseCreator" label="创建人" width="180">
            </el-table-column>
            <el-table-column prop="caseProject" label="所属项目" min-width="180">
            </el-table-column>
            <el-table-column prop="caseVersion" label="软件版本" width="140">
            </el-table-column>
            <el-table-column prop="" label="操作" width="60">
              <template slot-scope="scope">
                <el-popover
                  placement="bottom"
                  width="100"
                  trigger="click">
                  <p @click="edit(scope.row)">
                    <svg-icon data_iconName="icon-edit" className="icon-gesture"/>
                    <span>编辑</span>
                  </p>
                  <p @click="copy"><svg-icon data_iconName="icon-copy" className="icon-gesture"/><span>复制</span></p>
                  <p @click="del(scope.row)"><svg-icon data_iconName="icon-delete" className="icon-gesture"/><span>删除</span></p>
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
        ></PageUtil>
        <!-- 新增编辑配置 -->
        <el-dialog width='30%' title="新建配置" :visible.sync="dialogFormVisible">
          <el-form ref='formConfig' :model="configInfo" label-position="top" :rules='ruleConfigInfo'>
            <el-form-item label="配置名称" prop='name'>
              <el-input v-model="configInfo.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="创建人" prop='builder'>
              <!-- <el-select v-model="configInfo.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select> -->
              <el-input v-model="configInfo.builder" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="配置描述" prop='desc'>
              <el-input type='textarea' v-model="configInfo.desc" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="配置文件" prop='file_name'>
              <input type='file' style='display:none;' accept='audio/wav' ref='file' id='file' @change= "changeFile" >
              <el-input style='width:70%;' disabled v-model="configInfo.file_name" autocomplete="off"></el-input>
              <el-button style="margin-left: 10px;" type="" @click="scan">浏览</el-button>
              <el-button><i class='el-icon-caret-right'></i></el-button>
              <el-progress :percentage="percentage" :format="format"></el-progress>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import Func from '@/components/seach-func-header/Func.vue'
import { GET, POST } from '@/utils/api.js';
import SparkMD5 from 'spark-md5'
export default {
  name: 'Environment',
  components: {
    Func
  },
  data() {
    return {
      crumbs: { // 面包屑内容
        action: false,
        name: '配置管理'
      },
      text: '新建配置',
      total: 0,
      pageSize: 10,
      currPage: 1,
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
      environmentList: [{}],
      seachInfo: { // 高级检索信息

      },
      dialogFormVisible: false,
      configInfo: { name: '', path: '', file_name: '' },
      ruleConfigInfo: {
        name: [
          { required: true, message: '请输入配置名称', trigger: 'blur' }
        ],
        builder: [
          { required: true, message: '请输入创建人', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入描述信息', trigger: 'blur' }
        ],
        file_name: [
          { required: true, message: '请先上传文件', trigger: 'blur' }
        ]
      },
      percentage: 0 // 上传进度
    };
  },
  methods: {
    // 上传文件进度条显示文案
    format(percentage) {
      return percentage === 100 ? '完成' : `${percentage}%`;
    },
    async changeFile() {
      const files = document.getElementById('file').files

      console.log(document.getElementById('file').value)
      this.uploadFile(files)
    },
    uploadFile(files) {
      var _this = this
      var running = false // running用于判断是否正在计算md5
      // 这里假设直接将文件选择框的dom引用传入
      if (running) {
        return
      }
      // 最大文件限制10M
      // const maxSize = 10 * 1024 * 1024
      // if (files[0].size > maxSize) {
      //   console.log(document.getElementById('file').value)
      //   document.getElementById('file').value = null
      //   return
      // }
      // 这里需要用到File的slice()方法，以下是兼容写法
      var blobSlice =
          File.prototype.slice ||
          File.prototype.mozSlice ||
          File.prototype.webkitSlice
      var file = files[0]
      var chunkSize = 2 * 1024 * 1024 // 以每片1MB大小来逐次读取
      var fileSize = file.size
      _this.configInfo.size = fileSize
      var chunks = Math.ceil(fileSize / chunkSize) // 总片数
      var currentChunk = 0
      var spark = new SparkMD5() // 创建SparkMD5的实例
      var fileReader = new FileReader()
      fileReader.onload = async function(e) {
        console.log('Read chunk number' + (currentChunk + 1) + ' of  chunks ', e.target.result)
        spark.appendBinary(e.target.result) // append array buffer
        currentChunk += 1
        if (currentChunk < chunks) {
          loadNext()
        } else {
          running = false
          console.log('Finished loading!')
          const fileMD5 = spark.end()
          console.log('str', fileMD5)
          const checkResult = await checkFileMD5(file.name, fileMD5)
          console.log(checkResult)
          if (checkResult === 0) {
            for (let i = 0; i < chunks; i++) {
              const result = await upload(i, fileMD5);
              console.log(result)
              if (result.rate === 1) {
                merge(file.name, fileMD5)
              }
              _this.percentage = Number((result.rate * 100).toFixed(0))
            }
          } else {

            _this.$hintMsg('error', '此文件已存在')
            document.getElementById('file').value = ''
          }
        }
      }
      fileReader.onerror = function() {
        running = false
        console.log('something went wrong')
      }
      function loadNext() {
        var start = currentChunk * chunkSize
        var end = start + chunkSize >= file.size ? file.size : start + chunkSize
        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
      }
      running = true
      loadNext()
      // 校验文件是否存在
      function checkFileMD5(name, md5) {
        return new Promise((reslove) => {
          const url = `settings/check/?uid=${md5}&name=${name}`
          GET(url).then(res => {
            console.log(res)
            reslove(res)
          })
        })

      }
      // 上传方法
      function upload(currentChunk, fileMD5) {
        return new Promise((reslove, reject) => {
          const end = (currentChunk + 1) * chunkSize >= fileSize ? fileSize : (currentChunk + 1) * chunkSize;
          const form = new FormData();
          const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
          form.append('file', blobSlice.call(file, currentChunk * chunkSize, end));
          form.append('uid', fileMD5);
          form.append('voice_name', file.name);
          form.append('chunk', currentChunk);
          form.append('total_chunk', chunks);
          form.append('file_size', fileSize);
          // console.log(form)
          _this.$http({
            url: '/settings/upload/',
            method: 'POST',
            data: form
            // headers: {
            //   // 文件上传要设置的我就不细说了
            //   'Content-Type': 'multipart/form-data;charset=utf-8'
            // }
          }).then(res => {
            // console.log(res)
            reslove(res)
          })
        })
      }
      // 合并
      function merge(name, md5) {
        const data = {
          'voice_name': name,
          'uid': md5
        }
        POST('/settings/merge/', 'POST', data).then(res => {
          console.log(res)
          _this.configInfo.file_name = res.name
          _this.configInfo.path = res.path
        })
      }
    },
    scan() {
      this.$refs.file.click()
    },
    // 清空条件
    clearSeach() {
      this.seachInfo = {}
    },
    // 取消搜索
    cancel() {
      this.$refs.func.visible = false
    },
    // 确认搜索
    confirm() {
      console.log(this.seachInfo)
      const arr = []
      for (const key in this.seachInfo) {
        const obj = {
          field: key,
          field_str: this.seachInfo[key]
        }
        arr.push(obj)
      }
      console.log(arr)
    },
    // 批量删除
    deleteBatch() {},
    // 新增环境
    goNewEnvironment() {
      this.dialogFormVisible = true
    },
    // 选择列表
    handleSelectionChange() {},
    // 编辑
    edit() {},
    copy() {},
    del() {},
    save() {
      this.$refs.formConfig.validate(valid => {
        if (!valid) return
        const url = 'settings/add/'
        console.log(this.configInfo)
        POST(url, 'POST', this.configInfo).then(res => {
          console.log(res)
          this.$refs.formConfig.resetFields()
          document.getElementById('file').value = ''
          this.percentage = 0

          this.dialogFormVisible = false

        })
      })

    }
  }
};
</script>

<style lang='less' scoped>
.environment{
  .content {
    padding: 20px;
    box-sizing: border-box;
    .tableContent{

      margin-top:10px;
    }
    .borderTop{
      border-top: 1px solid #EBEEF5;
    }
    /deep/ .el-dialog__body{
      padding: 0 20px;
    }
    /deep/ .el-form-item__label {
      padding: 0;
    }
    .upload-demo{
      display: inline-block;
    }
    .el-select{
      width: 100%;
    }
    .el-button{
      margin-left: 10px;
    }
  }
}
</style>
