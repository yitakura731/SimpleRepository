<template>
  <b-navbar :style="style" class="py-1">
    <b-navbar-brand href="#" class="headerArea py-0">
      <img src="/images/icon.png" class="mr-2" width="40" height="40">
      {{title}}
    </b-navbar-brand>
  </b-navbar>
</template>

<script>
import i18next from 'i18next';
import Consts from './consts';

export default {
  data: function() {
    return {
      title: i18next.t('navbar')
    };
  },
  computed: {
    style() {
      return { '--contentsHeight': Consts.HEADER_HEIGHT + 'px' };
    }
  }
};
</script>

<style scoped>
.headerArea {
  background-color:#3b5998;
  color: white;
  font-size : 24px;
  font-family : Tahoma;
}
</style>