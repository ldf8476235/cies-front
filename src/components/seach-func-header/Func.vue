<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-15 09:38:07
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2020-12-18 14:08:10
-->
<template>
  <div>
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
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button class="btnFilter">
          <svg-icon data_iconName='icon-filter'></svg-icon>
        </el-button>

      </div>
      <div class="newBtn">
        <el-button
          @click="deleteBatch"
          icon="el-icon-delete"
          >删除</el-button>
        <el-button
          @click="goNew"
          type="primary"
          icon="el-icon-plus"
          >{{txt}}</el-button>
      </div>
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
    }
  },
  data() {
    return {
      // 选择项内容
      // options: this.options,
      selectVal: '', // 选中项
      inputKey: '' // 搜索输入项
    };
  },
  methods: {
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
