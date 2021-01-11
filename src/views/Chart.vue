<template>
  <div>
    <!-- Loading 效果-->
    <loading :active.sync="isLoading">
      <template slot="before">Please wait</template>
      <template slot="after">loading</template>
      <!-- <Loading1 /> -->
    </loading>
    <Hamburger />
    <chart v-if="loaded" :chart-data="chartData" />
  </div>
</template>


<script>
import chart from '../components/Chart.vue'
import Hamburger from '@/components/Hamburger.vue'
import cityName from '../assets/CityCountyData.json'

export default {
  components: {
    chart,
    Hamburger
  },
  data: () => ({
    // 處理資料非同步問題，確認有資料後，才畫圖
    loaded: false,
    // 資料載入提示
    isLoading: false,
    data: [],
    width: 500,
    cityName,
    delete: ['南海島', '釣魚臺', '連江縣'],
    cityArray: {},
    chartCityName: [],
    chartContent: {
      臺北市: 0,
      基隆市: 0,
      新北市: 0,
      宜蘭縣: 0,
      新竹市: 0,
      新竹縣: 0,
      桃園市: 0,
      苗栗縣: 0,
      臺中市: 0,
      彰化縣: 0,
      南投縣: 0,
      嘉義市: 0,
      嘉義縣: 0,
      雲林縣: 0,
      臺南市: 0,
      高雄市: 0,
      澎湖縣: 0,
      金門縣: 0,
      屏東縣: 0,
      臺東縣: 0,
      花蓮縣: 0
    },
    change: {},
    chartX: [],
    chartY: [],
    chartData: {
      // 位於 x 軸的各筆數據 key
      labels: [],
      // 圖表
      datasets: [
        {
          // type: 'bar',
          // x 軸的標籤項目
          label: '餐廳數量',
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 5,
          // 位於 y 軸對應的各筆數據 value
          data: []
        }
        // {
        //   label: '排名2',
        //   backgroundColor: [
        //     'rgba(255, 99, 132, 0.2)',
        //     'rgba(54, 162, 235, 0.2)',
        //     'rgba(255, 206, 86, 0.2)'
        //   ],
        //   borderColor: [
        //     'rgba(255,99,132,1)',
        //     'rgba(54, 162, 235, 1)',
        //     'rgba(255, 206, 86, 1)'
        //   ],
        //   borderWidth: 5,
        //   data: ['0', '1', '2', '1']
        // }
      ]
    }
  }),
  mounted() {
    this.getApiData()
  },
  methods: {
    getApiData() {
      const api = `${process.env.VUE_APP_APIPATH}/restaurants`
      this.isLoading = true
      this.$http.get(api).then(Response => {
        // console.log(Response)
        this.data = Response.data.data
        let temp = []
        this.data.forEach(el => {
          temp.push(el.county)
        })
        // console.log(temp)
        Array.from(temp)
        this.countNum(temp)
        this.getChartXY()
        this.isLoading = false
        this.loaded = true
      })
    },
    // get chart data
    getChartXY() {
      cityName.forEach(el => {
        this.chartX.push(el.CityName)
      })
      this.chartData.labels = this.chartX
      this.chartData.datasets[0].data = this.chartY
      this.removeByValue(this.chartData.labels, this.delete)
      // console.log(this.chartData.labels)
      // this.removeByValue(this.chartData.labels, '釣魚臺')
      this.loaded = true
    },
    // 統計縣市餐廳數
    countNum(arr) {
      // 初始值給空物件
      let temp = arr.reduce((obj, item) => {
        // in 檢查物件內是否有指定屬性
        if (item in obj) {
          // 若有此屬性，則值加 1
          obj[item]++
        } else {
          // 若無則新增 item 屬性並賦值 1
          obj[item] = 1
        }
        return obj
      }, {})
      // console.log(temp)
      this.change = this.map(temp, this.chartContent)
      // console.log(this.change)
      for (let prop in this.change) {
        if (this.change[prop] !== 0) {
          this.chartY.push(this.change[prop])
        } else {
          this.change[prop] = 0
          this.chartY.push(this.change[prop])
        }
      }
      // console.log(this.chartY)
    },
    // 處理數量更新
    map(obj, obj2) {
      for (let prop in obj) {
        for (let item in obj2) {
          if (prop === item) {
            obj2[item] = obj[prop]
          }
        }
      }
      // console.log(obj2)
      return obj2
    },
    // getChartX() {
    //   for (let prop in this.chartContent) {
    //     this.chartX.push(prop)
    //   }
    //   this.chartContent.forEach(item => {
    //     this.chartX.push(item.city)
    //     // this.chartY.push(item.num)
    //   })
    //   console.log(this.chartX)
    // },
    // 刪除不要的地區資料
    removeByValue(array, array2) {
      return array.forEach((item, index) => {
        array2.forEach(value => {
          if (item === value) {
            array.splice(index, 1)
          }
        })
      })
    }
  },
  computed: {
    // myStyles() {
    //   return {
    //     width: `${this.width}px`,
    //     position: 'relative'
    //   }
    // }
  }
}
</script>