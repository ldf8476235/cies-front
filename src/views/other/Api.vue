<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-11-30 17:12:31
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-01-12 10:51:02
-->
<template>
  <div class="Api">
    <iframe :src = "src" class="word"></iframe>
  </div>
</template>

<script>
export default {
  name: 'Api',
  data() {
    return {
      src: 'http://192.168.210.159/cies/swagger-ui.html'
    }
  },
  methods: {
  }
}
</script>

<style lang='less'>
.Api{
    width: 100%;
    height: 100%;
    .word{
       width: 99%;
       height: 100%;
    }
}
</style>


