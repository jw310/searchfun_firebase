<template>
  <div class="loading">
    <img src="../assets/images/plain-circle.svg" alt />
  </div>
</template>
<script>
export default {
  name: 'Loading'
  // data() {
  //   return {
  //     baseUrl: process.env.VUE_APP_IMGURL
  //   }
  // }
}
</script>
<style lang="scss" scoped>
.loading {
  background: #dedfdf;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 120px;
    opacity: 0.9;
  }
}
</style>