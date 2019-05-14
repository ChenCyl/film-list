<template>
  <div id="loadingContainer">
    <div class="loading"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -20px 0 0 -20px;
  background: rgba(255, 255, 255, 0);
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 2px solid gray;
}
.loading:after {
  content: "";
  background: trasparent;
  width: 140%;
  height: 140%;
  position: absolute;
  border-radius: 100%;
  top: -20%;
  left: -20%;
  opacity: 0.7;
  box-shadow: gray -3px -4px 1px -3px;
  animation: rotate 1s infinite linear;
}

@keyframes rotate {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
