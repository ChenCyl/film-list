<template>
  <div class="pagination" :currentPage="currentPage">
    <button @click="lastPage"><</button>
    <button v-bind:class="[1 == currentPage ? 'highlight' : '']" @click="changePage">1</button>
    <span v-show="[1,2,3].indexOf(currentPage) == -1">...</span>
    <button
      v-for="i in pageCount"
      v-bind:key="i"
      v-bind:class="[i == currentPage ? 'highlight' : '']"
      @click="changePage"
      v-show="i !== 1 && i !== pageCount && Math.abs(i - currentPage) < 3"
    >{{i}}</button>
    <span v-show="[pageCount,pageCount-1,pageCount-2].indexOf(currentPage) == -1">...</span>
    <button
      v-bind:class="[pageCount == currentPage ? 'highlight' : '']"
      @click="changePage"
    >{{pageCount}}</button>
    <button @click="nextPage">></button>
    <input type="text" v-model="input" placeholder="跳转到..." @keyup.enter="changePage">
  </div>
</template>

<script>
export default {
  name: "pagination",
  model: {
    prop: "currentPage",
    event: "click"
  },
  props: {
    total: Number, // 总条目数
    currentPage: {
      // 当前页数
      type: Number,
      default: 1
    },
    pageSize: {
      // 每页条目数
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      input: null
    };
  },
  computed: {
    // 总页数
    pageCount() {
      return Math.floor(this.total / this.pageSize) < this.total / this.pageSize
        ? Math.floor(this.total / this.pageSize) + 1
        : this.total / this.pageSize;
    }
  },
  methods: {
    // 功能：翻页
    // 返回值：true 可以翻页
    //        false 不可以翻页
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++;
        this.$emit("click", this.currentPage);
        return true;
      } else {
        return false;
      }
    },
    lastPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.$emit("click", this.currentPage);
        return true;
      } else {
        return false;
      }
    },
    changePage(event) {
      // console.log(event)
      if (event.type === "click") {
        this.$emit("click", parseInt(event.target.innerText));
      }
      else {
        this.currentPage = this.input
        this.$emit("click", parseInt(this.input));
      }
    }
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
  font-weight: 500;
}
button:hover {
  cursor: pointer;
}
button:focus {
  outline: 0ch;
}
input {
  border-style: none;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px 5px;
  width: 60px;
  transform: rotateX('2')
}
input:focus {
  outline: none;
  border: 1px solid coral;
}
</style>
