<template>
  <div id="detailPage">
    <h1>{{film.title}} ({{film.year}})</h1>
    <!-- 影片信息介绍 -->
    <div class="intro-container">
      <!-- 资料 -->
      <div class="info">
        <!-- 图片 -->
        <div class="info-img">
          <img :src="film.poster" alt="poster" onerror="onerror=null;src='/imgerror.png'">
        </div>
        <!-- 文字 -->
        <div class="info-text">
          <p>
            导演:&#32;
            <span
              v-for="(director,index) in film.directors"
              :key="director.id"
            >{{index == 0? '':'&#32;/&#32;'}}{{director.name}}</span>
          </p>
          <p>
            编剧:&#32;
            <span
              v-for="(writer,index) in film.writers"
              :key="writer.id"
            >{{index == 0? '':'&#32;/&#32;'}}{{writer.name}}</span>
          </p>
          <p>
            主演:&#32;
            <span
              v-for="(cast,index) in film.casts"
              :key="cast.id"
            >{{index == 0? '':'&#32;/&#32;'}}{{cast.name}}</span>
          </p>
          <p>
            类型:&#32;
            <span
              v-for="(genre,index) in film.genres"
              :key="genre"
            >{{index == 0? '':'&#32;/&#32;'}}{{genre}}</span>
          </p>
          <p v-if="film.site">
            官方网站:&#32;
            <a :href="film.site">{{film.site}}</a>
          </p>
          <p>
            制片国家/地区:&#32;
            <span
              v-for="(country,index) in film.countries"
              :key="country"
            >{{index == 0? '':'&#32;/&#32;'}}{{country}}</span>
          </p>
          <p>
            语言:&#32;
            <span
              v-for="(language,index) in film.languages"
              :key="language"
            >{{index == 0? '':'&#32;/&#32;'}}{{language}}</span>
          </p>
          <p>
            上映日期:&#32;
            <span
              v-for="(date,index) in film.pubdate"
              :key="date"
            >{{index == 0? '':'&#32;/&#32;'}}{{date}}</span>
          </p>
          <p v-if="film.episodes">集数:&#32;{{film.episodes}}</p>
          <p>片长:&#32;{{film.duration}}&#32;分钟</p>
          <p v-if="film.aka[0]">
            又名:&#32;
            <span v-for="(a,index) in film.aka" :key="a">{{index == 0? '':'&#32;/&#32;'}}{{a}}</span>
          </p>
          <p>
            IMDb链接:&#32;
            <a href="#">{{film.imdb}}</a>
          </p>
        </div>
      </div>
      <!-- 评分 -->
      <div class="rating">
        
        <rating :rating="film.rating"></rating>
      </div>
    </div>

    <!-- 影片简介 -->
    <div class="summary">
      <h2>{{film.title}}&#32;的剧情简介</h2>
      <p>&emsp;&emsp;{{film.summary}}</p>
    </div>

    <!-- 加载动画 -->
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import Rating from '../components/Rating'
import Loading from '../components/Loading'

export default {
  name: "detailPage",
  data() {
    return {
      film: {},
      isLoading: false
    };
  },
  components: {
    Rating,
    Loading,
  },
  created() {
    this.getFilmData();
  },
  methods: {
    // 请求 Json
    getFilmData() {
      // 开始加载动画
      this.isLoading = true
      // 请求参数准备
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        // 收到数据
        if (xhr.readyState === 4) {
          // 停止加载动画
          this.isLoading = false
          // 如果请求成功
          if (xhr.status === 200 || xhr.status === 304) {
            this.film = JSON.parse(xhr.response);
          }
        }
      };
      xhr.onerror = function(e) {
        console.log("请求错误");
        console.error(xhr.statusText);
      };
      // 请求开始
      // xhr.open("GET",'http://localhost:5000/api/forms/'+ this.$route.params.id, true)
      // xhr.open("GET", "films.json", true);
      xhr.open("GET",'/api/forms/' + this.$route.params.id, true)

      xhr.send(null);
    }
  }
};
</script>

<style scoped>
.info-img {
  height: 345px;
  width: 240px;
}
img {
  height: 345px;
  width: 240px;
}
.summary p {
  line-height: 30px;
}
p {
  margin-top: 0;
  margin-bottom: 10px;
}

a {
  text-decoration: none;
}
.intro-container {
  display: flex;
}
.info {
  flex: 4;
  display: flex;
}
.info-text {
  padding: 0 20px;
  float: left;
}
.rating {
  flex: 1;
  height: 200px;
}
</style>

