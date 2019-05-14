<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        <h1>FILMS</h1>
      </router-link>
    </div>
    <!-- 我的妈 include 救了我的命 -->
    <keep-alive include="films">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 auto;
  width: 900px;
}

#nav {
  text-align: center;
  margin: 60px 0;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}
</style>
