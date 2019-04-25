<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        <h1>FILMS</h1>
      </router-link>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

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
  margin-top: 60px;
  margin-bottom: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}
</style>
