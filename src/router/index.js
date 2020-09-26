import Vue from 'vue'
import VueRouter from 'vue-router'
import create_task from '@/views/create_task.vue';
import task_info from '@/views/task_info.vue';

Vue.use(VueRouter)

const routes = [
  {path:'/create_task',component: create_task, alias: '/'},
  {path:'/task_info/', name:'task_info',  component: task_info, props:true }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
