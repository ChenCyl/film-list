<template>
  <div class="search-clear">
    <div class="search">
      <transition name="fade">
        <div v-show="isHidden" class="searchInput">
          <!-- 查找条件 -->
          <select v-model="selected">
            <option disabled value>请选择</option>
            <option v-for="type in types" :key="type">{{type}}</option>
          </select>
          <!-- 查找关键字 -->
          <input type="text" v-model="input" placeholder="搜索..." @keyup.enter="searchFilm">
        </div>
      </transition>
      <button @click="isHidden = !isHidden"><img src="/search.png" alt="search"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  props: {
    searchScoped: Array,
    input: String,
    selected: {
      type: String,
      default: "片名"
    }
  },
  data() {
    return {
      types: ["片名", "主演", "导演", "类型"],
      isHidden: false
    };
  },
  methods: {
    searchFilm() {
      if (typeof this.input === "undefined") {
        this.$emit("search", this.searchScoped);
        return;
      }
      let searchedFilm = [];
      switch (this.selected) {
        case "片名":
          searchedFilm = this.searchScoped.filter(item => {
            if (
              item.title.toLowerCase().indexOf(this.input.toLowerCase()) != -1
            ) {
              return true;
            }
          });
          break;
        case "主演":
          searchedFilm = this.searchScoped.filter(item => {
            for (let cast of item.casts) {
              if (
                cast.name.toLowerCase().indexOf(this.input.toLowerCase()) != -1
              ) {
                return true;
              }
            }
          });
          break;
        case "导演":
          searchedFilm = this.searchScoped.filter(item => {
            for (let director of item.directors) {
              if (
                director.name.toLowerCase().indexOf(this.input.toLowerCase()) !=
                -1
              ) {
                return true;
              }
            }
          });

          break;
        case "类型":
          searchedFilm = this.searchScoped.filter(item => {
            for (let genre of item.genres) {
              if (genre.toLowerCase().indexOf(this.input.toLowerCase()) != -1) {
                return true;
              }
            }
          });
          break;
      }
      this.$emit("search", searchedFilm);
    }
  }
};
</script>

<style scoped>

.search {
  height: 30px;
  margin-bottom: 25px;
  margin-right: 5px;
  font-size: 14px;
  /* float: right; */
}
select {
  height: 27px;
  border: 0;
}
input {
  border-style: none;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px 5px;
  width: 100px;
  transform: rotateX('2')
}
input:focus {
  outline: none;
  border: 1px solid coral;
}
select:focus {
  border: 1px solid coral;
  border-radius: 2px;
  outline: none;
}
button {
  height: 30px;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 5px 5px;
  font-size: 16px;
}
button {
  cursor: pointer;
}
.searchInput {
  display: inline;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  /* transform: translateX(10px); */
  opacity: 0;
}
</style>