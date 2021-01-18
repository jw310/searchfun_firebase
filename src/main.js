import Vue from 'vue'
import App from './App.vue'
import router from './router'
// ajax
import axios from 'axios'
import VueAxios from 'vue-axios'
// bootstrap modal
import 'bootstrap';
// leaflet css
import "leaflet/dist/leaflet.css"
// MarkerCluster
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import "leaflet.markercluster";
// firebase 套件
import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)

// Vue.component('v-marker-cluster', Vue2LeafletMarkerCluster);

// Loading 效果
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// 載入 Loading 效果元件
import Loading1 from './components/Loading1';
import Loading2 from './components/Loading2';

// 全域方式載入此元件
Vue.component('Loading', Loading)
Vue.component('Loading1', Loading1)
Vue.component('Loading2', Loading2)


// 前端 axios 請求附帶 Cookies 設定
axios.defaults.withCredentials = false

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// const originalPush = router.prototype.push
// router.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err)
// }

/**
 * 導航守衛
 * 當router/index.js (route.js) 發現路由有加上參數 meta: { requiresAuth: true }
 * 代表需要經過導航守衛去做某些驗證
 *  */

// router.beforeEach((to, from, next) => {
//   // console.log('to:', to, 'from:', from, 'next:', next);
//   let user = { username: '', password: '' }
//   if (to.meta.requiresAuth) {
//     // 代表需要驗證
//     console.log('這裡需要驗證');
//     const api = `${process.env.VUE_APP_APIPATH}/user/login`
//     axios.post(api, user).then((response) => {
//       console.log(response.data)
//       if (response.data.success) {
//         // 驗證成功 直接通過
//         console.log('ok')
//         next();
//       } else {
//         console.log('error')
//         // 失敗會到登入頁面
//         next({
//           path: '/login'
//         });
//       }
//     })
//   } else {
//     // 反之不需要驗證的話直接放行
//     next();
//   }
// });