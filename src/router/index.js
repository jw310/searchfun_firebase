import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebaseDB from '@/firebase_connectDB.js'

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../views/Logout.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: { requiresAuth: true } //需經導航守衛做完驗證後才進入該頁面，路由回傳訊息判斷登入狀態
  },
  {
    path: '/chart',
    name: 'Chart',
    component: () => import('../views/Chart.vue')
  },
]

const router = new VueRouter({
  routes
})

/*
導航守衛
當router/index.js (route.js) 發現路由有加上參數 meta: { requiresAuth: true }
代表需要經過導航守衛去做某些驗證
*/

// beforeEach 進入每個 router 前執行以下動作
router.beforeEach((to, from, next) => {
  // console.log('to:', to, 'from:', from, 'next:', next);
  if (to.meta.requiresAuth) { // 需要驗證
    firebaseDB.auth().onAuthStateChanged(function (user) {
      if (user) { //使用者已登入，可以取得資料
        // let email = user.email;
        // let uid = user.uid;
        console.log(user)
        console.log('已驗證');
        next()
      } else {
        console.log('使用者未登入')
        next({ path: '/login' })
      }
    });
  } else { // 反之不需要驗證的話直接放行
    next();
  }
});

export default router
