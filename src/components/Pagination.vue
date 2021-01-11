<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disable': !pageNum.has_pre}">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="getPage(pageNum.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in pageNum.total_pages"
          :key="page"
          :class="{'active': pageNum.current_page === page}"
        >
          <a class="page-link" href="#" @click.prevent="getPage(page)">{{ page }}</a>
        </li>
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="getPage(pageNum.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  // 父元件使用 props 將資料傳給子元件 設定型別
  props: {
    pageNum: {
      type: Object
    }
  },
  // 子元件透過 events up($emit)將結果傳回父元件
  methods: {
    getPage(page) {
      this.$emit('getPage', page)
    }
  }
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  margin: 20px 30px;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>