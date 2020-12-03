<template>
  <div class="Api">
    <iframe :src = "src" class="word"></iframe>
  </div>
</template>

<script>
export default {
  name:'Api',
  data(){
    return{
        src:"http://192.168.220.201/cies/swagger-ui.html"
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


