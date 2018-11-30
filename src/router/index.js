import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


import TodoList from '../components/todoList/index'
import FirstProject from '../components/firstProject'
import Meishi from '../components/meishiBak'

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
    {
      path: '/firstProject',
      component: FirstProject
    },
    {
      path: '/meishi',
      component: Meishi
    },
  ]
})