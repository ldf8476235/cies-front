<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-15 09:38:07
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-02-25 10:01:27
-->
<template>
    <div class="funcTop">
      <div class="search">
        <el-select v-model="selectVal" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input v-model="inputKey" placeholder="请输入内容">
          <i slot="suffix" @click="seach" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-popover
            placement="bottom"
            width="650"
            v-model="visible">
            <slot name='task'></slot>
            <slot name='actionForm'></slot>
            <slot name='verify'></slot>
            <slot name='case'></slot>
            <slot name='device'></slot>
            <slot name='environment'></slot>
            <div style="text-align:right;">
                <el-popconfirm
                  title="确认清空搜索列表？"
                  style='padding-right:10px;'
                  icon="el-icon-info"
                  @confirm='clearSeach'
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
                <el-button type="primary" size="mini" @click="confirmSearch">确定</el-button>
              </div>
            <el-button class="btnFilter" slot="reference">
              <svg-icon data_iconName='icon-filter'></svg-icon>
            </el-button>
          </el-popover>

      </div>
      <div class="newBtn">
        <el-button
          @click="deleteBatch"
          icon="el-icon-delete"
          >删除</el-button>
        <el-button
          v-if="txt !== '新建校验点'"
          @click="goNew"
          type="primary"
          icon="el-icon-plus"
          >{{txt}}</el-button>
          <slot name='dropBtn'></slot>
          <slot name='refresh'></slot>
          <slot name="action"></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Func',
  props: {
    options: {
      type: Array
    },
    txt: {
      type: String
    },
    seachInfo: {
      type: Object
    }
  },
  data() {
    return {
      // 选择项内容
      // options: this.options,
      selectVal: '', // 选中项
      inputKey: '', // 搜索输入项
      visible: false
    };
  },
  watch: {
  },
  methods: {
    // 普通搜索
    seach() {
      console.log('搜索', this.selectVal, this.inputKey)
      const data = {
        'filed': 'actuator_name',
        'filed_str': 'DESKTOP-NIF4RB9'
      }
      console.log()
      this.$emit('seach', data)
    },
    goNew() {
      const obj = {
        selectVal: '',
        inputKey: ''
      }
      this.$emit('goNew', obj)
    },
    // 批量删除按钮
    deleteBatch() {
      this.$emit('deleteBatch')
    },
    // 清空条件
    clearSeach() {
      this.$emit('clearSeach')
    },
    // 取消搜索
    cancel() {
      this.visible = false
    },
    // 确认搜索
    confirmSearch() {
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
      this.$emit('confirmSearch', arr)
    }
  }

};
</script>

<style lang='less' scoped>
.funcTop {
    display: flex;
    justify-content: space-between;
    .search {
      display: flex;
      align-content: center;
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
  }
</style>
