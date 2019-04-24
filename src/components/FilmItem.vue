<template>
  <div class="film-item">
    <h1>{{ item.title }}</h1>
  </div>
</template>


<script>
export default {
  name: 'film-item',
  props: ['item'],
  data() {
    return {

    }
  },
}
</script>

<style scoped>

</style>
