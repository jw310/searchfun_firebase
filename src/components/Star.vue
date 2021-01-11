<template>
  <ul class="star-box">
    <li v-for="(i, index) in 5" :key="i">
      <span :style="{width: starWidth(index)}"></span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    score: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    starArr: []
  }),
  methods: {
    initStar() {
      // | 數學運算式將小數點去掉
      const int = this.score | 0
      // 將分數處理成陣列
      const point = this.score.toFixed(1).split('.')[1]
      for (let s = 0; s < int; s++) {
        this.starArr.push(1)
      }
      // console.log(this.starArr)
      if (point === '0') return
      // + 轉型別為數字
      this.starArr.push(+`0.${point}`)
    },
    starWidth(index) {
      // 處理 NaN
      const w = (this.starArr[index] || 0) * 100
      return `${w}%`
    }
  },
  mounted() {
    this.initStar()
  }
}
</script>


<style lang="scss" scoped>
.star-box {
  display: flex;
  justify-content: space-between;
  width: 180px;
  // margin: 0 auto;
  padding: 0;
  // star
  li {
    display: block;
    width: 30px;
    height: 30px;
    background-image: url('../assets/images/estar.svg');
    background-size: auto 100%;
    margin: 0 3px;
    // yellow star
    span {
      display: block;
      width: 0%;
      height: 100%;
      background-image: url('../assets/images/star.svg');
      background-size: auto 100%;
    }
  }
}
</style>