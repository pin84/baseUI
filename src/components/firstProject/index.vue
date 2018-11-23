<template>
  <div>
    <div class="container">
      <div class="py-5 text-center">
        <!-- <img class="d-block mx-auto mb-4" src="../../assets/css/firstProject/sequelize.jpg" /> -->
        <p class="lead">
          爱就好比骑马和学法语，如果不趁年轻时学会，以后想学会就难了。
        </p>
        <p class="lead">
          Love is like riding or speaking French,if you don not learn it young, it's hard to get the trick of it
          later.
        </p>
        <!-- 人这一生，总要心碎一两次的。

                We must have our heart broken once or twice before we are done.
                世事无常，我们要随遇而安。

                It just happens, and we should live with it.

                人生就是不断收集回忆的过程，最终陪伴我们的也只有回忆了。

                The business of life is the acquisition of memories.In the end that's all there is.

                亲爱的，人生总是会遇到各种麻烦，我们得尽力去解决它。
                My dear, all life is a series of problems which we must try and solve.

                没有翻不了的山，没有沉不了的船。
                Every mountain is unclimbable until someone climbs it.Every ship is unsinkable until it sinks.

                世道变了，我们也得跟着变。

                The world moves on, and we must move with it.

                当坏事发生时，仍希望未发生过是毫无意义的，当务之急是减少损失。

                When something bad happens,there is no point in wishing it had not happened.The only option is to minimize the damage.
                每种生活都有它自己的规矩，如果你不愿意遵守，那么这种生活就不适合你。 -->
      </div>

      <Header />

      <div class="mb">
        <div class="list" v-for="(item,i) in datas" :key="i">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{item.title}}</h5>
            <small>{{item.created_at}}</small>
          </div>
          <p class="mb-1">
            {{item.content}}
          </p>
          <footer class="text-right">
            <small @click="like(item.id)">赞（{{item.like_count}}）</small>
            <small>回复（{{item.comment_count}}）</small>
            <a href="">我要回复</a>
          </footer>
        </div>
      </div>

    </div>

    <ul class="pagination mb">
      <li class="page-item" :class="{disabled:pageIndex == 1}" @click="changePage(pageIndex - 1)">
        <span class="page-link"> &lt; </span>
      </li>

      <li class="page-item" v-for="(n,i) in pages" :key="i" @click="changePage(n)" :class="{active:pageIndex == n}">
        <span class="page-link">{{n}}</span>
      </li>

      <li class="page-item" :class="{disabled:pageIndex == pages}" @click="changePage(pageIndex + 1)">
        <a class="page-link"> &gt; </a>
      </li>
    </ul>

    <div class="modal" style="display: -block">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">xxxxxxxxxx</h5>
            <button type="button" class="close">
              <span>&times;</span>
            </button>
          </div>

          <div class="modal-body">

            <!-- 回复 -->
            <form>
              <div class="form-group row">
                <div class="col-md-12">
                  <textarea class="form-control" id="username" placeholder="回复内容……" cols="30" rows="10"></textarea>
                </div>
              </div>
            </form>

          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-primary">回复</button>
            <button type="button" class="btn btn-secondary">取消</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import url from '../../config'
import Header from './Header'

export default {
  data() {
    return {
      pageIndex: 1,//当前页码
      pageNum: 2,//每页显示的条数
      pages: 0,//总页数
      datas: [],
    }
  },
  components: {
    Header,

  },

  created() {
    this.initData()
  },

  methods: {
    initData() {
      fetch(`${url.firPro}/initData?pageIndex=${this.pageIndex}&pageNum=${this.pageNum}`).then(res => {
        return res.json()
      }).then(d => {
        this.pages = d.pageCount
        this.datas = d.data

      })
    },

    changePage(n) {
      n = Math.max(1, n)
      n = Math.min(this.pages, n)
      if (n == this.pageIndex) return
      this.pageIndex = n
      this.initData()
    },

    like(contentId) {
      fetch(`${url.firPro}/like`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contentId: contentId.toString(),
          uid: localStorage.getItem('uid')
        })
      }).then(res => {
        return res.json()
      }).then(res => {
        if (res.code) {
          alert(res.data)
        } else {
          this.datas.forEach(item => {
            if (item.id == res.data[0].id) {
              item.like_count = res.data[0].like_count
            }
          })
        }
      })
    }
  }

}
</script>
<style lang='stylus' scoped>
@import '../../assets/css/firstProject/bootstrap.min.css'
.container
  text-align left
</style>