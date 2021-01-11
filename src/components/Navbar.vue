<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <ul class="nav flex-column">
        <router-link to="/">
          <i class="fas fa-search-location" aria-hidden="true"></i>
          查詢頁面
        </router-link>
      </ul>
      <ul class="nav flex-column">
        <li class="nav-item">
          <a href="https://jw310.github.io/vue3_googlemap_api/?#/" target="_blank">
            <i class="fas fa-search-location" aria-hidden="true"></i>查經緯度
          </a>
        </li>
      </ul>
      <ul class="nav flex-column">
        <router-link class="admin mr-1" to="/chart">
          <i class="fas fa-table"></i>資料統計
        </router-link>
      </ul>
      <ul class="nav flex-column">
        <router-link class="admin mr-1" to="/login">
          <i class="fas fa-thumbtack"></i>地標管理
        </router-link>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    // signout () {
    // //  對應 config 裡的 dev.env.js 的環境變數
    // // const api = 'https://vue-course-api.hexschool.io/logout';
    //   const api = `${process.env.VUE_APP_APIPATH}/logout`
    //   // api 伺服器路徑 申請apipath
    //   const vm = this
    //   this.$http.post(api).then((response) => {
    //     console.log(response.data)
    //     if (response.data.success) {
    //       vm.$router.push('/login') // 登入回到首頁
    //     }
    //   })
    // },
  }
}
</script>

<style scoped lang="scss">
.navbar {
  position: relative;
  justify-content: flex-end;
  width: 100%;
  a {
    margin: 0 10px;
  }
}

@media (max-width: 575.98px) {
    .navbar {
      display: none;
    }
}

</style>
