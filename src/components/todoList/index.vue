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
        <input type="checkbox" :checked="item.done === '1' ? true :false" @click.prevent="changeState(item.id,item.done)"> {{item.id}} - {{item.task}} - {{item.done}}
        <button @click="deleteItem(item.id)">delete</button>
      </li>
    </ul>
    <div class="pageindex">
      <a href="" @click.prevent="changePage(num)" v-for="(num,i) in count " :key="i" :class="{active:num === index }">
        {{num}}
      </a>
      <span>每页显示 </span>
      <select @change='selectChange' ref="select">
        <option value="num" v-for="(n,i) in options" :key="i">{{n}}</option>
      </select>
      <span> 项 </span>
    </div>
  </div>
</template>
<script>
import env from '../../config'
export default {
  data() {
    return {
      newTask: '',
      done: 0, //完成或未完成的状态
      index: 1, //当前页码数
      num: 5, //每页显示的条数
      type: '', //数据库中done的类型。1：完成 ，0：未完成
      count: 0,//页码数
      options: 20, //下拉菜单的最大值 
      datas: [],
    }
  },

  computed:{

  },

  mounted() {
    this.initData()
  },
  methods: {
  
    initData() { //todolist
      fetch(`${env.url}/todoList?index=${this.index}&num=${this.num}&type=${this.type}`).then(res => {
        return res.json()
      }).then(data => {
        this.count = data.count 
        this.datas = data.todos
        this.$refs.select.selectedIndex = this.num -1
      })
    },
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
    changePage(num) {
      this.index = num
      this.initData()
    },
    changeType(n) {
      this.index = 1 //防止完成或未完成的数据只有一个，但是页面切换到第二页时。会查询出一个数据 显示不出来
      this.type = n
      this.initData()
    },
    changeState(id, done) {
      //改变状态 1：已完成 0：未完成
      let flag = done === '1' ? '0' : '1'
      fetch(`${env.url}/changeState?id=${id}&done=${flag}`).then(res => {
        return res.json()
      }).then(data => {
        if (data.code === 0) {
          this.initData()
        } else {
          alert(data.row)
        }
      })
    },
    deleteItem(id) {
      fetch(`${env.url}/delete?id=${id}`).then(res => {
        return res.json()
      }).then(data => {
        if (data.code === 0) {
          this.initData()
        } else {
          alert(data.row)
        }
      })
    },
    selectChange(){
      let select  = this.$refs.select
      let selectValue = select.options[select.selectedIndex].text 
      console.log(selectValue);
      
      this.num = Number.parseInt(selectValue)
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
      line-height 34px
    .done
      text-decoration line-through
      color #ccc
  .pageindex
    height 60px
    a
      margin 0 5px
      &.active
        color red

</style>