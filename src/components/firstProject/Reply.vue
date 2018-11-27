<template>
  <!-- <div class="modal" style="display: block"> -->
  <div class="modal" :style="{display: show ? 'block':'none'}">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <input class="modal-title" placeholder="请输入标题" v-model="msg.title" />
          <button type="button" class="close" @click="closeReply">
            <span>&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <!-- 回复 -->
          <form>
            <div class="form-group row">
              <div class="col-md-12">
                <textarea class="form-control" id="username" placeholder="回复内容……" cols="30" rows="10" v-model="msg.content"></textarea>
              </div>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="reply">回复</button>
          <button type="button" class="btn btn-secondary">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import url from '../../config'
export default {
  props: {
    show: false,
  },
  data() {
    return {
      msg: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    closeReply() {
      this.$emit('closeReply')
    },
    reply() {
      // if (!this.msg.title || !this.msg.content) {
      //   return alert('请输入标题或内容！')
      // }

      fetch(`${url.firPro}/reply`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: this.msg.title,
          content: this.msg.content
        })
      }).then(res => {
        return res.json()
      }).then(res => {
        if (res.code) {
          alert(res.data)
        } else {
          console.log(res);

        }

      })
    }
  }
}
</script>
<style lang='stylus' scoped>
</style>