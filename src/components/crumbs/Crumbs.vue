<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-02 17:25:31
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2020-12-15 09:33:24
-->
<template>
  <div>
    <div class="crumbs" v-if="crumbs.action">
      <p><i @click="goBack" class="el-icon-back"></i> <span>{{crumbs.name}}</span></p>
      <div v-if="crumbs.details">
        <el-button @click="copy" icon="el-icon-document-copy">
          复制
          <!-- <svg-icon data_iconName="icon-replace" className="icon-gesture"/>   -->
        </el-button>
        <el-button @click="edit" icon="el-icon-edit-outline">编辑</el-button>
      </div>
      <div v-else>
        <el-button type="text">取消</el-button>
        <el-button  @click="save" type="primary">保存</el-button>
      </div>

    </div>
    <div class="crumbs" v-else>
      <span>{{crumbs.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Crumbs',
  props: {
    crumbs: {
      type: Object

    }
  },
  data() {
    return {
    };
  },
  computed: {
  },
  watch: {
  },
  methods: {
    // 返回上一页
    goBack() {
      this.$router.back()
    },
    // 复制
    copy() {
      this.$emit('copy')
    },
    // 编辑
    edit() {
      this.$emit('edit')
    },
    // 取消
    cancel() {
      this.$emit('cancel')
    },
    // 保存
    save() {
      this.$emit('save')
    }
  }
};
</script>

<style lang='less' scoped>
.crumbs{
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  box-shadow: 0 1px 0px rgba(0, 0, 0, 0.2);
  p{
    i{
      cursor: pointer;
    }
  }
  .el-button {
    width: 100px;
    height: 30px;
    font-size: 12px;
  }
  span{
    // width: 72px;
    font-size: 16px;
    font-family: 'SourceHanSansCN-Normal', SourceHanSansCN;
    font-weight: 400;
    color: #000000;
  }
}
</style>
