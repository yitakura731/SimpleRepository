<template>
  <div>
    <myheader class="headerArea" />
    <nuxt />
  </div>
</template>

<script>
import Header from '../components/header.vue';

export default {
  components: {
    myheader: Header
  }
};
</script>

<style scoped>
.headerArea {
  height: 45px;
}
</style>
