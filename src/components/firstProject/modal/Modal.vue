<template>
  <!-- <div class="modal" :style="{display : s ? 'block' : 'none'}"> -->
  <div class="modal" :style="{display : show ? 'block' : 'none'}">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{title}}</h5>
          <button type="button" class="close" @click="close">
            <span>&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <slot />
        </div>

        <div class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      default: false
    },
    title: {
      required: true
    }
  },
  // data() {
  //   return {
  //     s: this.show
  //   }
  // },
  // watch:{
  //   show(){
  //     this.s = this.show
  //   }
  // },
  methods: {
    close() {
      this.$emit('close')
    }

  }
}
</script>
<style lang='stylus' scoped>
</style>