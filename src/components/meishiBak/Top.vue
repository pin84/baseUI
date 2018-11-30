<template>
  <div class="top">
    <div class="left">
      <a href="">
        <img
          src="../../assets/img/meishi/cook.png"
          alt=""
        >
      </a>
      <h2>后台管理</h2>
    </div>
    <div class="right" ref="right">
      <a href="">admin </a>
      <ul
        class="list"
        ref="list"
      >
        <li
          class="item"
          v-for='(opt,i) in userOptions'
          :key="i"
        >
          <a href="">{{opt}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userOptions: ['退出', 'aa', 'bb'],
    }
  },
  mounted() {
  },

  methods: {
  }

}
</script>
<style lang='stylus' scoped>
.top
  width 100%
  height 60px
  background #ccc
  padding 0 20px
  display flex
  justify-content space-between
  .left
    display flex
    align-items  center
    color black
  .right
    &:hover .list
      transform scale(1)
    .list
      transform scale(0)
      .item
        &:hover
          background green 
    
</style>