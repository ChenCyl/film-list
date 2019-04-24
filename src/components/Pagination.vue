<template>
  <div class="pagination" :currentPage="currentPage">
    <button @click="lastPage"><</button>
    <span
      v-for="i in pageCount"
      v-bind:key="i"
      v-bind:class="[i == currentPage ? 'highlight' : '']"
    >{{i}}</span>
    <button @click="nextPage">></button>
  </div>
</template>

<script>
export default {
  name: "pagination",
  model: {
    prop: 'currentPage',
    event: 'click'
  },
  props: {
    total: Number, // 总条目数
    currentPage: { // 当前页数
      type: Number,
      default: 1
    },
    pageSize: { // 每页条目数
      type: Number,
      default: 10
    }
  },
  data() {
    return {};
  },
  computed: {
    // 总页数
    pageCount() {
      return Math.floor(this.total / this.pageSize) + 1;
    }
  },
  methods: {
    // 功能：翻页
    // 返回值：true 可以翻页
    //        false 不可以翻页
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++
        this.$emit('click', this.currentPage)
        return true;
      } else {
        return false;
      }
    },
    lastPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.$emit('click', this.currentPage)
        return true
      }
      else {
        return false
      }
    }
  }
};
</script>

<style scoped>
.highlight {
  color: aqua;
}
</style>
