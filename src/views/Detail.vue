<template>
  <div id="detailPage">
    <h1>{{item.title}} ({{item.year}})</h1>

    <!-- 影片信息介绍 -->
    <div class="intro-container">
      <!-- 资料 -->
      <div class="info">
        <!-- 图片 -->
        <div class="info-img">
          <img :src="item.poster" alt="poster" onerror="onerror=null;src='/imgerror.png'">
        </div>
        <!-- 文字 -->
        <div class="info-text">
          <p>导演:&#32;<span v-for="(director,index) in item.directors" :key="director.id">{{index == 0? '':'&#32;/&#32;'}}{{director.name}}</span></p>
          <p>编剧:&#32;<span v-for="(writer,index) in item.writers" :key="writer.id">{{index == 0? '':'&#32;/&#32;'}}{{writer.name}}</span></p>
          <p>主演:&#32;<span v-for="(cast,index) in item.casts" :key="cast.id">{{index == 0? '':'&#32;/&#32;'}}{{cast.name}}</span></p>
          <p>类型:&#32;<span v-for="(genre,index) in item.genres" :key="genre">{{index == 0? '':'&#32;/&#32;'}}{{genre}}</span></p>
          <p v-if="item.site">官方网站:&#32;<a :href="item.site">{{item.site}}</a></p>
          <p>制片国家/地区:&#32;<span v-for="(country,index) in item.countries" :key="country">{{index == 0? '':'&#32;/&#32;'}}{{country}}</span></p>
          <p>语言:&#32;<span v-for="(language,index) in item.languages" :key="language">{{index == 0? '':'&#32;/&#32;'}}{{language}}</span></p>
          <p>上映日期:&#32;<span v-for="(date,index) in item.pubdate" :key="date">{{index == 0? '':'&#32;/&#32;'}}{{date}}</span></p>
          <p v-if="item.episodes">集数:&#32;{{item.episodes}}</p>
          <p>片长:&#32;{{item.duration}}&#32;分钟</p>
          <p v-if="item.aka[0]">又名:&#32;<span v-for="(a,index) in item.aka" :key="a">{{index == 0? '':'&#32;/&#32;'}}{{a}}</span></p>
          <p>IMDb链接:&#32;<a href="#">{{item.imdb}}</a></p>
        </div>
      </div>
      <!-- 评分 -->
      <div class="rating"></div>
    </div>
    
    <!-- 影片简介 -->
    <div class="summary">
      <h2>{{item.title}}&#32;的剧情简介</h2>
      <p>&emsp;&emsp;{{item.summary}}</p>
    </div>

  </div>
</template>

<script>
export default {
  name: "detailPage",
  data() {
    return {
      id: this.$route.params.id,
      films: []
    };
  },
  computed: {
    item() {
      let filterFilm = this.films.filter(x => {
        if (x._id === this.id) {
          return true;
        }
      });
      return filterFilm[0];
    }
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
  background-color: blue;
}
</style>

