<template>
  <div class="row no-gutters">
    <!-- Loading 效果-->
    <loading :active.sync="isLoading">
      <template slot="before">Please wait</template>
      <template slot="after">loading</template>
      <!-- <Loading1 /> -->
    </loading>

    <Hamburger />

    <div class="aside col-sm-3">
      <div class="toolbox">
        <!--Sticky 滾動黏滯定位-->
        <div class="select-list shadow-sm p-2">
          <div id="date" class="mb-2"></div>
          <div id="close-aside-btn" class="d-block d-sm-none" @click="closeAsideBar()">
            地圖
            <i class="fas fa-caret-right"></i>
          </div>
          <div class="form-group d-flex">
            <label for="cityName" class="mr-2 col-form-label text-right">縣市</label>
            <!--等寬-->
            <div class="flex-fill">
              <!--切換縣市時移除上次的地標-->
              <select
                id="cityName"
                class="form-control"
                v-model="select.city"
                @change="removeMarker()"
              >
                <option value>-- Select One --</option>
                <option v-for="c in cityName" :value="c.CityName" :key="c.CityName">{{ c.CityName }}</option>
              </select>
            </div>
          </div>

          <div class="form-group d-flex">
            <label for="area" class="mr-2 col-form-label text-right">地區</label>
            <div class="flex-fill">
              <select
                id="area"
                class="form-control"
                v-if="select.city.length"
                v-model="select.area"
                @change="removeMarker();updateMap()"
              >
                <option value>-- Select One --</option>
                <!--find 回傳第一個滿足函式的元素值-->
                <option
                  :value="a.AreaName"
                  v-for="a in cityName.find((city) => city.CityName === select.city).AreaList"
                  :key="a.AreaName"
                >{{ a.AreaName }}</option>
              </select>
            </div>
          </div>

          <div class="form-group d-flex">
            <label for="area" class="mr-2 col-form-label text-right">類別</label>
            <div class="flex-fill">
              <select
                id="category"
                class="form-control"
                v-if="categories.length"
                v-model="select.category"
                @change="removeMarker();categoriesUpdateMap()"
              >
                <option value>-- Select One --</option>
                <option v-for="item in categories" :key="item">{{ item }}</option>
              </select>
            </div>
          </div>

          <div class="form-group d-flex">
            <label for="area" class="mr-2 col-form-label text-right">店名</label>
            <div class="flex-fill">
              <div class="input-group">
                <input
                  class="form-control"
                  type="text"
                  v-model="searchText"
                  placeholder="請輸入"
                  aria-label="Search"
                  @input="search()"
                />
              </div>
            </div>
          </div>

          <!-- <div>
            <button class="btn btn-sm btn-outline-danger mb-2">我的最愛</button>
          </div>-->

          <p class="mb-0 text-muted text-left">請選擇區域查看資訊</p>
        </div>

        <p v-if="searchText" class="mb-1 ml-3 text-muted text-left">Search</p>
        <ul class="list-group">
          <template v-for="(item, key) in filterData">
            <a
              class="list-group-item text-left"
              :key="key"
              v-if=" searchText != ''"
              @click="panTo(item);"
            >
              <h3>
                <a
                  :href="`https://www.google.com.tw/search?q=${item.name}`"
                  target="_blank"
                >{{item.name}}</a>
              </h3>
              <button v-if="item.isFavorites === false" id="loved-btn" class="btn btn-sm btn-outline-danger mb-2" @click="loveBtnActive(item)">收藏</button>
              <button v-if="item.isFavorites === true" id="loved-btn" class="btn btn-sm btn-danger mb-2" @click="loveBtnActive(item)">已收藏</button>
              <star :score="item.score" />
              <p class="mb-0">類型：{{ item.category }}</p>
              <p class="mb-0">推薦：{{ item.recommended }}</p>
              <p class="mb-0">備註：{{ item.description}}</p>
              <p class="mb-0">
                地址：
                <a
                  :href="`https://www.google.com.tw/maps/place/${item.address}`"
                  target="_blank"
                  title="Google Map"
                >{{ item.address }}</a>
              </p>
            </a>
          </template>

          <p
            v-if="select.category"
            class="mb-1 ml-3 text-muted text-left"
          >{{select.city}}-{{select.category}}</p>
          <template v-for="(item, key) in categoriesFilterData">
            <a
              class="list-group-item text-left"
              :key="key"
              v-if=" searchText === ''"
              @click="panTo(item);"
            >
              <h3>
                <a
                  :href="`https://www.google.com.tw/search?q=${item.name}`"
                  target="_blank"
                >{{item.name}}</a>
              </h3>
              <button v-if="item.isFavorites === false" id="loved-btn" class="btn btn-sm btn-outline-danger mb-2" @click="loveBtnActive(item)">收藏</button>
              <button v-if="item.isFavorites === true" id="loved-btn" class="btn btn-sm btn-danger mb-2" @click="loveBtnActive(item)">已收藏</button>
              <star :score="item.score" />
              <p class="mb-0">推薦：{{ item.recommended }}</p>
              <p class="mb-0">備註：{{ item.description}}</p>
              <p class="mb-0">
                地址：
                <a
                  :href="`https://www.google.com.tw/maps/place/${item.address}`"
                  target="_blank"
                  title="Google Map"
                >{{ item.address }}</a>
              </p>
            </a>
          </template>

          <hr />

          <p
            v-if="select.area"
            class="mb-1 ml-3 text-muted text-left"
          >{{select.city}}-{{select.area}}</p>
          <template v-for="(item, key) in data">
            <a
              class="list-group-item text-left"
              :key="key"
              v-if="item.county === select.city
                && item.town === select.area && searchText === ''"
              @click="panTo(item)"
            >
              <div class="d-flex justify-content-between">
                <h3>
                  <a
                    :href="`https://www.google.com.tw/search?q=${item.name}`"
                    target="_blank"
                  >{{item.name}}</a>
                </h3>
                <button v-if="item.isFavorites === false" id="loved-btn" class="btn btn-sm btn-outline-danger mb-2" @click="loveBtnActive(item)">收藏</button>
                <button v-if="item.isFavorites === true" id="loved-btn" class="btn btn-sm btn-danger mb-2" @click="loveBtnActive(item)">已收藏</button>
              </div>
              <star :score="item.score" />
              <p class="mb-0">類型：{{ item.category }}</p>
              <p class="mb-0">推薦：{{ item.recommended }}</p>
              <p class="mb-0">備註：{{ item.description}}</p>
              <p class="mb-0">
                地址：
                <a
                  :href="`https://www.google.com.tw/maps/place/${item.address}`"
                  target="_blank"
                  title="Google Map"
                >{{ item.address }}</a>
              </p>
            </a>
          </template>
        </ul>
      </div>
    </div>

    <!--map 說明-->
    <ul id="legend">
      <li>
        <img src="../../public/img/street-view.png" alt class="img-fluid" width="28" />
        ：目前位置
      </li>
      <li>
        <img src="../../public/img/flag-orange.png" alt class="img-fluid" width="28" />
        ：餐廳位置
      </li>
      <li>
        <i class="fas fa-map-marker-alt"></i>
        <!-- <img src="../../public/img/marker-icon.png" alt class="img-fluid" width="28" /> -->
        ：篩選目標
      </li>
    </ul>

    <!--提醒事項彈跳視窗訊息-->
    <div
      class="modal fade"
      id="infoModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="infoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold" id="infoModalLabel">提醒事項</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ul>
              <li>
                <div class="d-flex justify-between">
                  <p class="mb-1 mr-2">
                    <i class="fas fa-info-circle"></i>
                  </p>
                  <p class="mb-1">
                    店家資料有可能因時間而有更動，
                    <span class="text-danger">請注意。</span>
                  </p>
                </div>
              </li>
              <li>
                <div class="d-flex justify-between">
                  <p class="mb-1 mr-2">
                    <i class="fas fa-info-circle"></i>
                  </p>
                  <p class="mb-1">備註。</p>
                </div>
              </li>
            </ul>
            <hr />
            <div>
              <img src="https://picsum.photos/id/1005/5760/3840.jpg" alt />
            </div>
          </div>
        </div>
      </div>
    </div>

        <!--收藏清單彈跳視窗訊息-->
    <div
      class="modal fade"
      id="favoritesModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="favoritesModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold" id="favoritesModalLabel">收藏</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <template v-for="(item, key) in favoritesData">
            <a
              class="list-group-item text-left"
              :key="key"
              @click="panTo(item);"
            >
              <h3>
                <a
                  :href="`https://www.google.com.tw/search?q=${item.name}`"
                  target="_blank"
                >{{item.name}}</a>
              </h3>
              <star :score="item.score" />
              <p class="mb-0">類型：{{ item.category }}</p>
              <p class="mb-0">
                地址：
                <a
                  :href="`https://www.google.com.tw/maps/place/${item.address}`"
                  target="_blank"
                  title="Google Map"
                >{{ item.address }}</a>
              </p>
            </a>
          </template>
          </div>
        </div>
      </div>
    </div>

    <!--地圖-->
    <div class="map-close col-sm-9">
      <div id="map"></div>
    </div>

    <a class="open-aside_btn d-block d-sm-none" @click="openAsideBar()">
      <i class="fas fa-map-signs"></i>
    </a>
    <!-- <a href="#" class="scrollTop text-center animatedJS d-sm-none" id="top">
      <i class="fas fa-arrow-up"></i>
    </a>-->
  </div>
