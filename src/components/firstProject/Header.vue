<template>
  <div>
    <div class="heading text-right mb">
      <div v-if="userInfo.uid">
        <a href="" @click.prevent="register">{{userInfo.username}}</a>
        <span> | </span>
        <a href="" @click.prevent="login">退出</a>
      </div>
      <div v-else>
        <a href="" @click.prevent="register">注册</a>
        <span> | </span>
        <a href="" @click.prevent="login">登录</a>
      </div>
    </div>
    <!-- 注册 -->
    <Modal title='注册' :show="modalName === 'register'" @close="modalClose">
      <!-- 注册 -->
      <form>
        <div class="form-group row">
          <label for="username" class="col-md-3 col-form-label">用户名</label>
          <div class="col-md-9">
            <input type="text" class="form-control" placeholder="用户名" autocomplete="off" v-model="reg.username" />
          </div>
        </div>
        <div class="form-group row">
          <label for="password" class="col-md-3 col-form-label">密码</label>
          <div class="col-md-9">
            <input type="password" class="form-control" placeholder="密码" v-model="reg.password" />
          </div>
        </div>
        <div class="form-group row">
          <label for="repassword" class="col-md-3 col-form-label">重复密码</label>
          <div class="col-md-9">
            <input type="password" class="form-control" id="repassword" placeholder="重复密码" v-model="reg.repassword" />
          </div>
        </div>
      </form>

      <template slot="footer">
        <button type="button" class="btn btn-primary" @click="registerSubmit">注册</button>
        <button type="button" class="btn btn-secondary">取消</button>
        <a href="">我有账号，立即登录</a>
      </template>

    </Modal>

    <Modal title='登录' :show="modalName === 'login'" @close="modalClose">
      <!-- 登录 -->
      <form>
        <div class="form-group row">
          <label for="username" class="col-md-3 col-form-label">用户名</label>
          <div class="col-md-9">
            <input v-model="log.username" type="text" class="form-control" placeholder="用户名" autocomplete="off" />
          </div>
        </div>
        <div class="form-group row">
          <label for="password" class="col-md-3 col-form-label">密码</label>
          <div class="col-md-9">
            <input v-model="log.password" type="password" class="form-control" placeholder="密码" />
          </div>
        </div>
      </form>

      <template slot="footer">
        <button type="button" class="btn btn-primary" @click="loginSubmit">登录</button>
        <button type="button" class="btn btn-secondary">取消</button>
        <a href="">我要注册</a>
      </template>

    </Modal>

  </div>
</template>
<script>
import Modal from './modal/Modal'
import url from '../../config'
import axios from 'axios'
export default {
  data() {
    return {
      userInfo: {
        uid: 0,
        username: ''
      },
      modalName: '',
      reg: {
        username: '',
        password: '',
        repassword: ''
      },
      log: {
        username: '',
        password: ''
      }
    }
  },

  components: {
    Modal,
  },


  methods: {
    register() {
      this.modalName = 'register'
    },
    login() {
      this.modalName = 'login'
    },
    modalClose() {
      this.modalName = ''

    },
    registerSubmit() {
      fetch(`${url.firPro}/register`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.reg)
      }).then(res => {
        return res.json()
      }).then(data => {
        if (data.code) {
          alert(data.data)
        } else {
          this.modalName = 'login'
        }

      })
    },

    loginSubmit() {
      fetch(`${url.firPro}/login`, {
        // credentials: 'include',
        method: 'POST',
        body: JSON.stringify(this.log),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        return res.json()
      }).then(res => {
        if (res.code) {
          alert(res.data)
        } else {
          this.modalName = ''
          this.userInfo.uid = res.data.id
          this.userInfo.username = res.data.username
          //把用户登录成功后的uid保存在localStorate
          localStorage.setItem('uid', this.userInfo.uid)
        }
      })

    }

  }
}
</script>
<style lang='stylus' scoped>
</style>