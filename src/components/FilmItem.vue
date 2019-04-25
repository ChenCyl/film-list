<template>
  <div class="film-item" @click="goDetail">
    <!-- 图片 -->
    <div class="img-frame">
      <img :src="item.poster" alt="图片链接失效" onerror="onerror=null;src='/imgerror.png'">
    </div>
    <!-- 标题 -->
    <p class="film-title">{{item.title}}</p>
    <!-- 类型 -->
    <p class="film-type">
      <span
        v-for="(genre,index) in item.genres"
        :key="genre"
      >{{index == 0? '':'&#32;/&#32;'}}{{genre}}</span>
    </p>
    <!-- 评分 -->
    <p class="rating-average">{{item.rating.average}}</p>
  </div>
</template>

<script>
export default {
  name: "film-item",
  props: ["item"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    goDetail() {
      // console.log(this.$route.params);
      // this.$router.go(-1);
      console.log(this.$router.push("detail/" + this.item._id));
    }
  }
};
</script>

<style scoped>
.film-item {
  margin: 5px 10px;
  width: 160px;
  border-radius: 5px;
  box-shadow: 0px 3px 10px lightgrey;
  overflow: hidden;
  transition: all 0.3s;
  background-color: #fff;
}
.film-item:hover {
  box-shadow: 0px 1px 1px lightgrey;
  cursor: pointer;
}
.img-frame {
  height: 230px;
  width: 160px;
}
img {
  height: 230px;
  width: 160px;
}
.rating-average {
  margin-left: 7px;
  margin-right: 7px;
  font-weight: 800;
  color: coral;
}
.film-title {
  margin-left: 7px;
  margin-right: 7px;
  font-size: 16px;
  height: 46px;
  /* 只显示两行 用省略号替代后面的内容 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.film-type {
  margin-left: 7px;
  margin-right: 7px;
  height: 20px;
  font-size: 14px;
  color: rgb(153, 153, 153);
  /* 只显示一行 用省略号替代后面的内容 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>
