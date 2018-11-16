<template>
  <div class="todoList">
    <h1>数据库版的todoList</h1>
    <div class="add">
      <input type="text" placeholder='请输入任务名' v-model="newTask">
      <button @click="addTask">添加新任务 </button>

      <button :class="{active:type===''}" @click="changeType('')">所有</button>
      <button :class="{active:type===1}" @click="changeType(1)">已完成</button>
      <button :class="{active:type===0}" @click="changeType(0)">未完成</button>
    </div>
    <hr>
    <ul class="list">
      <li class="item" v-for="(item,index) in datas" :key="index" :class="{done:item.done === '1'? true: false}">
        <input type="checkbox">
        {{item.id}} - {{item.task}} - {{item.done}}
      </li>
    </ul>
    <div class="pageindex">
      <a href="" @click.prevent="changePage(num)" v-for="(num,i) in 4 " :key="i" :class="{active:num === index }">
        {{num}}
      </a>
    </div>
  </div>
</template>
<script>
import env from '../../config'
export default {
  data() {
    return {
      newTask: '',
      done: 0,
      index: 1, //当前页码数
      num: 3, //每页显示的条数
      type: '',
      datas: []
    }
  },

  mounted() {
    console.log(typeof (this.index));

    this.initData()
  },
  methods: {
    addTask() {
      fetch(`${env.url}/addTodo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          task: this.newTask,
          done: this.done
        }),
      }).then(res => {
        return res.json()
      }).then(data => {
        if (!data.code) {
          this.initData()
          alert(data.data)
        } else {
          alert(data.data)
        }
        this.newTask = ''
      })
    },

    initData() {
      fetch(`${env.url}/todoList?index=${this.index}&num=${this.num}&type=${this.type}`).then(res => {
        return res.json()
      }).then(data => {
        this.datas = data.todos
      })
    },
    changePage(num) {
      this.index = num
      this.initData()
    },
    changeType(n) {
      this.type = n
      this.initData()
    }
  }


}
</script>
<style lang='stylus' scoped>
.todoList
  padding 20px 
  text-align left
  .add
    margin 10px 0
    button 
      margin-left 10px
      &.active
        background yellow  
  .list
    padding 10px
    .item
      line-height 24px
    .done
      text-decoration line-through
      color #ccc
  .pageindex a
    margin 0 5px
    &.active
      color red
</style>