<template>
  <nav>
    <ul class="menu-s">
      <li>
        <router-link to="/">
          <i class="fas fa-search-location" aria-hidden="true"></i>
          查詢頁面
        </router-link>
      </li>
      <li>
        <a href="https://jw310.github.io/vue3_googlemap_api/?#/" target="_blank">
          <i class="fas fa-search-location" aria-hidden="true"></i>查經緯度
        </a>
      </li>
      <li>
        <router-link class="admin mr-1" to="/chart">
          <i class="fas fa-table"></i>資料統計
        </router-link>
      </li>
      <li>
        <router-link class="admin mr-1" to="/login">
          <i class="fas fa-thumbtack"></i>地標管理
        </router-link>
      </li>
    </ul>

    <a href="#" class="showmenu" @click="showMenu()">
      <i class="fas fa-bars"></i>
    </a>
  </nav>
</template>


<script>
import $ from 'jquery'

export default {
  name: 'Hamburger',
  methods: {
    showMenu() {
      $('.showmenu').on('click', function(e) {
        // 用 on 監聽 .burgar_btn 的點擊功能
        // 點擊 burgar_btn 時，讓原本的 a 連結效果無效
        e.preventDefault()
        // toggleClass()可以用來為匹配的元素進行新增或是刪除CSS類別。實際運作時有點類似開關一樣。如果某個類別存在，那就刪除他，若是不存在那就新增。
        $('body').toggleClass('menu-show')
      })
    }
  }
}
</script>

<style scoped lang="scss">

.menu-s {
  display: none;
  position: fixed;
  width: 100%;
  // border-bottom: 1px solid #777;
  // padding: 10px 10px;
  text-transform: uppercase;
  // background-color: rgba(255, 255, 255, 0.8);
  z-index: 999;
  list-style-type: none;
  li {
    line-height: 2em;
  }
  a {
    color: #000;
    text-decoration: none;
  }
}

.showmenu {
  color: #30A9DE;
  display: none;
  width: 50px;
  height: 50px;
  position: fixed;
  top: 0;
  left: 28px;
  z-index: 999;
  cursor: pointer;
  .fa-bars {
    font-size: 35px;
  }
}

@media (max-width: 575px) {
  .navbar {
    // display: none;
  }
  .menu-s {
    /*選單出現*/
    display: block;
    /*隱藏選單開始*/
    max-height: 0px;
    overflow: hidden;
    /*隱藏選單結束*/
    transition: max-height 1.3s;
    margin-top: 1px;
    /*絕對定位疊在網頁上*/
    position: fixed;
    z-index: 999;
    top: 81px;
    left: -100px;
    background: #fff;
  }
  // .menu-s li{
  // border-bottom: 1px dashed #69CA62;
  // }
  .menu-s li a {
    transition: all 0.2s;
  }
  .menu-s li a:hover {
    background: gray;
    color: #fff;
  }
  .showmenu {
    display: block;
    float: right;
    margin: 1em;
  }
  /*jQ點擊後動態在 body 加上 class 影響選單高度*/
  .menu-show .menu-s {
    max-height: 200px;
  }
}
</style>
