<template>
  <div>
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal">登入</h1>
      <label for="email" class="sr-only">email</label>
      <input
        type="text"
        id="email"
        class="form-control"
        placeholder="email"
        v-model="user.email"
        required
        autofocus
      />
      <label for="password" class="sr-only">Password</label>
      <input
        type="password"
        id="password"
        class="form-control"
        placeholder="Password"
        v-model="user.password"
        required
      />
      <!-- <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div> -->
      <button class="btn btn-lg btn-primary btn-block" type="submit">送出</button>
      <p class="mt-3 text-muted">若尚未註冊，請先完成註冊手續</p>
      <router-link class="admin" to="/signup">
        <button class="btn btn-lg btn-primary mt-1 btn-block" type="submit">註冊</button>
      </router-link>
      <p class="mt-3 mb-3 text-muted">&copy; 2020</p>
    </form>
  </div>
</template>

<script>
import firebaseDB from '@/firebase_connectDB.js'

export default {
  name: 'Login',
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signin() {
      firebaseDB.auth()
      .signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(result => {
        console.log(result)
        this.$router.push('/admin')
      }).catch(error => {
        console.log(error.message)
        // this.$router.push('/login')
      });
    }
  }
}
</script>


<style scoped>
/* scoped 只對裡面的元件樣式有效 */
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
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