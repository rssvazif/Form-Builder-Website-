import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MyWorkspace from '../views/myWorkspace.vue'
import Build from '../views/build.vue'
import Form from '../views/from.vue'
import Profile from "../views/profile.vue"

const routes = [
  { path: '/', name: 'Home', component: Home },
  {path: '/myWorkspace' , name: 'Workspace' , component: MyWorkspace},
  {path: '/build', name:'Build', component: Build},
  {path: '/build/:label_id', name: 'Build_label', component:Build, props: true},
  {path: '/form/:form_id',name: 'formSubmission' , component:Form , props: true},
  {path: "/profile",name: "profile", component: Profile}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
