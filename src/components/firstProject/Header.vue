<template>
  <div>
    <div class="heading text-right mb">
      <div v-if="userInfo.username">
        <a href="" @click.prevent="register">{{userInfo.username}}</a>
        <span> | </span>
        <a href="" @click.prevent="logout">退出</a>
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

  created() {
    //取出 cookie 中的用户信息并存到 vue 的 userInfo 中，以达到刷新页面不退出
    let arr1 = document.cookie.split('; ')
    arr1 = arr1.map(item => {
      let arr2 = item.split('=') // ['uid',1]
      return {
        [arr2[0]]: arr2[1]
      }
    })
    let cookies = Object.assign({}, ...arr1)

    this.userInfo = {
      uid: cookies.uid,
      username: cookies.username
    }

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
        credentials: 'include',
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
          
          //把用户登录成功后的uid保存在localStorage中 (后台使用cookie存入cookie 后。就不用localStorage存了)
          localStorage.setItem('uid', this.userInfo.uid)
        }
      })

    },
    logout() {
      
      fetch(`${url.firPro}/logout`,{
        credentials: 'include',
      }).then(res => {
        return res.json()
      }).then(res => {
        this.userInfo.username = ''
      })

    }

  }
}
</script>
<style lang='stylus' scoped>
</style>