<template>
  <div class="pagination" :currentPage="currentPage">
    <button @click="lastPage"><</button>
    <button
      v-for="i in pageCount"
      v-bind:key="i"
      v-bind:class="[i == currentPage ? 'highlight' : '']"
      @click="changePage"
    >{{i}}</button>
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
      return Math.floor(this.total / this.pageSize) < this.total / this.pageSize?
      Math.floor(this.total / this.pageSize) + 1 : this.total / this.pageSize;
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
    },
    changePage(event) {
      this.$emit('click', parseInt(event.target.innerText))
    },
  }
};
</script>

<style scoped>
.highlight {
  color: coral;
}
button {
  border: 0;
  font-size: 16px;
  font-weight:500
}
button:hover {
  cursor: pointer;
}
button:focus {
  outline: 0ch;
}
</style>
