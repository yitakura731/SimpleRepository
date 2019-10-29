<template>
  <div>
    <myheader />
    <div :style="styleViewArea" class="viewArea">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Header from '../components/header.vue';

export default {
  components: {
    myheader: Header
  },
  computed: {
    styleViewArea() {
      return {
        '--viewHeight': window.innerHeight - 48 + 'px'
      };
    }
  }
};
</script>

<style scoped>
.viewArea {
  --viewHeight: 0px;
  height: var(--viewHeight);
}
</style>
