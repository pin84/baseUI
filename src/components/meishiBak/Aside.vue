<template>
<div class="aside">
  <ul class="list">
    <li class="item" v-for="(aside,i) in asideList" :key="i">
      <a href="">{{aside}}</a>
    </li>
  </ul>
</div>
</template>
<script>
export default {
  data(){
    return {
      asideList:['首页','精选食物','分类']
    }
  }
}
</script>
<style lang='stylus' scoped>
.aside
  width 150px
  height 100%
  background #ccc
  .list
    padding 10px 0 0 20px
    text-align left
    .item
      a
        display block
        &:hover
          background #666
</style>