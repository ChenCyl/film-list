<template>
  <div id="films">
    <keep-alive>
      <pagination :total="films.length" v-model="currentPage"></pagination>
    </keep-alive>

    <film-item v-for="item in films" :key="item._id" :item="item"></film-item>
  </div>
</template>

<script>
import FilmItem from "../components/FilmItem.vue";
import Pagination from "../components/Pagination";

export default {
  name: "films",
  data() {
    return {
      films: null,
      currentPage: 1
    };
  },
  components: {
    FilmItem,
    Pagination
  },
  created() {
    this.getFilmData();
  },
  methods: {
    // 请求 Json
    getFilmData() {
      // 请求参数准备
      let xhr = new XMLHttpRequest();
      // xhr.overrideMimeType("application/json");
      // xhr.withCredentials = true;
      xhr.onreadystatechange = () => {
        // 收到数据
        if (xhr.readyState === 4) {
          // 如果请求成功
          if (xhr.status === 200 || xhr.status === 304) {
            this.films = JSON.parse(xhr.response);
          }
        }
      };
      xhr.onerror = function(e) {
        console.log("请求错误");
        console.error(xhr.statusText);
      };
      // 请求开始
      xhr.open("GET", "films.json", true);
      xhr.send(null);
    }
  }
};
</script>
