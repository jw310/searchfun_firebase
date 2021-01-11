<script>
// Line 為要使用的圖表種類
import { Line, mixins } from 'vue-chartjs'
// 解構賦值，reactiveProp 會自動建立名為 chartData 的 prop 並同時添加 watch 在這 prop 上，只要 data 改變，會自動更新圖表資料
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  data: () => ({
    // props: {
    //   chartData: {
    //     type: Object,
    //     default: null
    //   }
    // },
    options: {
      // RWD
      responsive: true,
      maintainAspectRatio: false,
      // 尺度、比例
      scales: {
        // y軸
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              stepSize: 1,
              fontSize: 20,
              fontColor: 'green'
            }
          }
        ]
      },
      legend: {
        // position: 'right',
        // align: 'start',
        labels: {
          fontColor: 'black',
          fontSize: 16,
          fontFamily: 'Microsoft YaHei',
          padding: 30
        }
      },
      // 動畫效果
      animation: {
        // 持續時間
        duration: 1000
        // 完成後執行
        // onComplete: function() {
        //   alert('hi')
        // }
      }
    }
  }),
  // 隨資料重複渲染畫面
  mounted() {
    this.chartRender()
  },
  methods: {
    chartRender() {
      this.renderChart(this.chartData, this.options)
    },
    // 更新 labels
    labelsUpdate() {
      this.updateLabels(this.chartData.labels)
    }
  }
}
</script>