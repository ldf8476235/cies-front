<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-02 17:15:48
 * @LastEditors: wh
 * @Description: 
 * @LastEditTime: 2020-12-02 18:18:50
-->
<template>
  <div class="new-action">
    <Crumbs :crumbs='crumbs' @save='save'></Crumbs>
  </div>
</template>

<script>
import Crumbs from '../../../components/crumbs/Crumbs.vue';
export default {
  components: { Crumbs },
  name: 'NewAction',
  data() {
    return {
      crumbs:{
        action:true,
        name:'新建动作'
      }
    };
  },
  computed:{
  },
  watch:{
  },
  methods: {
    save(){
      console.log('保存')
    }
  },
};
</script>

<style lang='less' scoped>
.new-action {
  
}
</style>