</template>

<script>
// 載入 leaflet 套件
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import orangeIcon from 'leaflet/dist/images/flag-orange.png'
import userIcon from 'leaflet/dist/images/user.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
// 載入臺灣地區 JSON
import cityName from '../assets/CityCountyData.json'
import $ from 'jquery'
//
import firebaseDB from '@/firebase_connectDB.js'
import Hamburger from '@/components/Hamburger.vue'
import star from '../components/Star.vue'

export default {
  name: 'map',
  components: {
    Hamburger,
    star
  },
  // 箭頭函式進階語法  () => ({})  回傳字面值(回傳值)
  data: () => ({
    data: [],
    osmMap: {},
    cityName,
    select: {
      city: '臺北市',
      area: '',
      category: ''
    },
    searchText: '',
    filterData: [],
    categories: [],
    categoriesFilterData: [],
    favoritesData: [],
    // 存放目前是否已獲得座標的狀態
    hasGeo: false,
    // 定位資訊
    location: [],
    myLocation: [],
    center: [],
    // 圖標樣式
    userIcon: L.icon({
      iconUrl: userIcon,
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: iconShadow,
      shadowSize: [41, 41],
      shadowAnchor: [12, 41]
    }),
    greenIcon: L.icon({
      iconUrl:
        'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [12, 41]
    }),
    blueIcon: L.icon({
      iconUrl: icon,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: iconShadow,
      shadowSize: [41, 41],
      shadowAnchor: [12, 41]
    }),
    orangeIcon: L.icon({
      iconUrl: orangeIcon,
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: iconShadow,
      shadowSize: [41, 41],
      shadowAnchor: [12, 41]
    }),
    isLoading: false,
    score: 0,
    // isLoved: false
  }),
  methods: {
    getFavoritesData() {
      this.favoritesData = [] // 清空之前資料
      const fStore = firebaseDB.firestore()
      fStore.collection('data').where("isFavorites","==", true).get().then( querySnapshot => {
        querySnapshot.docChanges().forEach((element) => {
            this.favoritesData.push({
              ...element.doc.data(),
              id: element.doc.id,
            })
        })
        // console.log(this.favoritesData)
      })
      .catch(err => {
        console.log('Error getting documents', err)
      })
    },
    // 分類功能
    getUnique() {
      const vm = this
      // 新增一個集合，排除值重複情況
      const categories = new Set()
      vm.data.forEach(item => {
        categories.add(item.category)
      })
      // 建立一個新的 Array
      vm.categories = Array.from(categories)
      // console.log(vm.categories);
    },
    updateMap() {
      const pharmacies = this.data.filter(
        pharmacy => pharmacy.town === this.select.area
      )
      // console.log(pharmacies)
      pharmacies.forEach(pharmacy => {
        // 解構，縮短變數名稱
        const { geometry } = pharmacy
        /* marker 建立地標 L.marker(latlng[], options{ icon: myIcon }).addTo(map).bindPopup(content).openPopup()
        addTO 加到圖層
        bindPopup 圖標加上說明(可用HTML語法)
        */
        L.marker([geometry.coordinates[1], geometry.coordinates[0]], {
          icon: this.blueIcon
        })
          .addTo(this.osmMap)
          .bindPopup(
            `名稱: <a href="https://www.google.com.tw/search?q=${pharmacy.name}" target="_blank">${pharmacy.name}</a> <br>
          地址: <a href="https://www.google.com.tw/maps/place/${pharmacy.address}" target="_blank">${pharmacy.address}</a><br>
          電話: ${pharmacy.phone}<br> 類型: ${pharmacy.category}<br>
          推薦: ${pharmacy.recommended}<br> 人均: ${pharmacy.cost}<br>
          <small>營業時間: ${pharmacy.business_hours}</small><br>
          <a href="https://www.google.com/maps/dir/
          ${this.location[0]},${this.location[1]}/
          ${geometry.coordinates[1]},${geometry.coordinates[0]}"
          target="_blank"
          >規劃路線
          </a>`,
            { closeOnClick: false }
          )
      })
      L.marker(this.myLocation, {
        icon: this.userIcon
      }).addTo(this.osmMap)
      this.panTo(pharmacies[0])
    },
    categoriesUpdateMap() {
      const pharmacies = this.data.filter(pharmacy => {
        return (
          pharmacy.category === this.select.category &&
          pharmacy.county === this.select.city
        )
      })
      this.categoriesFilterData = pharmacies
      // console.log(pharmacies, this.categoriesFilterData)
      pharmacies.forEach(pharmacy => {
        // 解構，縮短變數名稱
        const { geometry } = pharmacy
        L.marker([geometry.coordinates[1], geometry.coordinates[0]])
          .addTo(this.osmMap)
          .bindPopup(
            `名稱: <a href="https://www.google.com.tw/search?q=${pharmacy.name}" target="_blank">${pharmacy.name}</a> <br>
            地址: <a href="https://www.google.com.tw/maps/place/${pharmacy.address}" target="_blank">${pharmacy.address}</a><br>
            電話: ${pharmacy.phone}<br> 類型: ${pharmacy.category}<br>
            推薦: ${pharmacy.recommended}<br> 人均: ${pharmacy.cost}<br>
            <small>營業時間: ${pharmacy.business_hours}</small><br>
            <a href="https://www.google.com/maps/dir/
          ${this.location[0]},${this.location[1]}/
          ${geometry.coordinates[1]},${geometry.coordinates[0]}"
          target="_blank"
        >
        規劃路線
        </a>`,
            { closeOnClick: false }
          )
      })
      L.marker(this.myLocation, {
        icon: this.userIcon
      }).addTo(this.osmMap)
      this.panTo(pharmacies[0])
    },
    removeMarker() {
      this.osmMap.eachLayer(layer => {
        // 如果圖層是 L.Marker 產生的話就移除，判斷某個建構式的 prototype 屬性是否存在另外一個要檢測物件的原型鏈上。
        if (layer instanceof L.Marker) {
          this.osmMap.removeLayer(layer)
        }
      })
    },
    // 顯示中心移動到選取的地點
    panTo(item) {
      // console.log(item);
      this.osmMap.panTo([
        item.geometry.coordinates[1],
        item.geometry.coordinates[0]
      ])
      const { geometry } = item
      L.marker([geometry.coordinates[1], geometry.coordinates[0]], {
        icon: this.greenIcon
      })
        .addTo(this.osmMap)
        .bindPopup(
          `名稱: <a href="https://www.google.com.tw/search?q=${item.name}" target="_blank">${item.name}</a> <br>
            地址: <a href="https://www.google.com.tw/maps/place/${item.address}" target="_blank">${item.address}</a><br>
            電話: ${item.phone}<br> 類型: ${item.category}<br>
            推薦: ${item.recommended}<br> 人均: ${item.cost}<br>
            <small>營業時間: ${item.business_hours}</small><br>
                    <a href="https://www.google.com/maps/dir/
          ${this.location[0]},${this.location[1]}/
          ${geometry.coordinates[1]},${geometry.coordinates[0]}"
          target="_blank"
        >
        規劃路線
        </a>`,
          {
            closeOnClick: false
          }
        )
        .openPopup()
    },
    search() {
      this.removeMarker()
      if (this.searchText) {
        // includes 判斷字串是否包含在其他字串，來做模糊搜尋
        const filter = this.data.filter(item =>
          item.name.includes(this.searchText)
        )
        console.log(filter)
        this.filterData = filter
        this.panTo(this.filterData[0])
        const { geometry } = this.filterData[0]
        // 建立地標
        L.marker([geometry.coordinates[1], geometry.coordinates[0]]).addTo(
          this.osmMap
        )
          .bindPopup(`名稱: <a href="https://www.google.com.tw/search?q=${this.filterData[0].name}" target="_blank">${this.filterData[0].name}</a> <br>
            地址: <a href="https://www.google.com.tw/maps/place/${this.filterData[0].address}" target="_blank">${this.filterData[0].address}</a><br>
            電話: ${this.filterData[0].phone}<br> 類型: ${this.filterData[0].category}<br>
            推薦: ${this.filterData[0].recommended}<br> 人均: ${this.filterData[0].cost}<br>
            <small>營業時間: ${this.filterData[0].business_hours}</small>`)
        this.osmMap.eachLayer(layer => {
          // if (layer._zIndex === item.zIndex) {
          // console.log(([item.geometry.coordinates[1], item.geometry.coordinates[0]]))
          layer.openPopup()
          // }
        })
        L.marker(this.myLocation, {
          icon: this.userIcon
        }).addTo(this.osmMap)
      }
    },
    getToday() {
      let today = new Date()
      const days = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      ]
      let h = today.getHours()
      h = h < 10 ? '0' + h : h
      let m = today.getMinutes()
      m = m < 10 ? '0' + m : m
      let s = today.getSeconds()
      s = s < 10 ? '0' + s : s
      let todayStr = `今天是 <span class="font-weight-bold">${today.getFullYear()} 年 ${today.getMonth() +
        1} 月 ${today.getDate()} 日 <br> ${days.find(
        (day, index) => index === today.getDay()
      )} </span><span class="font-weight-bold">${h}:${m}:${s}</span><br><i id="detail-info" class="fas fa-info-circle" data-toggle="modal" data-target="#infoModal"></i>提醒事項
      <button class="btn btn-sm btn-danger" data-toggle="modal"
      data-target="#favoritesModal">收藏清單</button>`
      document.getElementById('date').innerHTML = todayStr
    },
    // 計算大約路程距離
    calcDistance(item) {
      let itemDistance = [
        item.geometry.coordinates[1],
        item.geometry.coordinates[0]
      ]
      // console.log(this.myLocation, a)
      let myLocation = L.latLng(this.myLocation)
      let distance =
        myLocation.distanceTo(L.latLng(itemDistance)).toFixed(1) / 1000
      const latlngs = [myLocation, itemDistance]
      // 畫出折線
      L.polyline(latlngs).addTo(this.osmMap)
      alert(`到 ${item.name} 的直線距離約為 ${distance.toFixed(2)} 公里`)
    },
    async loveBtnActive(item) {
      // console.log(item)
      if (item.isFavorites === false) {
        item.isFavorites = true
      } else {
        item.isFavorites = false
      }
      let tempObj = { isFavorites: item.isFavorites }
      const fStore = firebaseDB.firestore()
      await fStore.collection('data').doc(item.id).update(tempObj)
      this.getFavoritesData()
    },
    // 定位目前位置
    geolocate() {
      if (navigator.geolocation) {
        // alert('/* 地理位置服務可用 */')
        navigator.geolocation.getCurrentPosition(position => {
          // console.log(position)
          this.myLocation = [
            position.coords.latitude,
            position.coords.longitude
          ]
          L.marker([position.coords.latitude, position.coords.longitude], {
            icon: this.userIcon
          }).addTo(this.osmMap)
          // 視窗移動到定位點
          this.osmMap.setView(this.myLocation, 18)
          // this.osmMap.locate({
          //   setView: true,
          //   watch: true,
          //   maxZoom: 16
          // })
        })
      } else {
        console.log('抱歉，您的裝置不支援定位功能。')
      }
    },
    // 加上縣市邊界
    fetchTWGeo() {
      // // tw-county.geojson 要放在 public 資料夾下，用 fetch 會是公開資料
      // // http://localhost:8080/geojson/tw-county.geojson 可看到資料
      const api =
        `${process.env.VUE_APP_GEOURL}` || `/geojson/tw-county.geojson`
      // console.log(api)
      fetch(api)
        .then(response => {
          // 得到一個 ReadableStream 的物件
          // console.log(response)
          // 透過 return blob(), json(), text() 轉成可用的資訊
          return response.json()
        })
        .then(json => {
          // console.log(json)
          // 行政區邊界放到地圖
          this.twcounty = L.geoJSON(json, { color: '#333', opacity: 0.3 })
            // 點擊時會顯示縣市
            .bindPopup(function(layer) {
              // console.log(layer.feature.properties.name)
              return layer.feature.properties.name
            })
            .addTo(this.osmMap)
          this.osmMap.fitBounds(this.twcounty.getBounds())
        })
        .catch(err => {
          console.log('錯誤:', err)
        })
    },
    // 點叢集
    markerCluster() {
      // 初始化
      let clusterMarkers = L.markerClusterGroup({
        spiderfyOnMaxZoom: false,
        // 顯示叢集邊界
        showCoverageOnHover: true,
        zoomToBoundsOnClick: true
        // 自訂群集樣式
        // iconCreateFunction: function(cluster) {
        //   return L.divIcon({
        //     html: `<div class="marker-cluster">${cluster.getChildCount()}</div>`
        //   })
        // }
      })
      // 將點放入叢集
      this.data.forEach(item => {
        const { geometry } = item
        let markers = L.marker(
          [geometry.coordinates[1], geometry.coordinates[0]],
          {
            icon: this.orangeIcon
          }
        ).bindPopup(
          `名稱: <a href="https://www.google.com.tw/search?q=${item.name}" target="_blank">${item.name}</a> <br>地址: <a href="https://www.google.com.tw/maps/place/${item.address}" target="_blank">${item.address}</a><br>`,
          { closeOnClick: false }
        )
        clusterMarkers.addLayer(markers)
      })
      // console.log(clusterMarkers)
      // 叢集加在圖層上
      this.osmMap.addLayer(clusterMarkers)
    },
    // close-aside-bar
    closeAsideBar() {
      $('.aside').addClass('hide')
      $('#map').removeClass('map-close')
      $('.open-aside_btn').addClass('open-aside-btn')
      // 顯示說明
      $('#legend').css('opacity', '1')
    },
    // open-aside-bar
    openAsideBar() {
      $('.aside').removeClass('hide')
      $('.open-aside_btn').removeClass('open-aside-btn')
      $('#legend').css('opacity', '0')
    }
  },
  // 取得 API 資料
  mounted() {
    this.getToday()
    this.getFavoritesData()
    // this.fetchTWGeo()
    this.isLoading = true
    const fStore = firebaseDB.firestore()
    fStore.collection('data').onSnapshot((res) => {
      // console.log(res.docChanges())
      const changes = res.docChanges()
      changes.forEach((element) => {
        if (element.type === 'added') {
          // 取得資料欄位內容
          // console.log(element.doc.data())
          this.data.push({
            ...element.doc.data(),
            id: element.doc.id,
          })
        }
      })
      this.getUnique()
      this.markerCluster()
      this.isLoading = false
    })
    // 新增並顯示地圖 L.map(id, options)
    this.osmMap = L.map('map', {
      // center: [25.004506, 121.45449509999999],
      center: [25.03371, 121.564718],
      // center: this.center,
      zoom: 16
    })
    // watch 則是持續監聽使用者的位置 setView 可以設定地圖座標
    // this.osmMap.locate({ setView: true, watch: true, maxZoom: 15 });
    //OpenStreetMap
    // 載入圖層到地圖(不然地圖會是空白) L.tileLayer(urlTemplate, options).addTo(map)
    const openstreetmap = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
      {
        foo: 'bar',
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 20
      }
    ).addTo(this.osmMap)
    // mapbox 圖資
    const mapbox = L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          'pk.eyJ1IjoianczMTAiLCJhIjoiY2s5M2xsbnNsMDNsNTNkbWJ1dGo1dWxmOCJ9.p5GqFYekxPr96MmGn5QCbg'
      }
    ).addTo(this.osmMap)
    // 圖層切換
    L.control
      .layers(
        {
          openstreetmap: openstreetmap,
          mapbox: mapbox
        },
        {}
      )
      .addTo(this.osmMap)
    // L.control
    //   .zoom({
    //     position: 'topright'
    //   })
    //   .addTo(this.osmMap)
    // 比例尺
    L.control
      .scale({
        metric: true,
        position: 'topright'
      })
      .addTo(this.osmMap)
    this.geolocate()
    //加上圖標
    // L.marker([25.03371, 121.564718], {
    //   icon: this.greenIcon
    // }).addTo(this.osmMap);
    // 多邊形
    // L.polygon([
    //   [22.992, 120.289],
    //   [22.982, 120.299],
    //   [22.97, 120.267],
    //   [22.99, 120.267]
    // ]).addTo(this.osmMap)
    // 圓形
    // L.circle(
    //   [22.988, 120.220], // 圓心座標
    //   1000, // 半徑（公尺）
    //   {
    //     color: 'red', // 線條顏色
    //     fillColor: '#f03', // 填充顏色
    //     fillOpacity: 0.5 // 透明度
    //   }
    // ).addTo(this.osmMap)
    // 獨立訊息
    // L.popup()
    //   .setLatLng([23.010, 120.289])
    //   .setContent('獨立的訊息方塊。')
    //   .openOn(this.osmMap)
  }
}
</script>

<style lang="scss">
</style>