import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MyWorkspace from '../views/myWorkspace.vue'
import Build from '../views/build.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  {path: '/myWorkspace' , name: 'Workspace' , component: MyWorkspace},
  {path: '/build', name:'Build', component: Build},
  {path: '/build/:label_id', name: 'Build_label', component:Build, props: true}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
