<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-08 17:59:01
 * @LastEditors: wh
 * @Description: 
 * @LastEditTime: 2020-12-08 18:53:20
-->
<template>
  <svg :class="svgClass" aria-hidden="true">
      <use :xlink:href="iconName" />
  </svg>
</template>
 
<script>
export default {
 name:'svgIcon',
 props:{
    data_iconName:{
        type:String,
        required:true
    },
    className:{
        type:String,
        default:''
    }
 },
 computed:{
     svgClass(){   //svg 的class
         if(this.className){
             return `svg-icon ${this.className}`;
         }else{
             return 'svg-icon'
         }
     },
     iconName(){  //svg xlink-href 指向的文件名
         return `#icon-${this.data_iconName}`;
     }
 }
}
</script>
 
<style scoped>
.svg-icon{
    width:24px;
    height: 24px;
    vertical-align: -0.15em;
    fill: red;
    overflow: hidden;
}
/* .icon-gesture{
  color: red;
} */
</style>