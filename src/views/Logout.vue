<template>
  <div>
    <a href="#" @click.prevent="signout">登出</a>
  </div>
</template>

<script>
export default {
  name: 'Logout',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    signout() {
      //  對應 config 裡的 dev.env.js 的環境變數
      const api = `${process.env.VUE_APP_APIPATH}/user/logout`
      console.log(api)
      // 申請apipath
      const vm = this
      this.$http.get(api).then(response => {
        console.log(response.data)
        if (response.data.success) {
          vm.$router.push('/login') // 登入回到首頁
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
