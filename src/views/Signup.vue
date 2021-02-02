<template>
  <div>
    <form class="form-signin" role="form" @submit.prevent="signup">
      <h2 class="form-signin-heading">註冊</h2>

      <!-- <label for="username" class="sr-only">Username:</label>
      <input
        id="username"
        name="username"
        type="text"
        class="form-control mt-4"
        placeholder="帳號"
        v-model="user.username"
        required
      /> -->

      <label for="email" class="sr-only">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        class="form-control mt-4"
        placeholder="example@example.com"
        v-model="user.email"
        required
      />

      <label for="password" class="sr-only">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        class="form-control mt-4"
        placeholder="密碼請超過5個字元"
        v-model="user.password"
        required
      />

      <label for="repassword" class="sr-only">Repassword:</label>
      <input
        id="repassword"
        name="repassword"
        type="password"
        class="form-control mt-4"
        placeholder="請確認密碼"
        v-model="user.repassword"
        required
      />
      <button id="btnSub" class="btn btn-lg btn-primary mt-4 mb-1" type="submit">註冊</button>
    </form>
    <!-- <a class="mr-4" href="/" role="button">登入</a> -->
    <a href="/" role="button">回查詢頁面</a>
  </div>
</template>

<script>
import firebaseDB from '@/firebase_connectDB.js'

export default {
  name: 'signup',
  data() {
    return {
      user: {
        // username: '',
        email: '',
        password: '',
        repassword: ''
      }
    }
  },
  methods: {
    signup() {
      // console.log(firebaseDB)
    if (this.user.password === this.user.repassword) {
        firebaseDB.auth()
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then(result => {
          console.log(result)
          this.$router.push('/')
          firebaseDB.auth().languageCode = 'zh-TW' // 修改信件語言
          let user = firebaseDB.auth().currentUser // 取得使用者資料
            user
            .sendEmailVerification()
            .then(function() {
              // 驗證信發送完成
              window.alert('驗證信已發送到您的信箱，請查收。')
            }).catch(error => {
              // 驗證信發送失敗
              console.log(error.message);
            });
        }).catch(function(error) {
          console.log(error.message)
        });
      } else {
        window.alert('密碼確認錯誤')
      }
    }
  }
}
</script>

<style lang="scss">
.form-signin,
.form-login {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>