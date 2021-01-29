<template>
  <div>
    <a href="#" @click.prevent="signout">登出</a>
  </div>
</template>

<script>
import firebaseDB from '@/firebase_connectDB.js'

export default {
  name: 'Logout',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    signout() {
      firebaseDB.auth()
      .signOut()
      .then(function() {
        // 登出後強制重整一次頁面
        window.location.reload();
        }).catch(function(error) {
        console.log(error.message)
      });
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
