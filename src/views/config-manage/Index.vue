<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2021-01-25 15:44:01
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-02-22 10:13:26
-->
<template>
  <div class="environment">
    <Crumbs :crumbs='crumbs'></Crumbs>
    <div class="container">
      <div class="content">
        <el-row class="func-header">
          <el-col :span="16" >
            <el-select v-model="corpusLibraryName" placeholder="选择所属项目">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-button>编辑语料库</el-button>
            <el-button>删除语料库</el-button>
            <el-button @click="addCorpusLibrary" type="primary">添加语料库</el-button>
          </el-col>
        </el-row>
        <el-row class="tableContent">
          <el-col :span="16">
            <p><span>语料库名称：</span><span>1大苏打实打实大撒大苏打实打实的23</span></p>
            <p><span>创建人：</span><span>123</span></p>
            <p><span>创建时间：</span><span>123</span></p>
            <p><span>语料库描述：</span><span>123</span></p>
          </el-col>
          <el-col :span="8">
            <el-input placeholder="请输入内容" v-model="searchKey" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <div class="tree-container">
              <el-tree
                :data="corpusData"
                node-key="id"
                default-expand-all
                @node-contextmenu='rightClick'
                :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <!-- <div class="custom-node">
                    <div class="label">{{ node.label }}</div>
                    <el-dropdown v-if="data.flag === 'first'">
                      <span class="el-dropdown-link">
                        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div> -->
                   <div>{{ node.label }}</div>
                    <div>
                      <el-dropdown v-if="data.flag === 'first'">
                        <span class="el-dropdown-link">
                          下拉菜单
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item><i class="el-icon-plus"></i>添加目录</el-dropdown-item>
                          <el-dropdown-item><i class="el-icon-edit-outline"></i>编辑目录名</el-dropdown-item>
                          <el-dropdown-item><i class="el-icon-plus"></i>添加语料</el-dropdown-item>
                          <el-dropdown-item><i class="el-icon-delete"></i>删除</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                      <el-dropdown v-if="data.flag === 'third'">
                        <span class="el-dropdown-link">
                          下拉菜单
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item><i class="el-icon-plus"></i>添加目录</el-dropdown-item>
                          <el-dropdown-item><i class="el-icon-edit-outline"></i>编辑目录名</el-dropdown-item>
                          <el-dropdown-item><i class="el-icon-plus"></i>添加语料</el-dropdown-item>
                          <el-dropdown-item><i class="el-icon-delete"></i>删除</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                </span>
              </el-tree>
            </div>
          </el-col>
        </el-row>
        <!-- 新增编辑配置 -->
        <el-dialog width='30%' title="新建语料库" :visible.sync="dialogFormVisible">
          <el-form ref='formConfig' :model="configInfo" label-position="top" :rules='ruleConfigInfo'>
            <el-form-item label="语料库名称" prop='name'>
              <el-input v-model="configInfo.name" autocomplete="off" placeholder="输入语料库名称"></el-input>
            </el-form-item>
            <el-form-item label="语料库描述" prop='desc'>
              <el-input type='textarea' v-model="configInfo.desc" autocomplete="off" placeholder="输入语料库描述"></el-input>
            </el-form-item>
            <el-form-item label="语料文件" prop='file_name'>
              <input type='file' style='display:none;' accept='audio/wav' ref='file' id='file' @change= "changeFile" >
              <el-input style='width:70%;' disabled v-model="configInfo.file_name" autocomplete="off"></el-input>
              <el-button style="margin-left: 10px;" type="" @click="scan">浏览</el-button>
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
import { GET, POST } from '@/utils/api.js';
import SparkMD5 from 'spark-md5'
export default {
  name: 'Environment',
  components: {
  },
  data() {
    return {
      crumbs: { // 面包屑内容
        action: false,
        name: '语料库管理'
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
      percentage: 0, // 上传进度
      corpusLibraryName: '',
      searchKey: '',
      corpusData: [{
        id: 1,
        label: '系统设置',
        flag: 'first',
        children: [{
          id: 4,
          label: '音量调节',
          flag: 'second',
          children: [{
            id: 9,
            label: '三级.wav',
            flag: 'third'
          }, {
            id: 10,
            flag: 'third',
            label: '三级 1-1-2.wav'
          }]
        }]
      }, {
        id: 2,
        label: '音量',
        children: [{
          id: 5,
          label: '播放音乐.wav'
        }, {
          id: 6,
          label: '顺序播放.wav'
        }]
      }, {
        id: 3,
        label: '导航相关',
        children: [{
          id: 7,
          label: '唤醒导航.wav'
        }, {
          id: 8,
          label: '导航去目的地.wav'
        }]
      }]
    }
  },
  methods: {
    // 树形控件右键点击事件
    rightClick(e) {
      console.log(e)
    },
    append(data) {
      let id = 1000
      const newChild = { id: id++, label: 'testtest', children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
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
      this.configInfo.file_name = file.name
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
          // const checkResult = await checkFileMD5(file.name, fileMD5)
          // console.log(checkResult)
          const result = []
          // if (checkResult === 0) {
          for (let i = 0; i < chunks; i++) {
            result.push(upload(i, fileMD5))
            // if (result.rate === 1) {
            //   merge(file.name, fileMD5)
            // }
            // _this.percentage = Number((result.rate * 100).toFixed(0))
          }
          // } else {
          //   _this.$hintMsg('error', '此文件已存在')
          //   document.getElementById('file').value = ''
          // }
          Promise.all(result).then(res => {
            console.log(res)
            merge(file.name, fileMD5)
          })
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
        console.log('--', currentChunk)
        // const end = (currentChunk + 1) * chunkSize >= fileSize ? fileSize : (currentChunk + 1) * chunkSize;
        // const form = new FormData();
        // const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        // form.append('file', blobSlice.call(file, currentChunk * chunkSize, end));
        // form.append('uid', fileMD5);
        // form.append('voice_name', file.name);
        // form.append('chunk', currentChunk);
        // form.append('total_chunk', chunks);
        // form.append('file_size', fileSize);
        // console.log('--', currentChunk, form.get('chunk'))
        // _this.$http({
        //   url: '/settings/upload/',
        //   method: 'POST',
        //   data: form
        // }).then(res => {
        //   console.log(res)
        // })
        const end = (currentChunk + 1) * chunkSize >= fileSize ? fileSize : (currentChunk + 1) * chunkSize;
        const form = new FormData();
        const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        form.append('file', blobSlice.call(file, currentChunk * chunkSize, end));
        form.append('uid', fileMD5);
        form.append('voice_name', file.name);
        form.append('chunk', currentChunk);
        form.append('total_chunk', chunks);
        form.append('file_size', fileSize);
        return new Promise((reslove, reject) => {
          _this.$http({
            url: '/settings/upload/',
            method: 'POST',
            data: form
          }).then(res => {
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
          // _this.configInfo.file_name = res.name
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
    addCorpusLibrary() {
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
    .func-header{
      .el-col:first-child{
        .el-select {
          width: 30%;
        }
      }
      .el-col:last-child{
        text-align: right;
      }
    }
    .tableContent{
      padding-top: 10px;
      margin-top:15px;
      border-top: 1px solid #DDDDDD;
      .el-col:last-child{
        .el-input{
          width: 50%;
          .el-button {
            margin-left: -20px;
          }
        }
        .tree-container{
          margin-top: 10px;
          border-top: 1px solid #DDDDDD;
          .el-tree {
            padding-top: 10px;
            .custom-node{
              display: flex;
              .label {
                width: 90%;
              }
              .el-dropdown{

                width: 100px;
              }
            }
            .custom-tree-node {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 14px;
              padding-right: 8px;
            }
          }
        }
      }
      .el-col:first-child {
        p {
          height: 30px;
          span:first-child{
            display: inline-block;
            width: 80px;
            text-align: right;
          }
        }
      }
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
