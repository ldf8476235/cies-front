<!--
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-08 17:59:01
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2020-12-09 15:37:11
-->
<template>
  <svg :class="svgClass" aria-hidden="true">
      <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    data_iconName: {
      type: String,
      required: true
    },
    className: { // 自定义，不需要可删除
      type: String,
      default: ''
    }
  },
  computed: {
    svgClass() { // svg 的class
      if (this.className) {
        return `svg-icon ${this.className}`;
      } else {
        return 'svg-icon'
      }
    },
    iconName() { // svg xlink-href 指向的文件名
      return `#icon-${this.data_iconName}`;
    }
  }
}
</script>

<style scoped>
.svg-icon{
    width:24px;
    height: 24px;
    overflow: hidden;
    fill: currentColor;
    /* vertical-align: -0.15em;*/

}
.svg-class{
  margin-right: 10px;
}
</style>
