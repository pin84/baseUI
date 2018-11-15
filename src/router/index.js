import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


import TodoList from '../components/todoList/index'

export default new Router({

  routes: [
    // {
    //   path: '/',
    //   component: TodoList
    // },
    {
      path: '/todoList',
      component: TodoList
    },
  ]
})