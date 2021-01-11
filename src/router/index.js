import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Admin from '../views/Admin.vue'
import Signup from '../views/Signup.vue'
import Chart from '../views/Chart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',  /*其他不存在的頁面 */
    redirect: '/',  //重新導向 /
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
    component: Admin,
    // 路由回傳訊息，判斷登入狀態
    meta: { requiresAuth: true }
  },
  {
    path: '/chart',
    name: 'Chart',
    component: Chart
  },
]

const router = new VueRouter({
  routes
})

export default router
