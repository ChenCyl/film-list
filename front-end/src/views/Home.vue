<template>
  <div id="films">
    <transition name="loading">
    <div class="loadingContainer" v-if="isLoading"></div>
    </transition>
    
    <loading v-if="isLoading"></loading>
    <div class="searchContainer">
      <search :searchScoped="metaFilms" @search="search"></search>
    </div>
    <div class="filmContainer">
      <film-item v-for="item in currentPageFilms" :key="item._id" :item="item"></film-item>
    </div>
    <div class="pageContainer">
      <pagination :total="films.length" v-model="currentPage" :pageSize="pageSize"></pagination>
    </div>
  </div>
</template>

<script>
import FilmItem from "../components/FilmItem.vue";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import Loading from "../components/Loading";

export default {
  name: "films",
  data() {
    return {
      metaFilms: [], // 所有的电影
      films: [], // 搜到的电影（搜索框为空时是所有电影）
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页条目数
      isLoading: false // 是否正在加载数据
    };
  },
  computed: {
    currentPageFilms() {
      // 当前页面的电影
      let startIndex = (this.currentPage - 1) * this.pageSize;
      let endIndex = this.currentPage * this.pageSize;
      return this.films.slice(startIndex, endIndex);
    }
  },
  components: {
    FilmItem,
    Pagination,
    Search,
    Loading
  },
  created() {
    this.getFilmData();
  },
  methods: {
    search(e) {
      this.films = e;
      this.currentPage = 1;
    },
    // 请求 Json
    getFilmData() {
      // 开始加载动画
      this.isLoading = true;
      // 请求参数准备
      let xhr = new XMLHttpRequest();
      // xhr.overrideMimeType("application/json");
      // xhr.withCredentials = true;
      xhr.onreadystatechange = () => {
        // 收到数据
        if (xhr.readyState === 4) {
          // 停止加载动画
          this.isLoading = false;
          // 如果请求成功
          if (xhr.status === 200 || xhr.status === 304) {
            this.metaFilms = JSON.parse(xhr.response);
            this.films = JSON.parse(xhr.response);
          }
        }
      };
      xhr.onerror = function(e) {
        console.log("请求错误");
        console.error(xhr.statusText);
      };
      // 请求开始
      // xhr.open("GET", "films_all.json", true); // 本地 public
      xhr.open("GET",'/api/forms', true)
      // xhr.open("GET", "http://localhost:5000/api/forms", true);
      xhr.send(null);
    }
  }
};
</script>

<style scoped>
.filmContainer {
  display: grid;
  grid-template-columns: repeat(5, 180px);
}
.pageContainer {
  padding: 30px 0;
  float: right;
}
.loadingContainer {
  position: absolute;
  top: 0%;
  left: 0%;
  height: 100%;
  width: 100%;
  background: rgb(255, 255, 255);
}
.loading-enter-active, .loading-leave-active {
  transition: opacity 1s;
}
.loading-enter, .loading-leave-to /* .loading-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
