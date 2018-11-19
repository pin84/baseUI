<template>
  <div id="app">
    <div class="top" ref="top">
      <h1>index.vue</h1>
      <div class="links">
        <router-link class="link" v-for="(router,index) in routers" :key="index" :to="router">{{router}}</router-link>
      </div>
    </div>
    <!-- <keep-alive> -->
      <router-view />
    <!-- </keep-alive> -->
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      routers: ['todoList', 'firstProject']
    }
  },
  components: {
  },

  mounted() {
    // this.showTop()
  },
  methods: {

    showTop() {
      let top = this.$refs.top
      document.addEventListener('mousemove', (e) => {
        let y = e.clientY,
          distance = 30
        if (y < distance) {
          top.style.transform = 'translateX(-50%) translateY(0%)'
        }
      })
      top.addEventListener('mouseover', () => {
        top.style.transform = 'translateX(-50%) translateY(0%)'
      })
      top.addEventListener('mouseleave', () => {
        top.style.transform = 'translateX(-50%) translateY(-100%)'
      })


    },



  }
}
</script>

<style lang='stylus' scoped >
@import url('./assets/css/reset.css');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing:border-box;
}
.top
  // position fixed
  // top 0
  // left 50%
  margin 0 auto
  width 80%
  height 200px
  border 1px solid #ccc
  padding 5px
  box-sizing:border-box
  transition 800ms
  // transform translateX(-50%) translateY(-100%)
  background #fff
  box-shadow 10px 10px 5px #ccc
  border-radius 10px
  .links
    display flex
    .link
      margin 0 10px


</style>
